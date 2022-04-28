import { useReducer, Reducer, useRef } from 'react'
import { useRematchProps, ModelConfig } from '../types'
import { PluginFactory } from './plugin'
import compose from 'lodash.flow'

type Action = { type: string; payload: any; meta: any }

function createDispatcher(this: any, reducerName: string) {
  return async (payload: any, meta: any): Promise<any> => {
    const action: Action = { type: reducerName, payload, meta }
    this(action)
    return action
  }
}

const applyMiddleware = (rootReducer: Reducer<any, any>, callback: Function) => {
  return (state: any, action: Action) => {
    const nextState = rootReducer(state, action)
    if (callback) callback(nextState)

    return nextState
  }
}

/**
 * use rematch-model-like-reducer
 * @param model ModelConfig<S>
 */

export const useRematch = (
  model: ModelConfig<any>,
  props: useRematchProps<ModelConfig<any>> = { plugins: [] },
) => {
  const normalizedPlugins = props.plugins?.map((plugin) => PluginFactory.create(plugin)) || []
  const onInit = compose(normalizedPlugins?.map((plugin) => plugin.onInit))
  const onMiddleware = compose(normalizedPlugins?.map((plugin) => plugin.onMiddleware))
  const normalizedModel: ModelConfig<any> = onInit(model)
  const initialState = normalizedModel.state
  const stateRef = useRef(initialState)
  const reducers = normalizedModel.reducers
  const reactReducers = (state = initialState, action: Action) => {
    if (!reducers) return state

    if (!reducers[action.type]) return state

    return reducers[action.type](state, action.payload, action.meta)
  }
  const [state, dispatch] = useReducer(
    applyMiddleware(
      reactReducers,
      compose(onMiddleware, (v: any) => {
        stateRef.current = v
      }),
    ),
    initialState,
  )
  const effects = model.effects
  if (reducers) {
    Object.keys(reducers).forEach((k) => {
      dispatch[k] = createDispatcher.call(dispatch, k)
    })
  }
  const getStore = () => {
    return stateRef.current
  }
  if (effects) {
    Object.keys(effects).forEach((k) => {
      const effect = effects[k].bind(dispatch as any)
      dispatch[k] = async (payload: any) => {
        const currentState = getStore()
        return effect(payload, currentState, currentState)
      }
    })
  }
  ;(dispatch as any).dispatch = dispatch
  return {
    state,
    dispatch,
  }
}
