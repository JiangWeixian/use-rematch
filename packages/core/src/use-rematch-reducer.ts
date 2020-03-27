import { useReducer, Reducer, useRef, useMemo } from 'react'
import { ModelConfig } from '@rematch2/core'
import { UseRematchReducerProps } from './types'
import { PluginFactory } from './plugin'
import compose from 'lodash.flowright'

type Action = { type: string; payload: any; meta: any }
const EMPTY_GETTERS = {}

function createDispatcher(this: any, reducerName: string) {
  return async (payload: any, meta: any): Promise<any> => {
    const action: Action = { type: reducerName, payload, meta }
    this(action)
    return action
  }
}

const applyMiddware = (rootReducer: Reducer<any, any>, callback: Function) => {
  return (state: any, action: Action) => {
    const nextState = rootReducer(state, action)
    if (callback) {
      callback(nextState)
    }
    return nextState
  }
}

/**
 * use rematch-model-like-reducer
 * @param model ModelConfig<S>
 */

export const useRematchReducer = (
  model: ModelConfig<any>,
  props: UseRematchReducerProps<ModelConfig<any>> = { plugins: [] },
) => {
  const normalizedPlugins = props.plugins?.map(plugin => PluginFactory.create(plugin)) || []
  const onInit = compose(normalizedPlugins?.map(plugin => plugin.onInit))
  const onMiddleware = compose(normalizedPlugins?.map(plugin => plugin.onMiddleware))
  const normalziedModel: ModelConfig<any> = onInit(model)
  const stateRef = useRef(normalziedModel.state)
  const reducers = normalziedModel.reducers
  const initialState = normalziedModel.state
  const reactReducers = (state = initialState, action: Action) => {
    if (!reducers) {
      return state
    }
    if (!reducers[action.type]) {
      return state
    }
    return reducers[action.type](state, action.payload, action.meta)
  }
  const [state, dispatch] = useReducer(
    applyMiddware(
      reactReducers,
      compose(onMiddleware, (v: any) => {
        stateRef.current = v
      }),
    ),
    initialState,
  )
  const getters = useMemo(() => {
    if (!model.getters || Object.keys(model.getters).length === 0) {
      return EMPTY_GETTERS
    }
    const result = Object.assign(EMPTY_GETTERS, {})
    for (const key in model.getters) {
      result[key] = model.getters[key](state)
    }
    return result
  }, [state, model.getters])
  const effects = model.effects
  if (reducers) {
    Object.keys(reducers).forEach(k => {
      dispatch[k] = createDispatcher.call(dispatch, k)
    })
  }
  const getStore = () => {
    return stateRef.current
  }
  if (effects) {
    Object.keys(effects).forEach(k => {
      const effect = effects[k].bind(dispatch as any)
      dispatch[k] = async (payload: any) => {
        const currentState = getStore()
        return effect(payload, currentState, currentState)
      }
    })
  }
  dispatch['dispatch'] = dispatch
  return [state, dispatch, getters]
}
