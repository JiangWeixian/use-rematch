import { useEffect, useState, useMemo } from 'react'
import remove from 'lodash.remove'

export const store = {}

export const useGlobal = (name: string, state: any, dispatch: any) => {
  useEffect(() => {
    store[name].state = state
    store[name].dispatch = dispatch
    store[name].callbacks?.forEach((updater: Function) => {
      updater()
    })
  }, [state])
  useEffect(() => {
    store[name] = {}
    return () => {
      store[name] = undefined
    }
  }, [name])
}

export const useGlobalState = (name: string, callback: (state: any) => any) => {
  const [clock, update] = useState(0)
  useEffect(() => {
    store[name].callbacks = store[name].callbacks.concat(update)
    return () => {
      remove(store[name].callbacks, callback => callback == update)
    }
  }, [name, clock])
  const state = store[name].state
  const partialState = useMemo(() => {
    return callback(state)
  }, [callback(state)])
  return partialState
}

export const useGlobalDispatch = (name: string, callback: (dispatch: object) => any) => {
  const [clock, update] = useState(0)
  const dispatch = store[name].dispatch
  useEffect(() => {
    store[name].callbacks = store[name].callbacks.concat(update)
    return () => {
      remove(store[name].callbacks, callback => callback == update)
    }
  }, [name, clock])
  const partialDispatch = useMemo(() => {
    return callback(dispatch)
  }, [callback(dispatch)])
  return partialDispatch
}