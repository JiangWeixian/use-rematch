import useSWR, { cache, mutate } from 'swr'
import { useState, useEffect } from 'react'

export const useGlobalSWR = (name: string, state: any, dispatch: any) => {
  useSWR(
    name,
    () => {
      return cache.get(name)
    },
    { initialData: { state, dispatch } },
  )
  useEffect(() => {
    mutate(name, (store: any) => {
      return { ...store, state, dispatch }
    })
  }, [state, dispatch, name])
}

export const useGlobalSWRState = (name: string) => {
  const [state, setState] = useState()
  cache.subscribe(() => {
    setState(cache.get(name)?.state)
  })
  return state
}

export const useGlobalSWRDispatch = (name: string) => {
  const [dispatch, setDispatch] = useState()
  cache.subscribe(() => {
    setDispatch(cache.get(name)?.dispatch)
  })
  return dispatch
}
