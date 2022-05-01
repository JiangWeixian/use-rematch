import { useRematch } from '@use-rematch/core'

export const useStore = <S extends Record<string, any>>(initialState: S = {} as S) => {
  const { state, dispatch } = useRematch({
    name: '@use-rematch/basic',
    state: initialState,
    reducers: {
      set(_state: any, nextState: any) {
        return nextState
      },
      update(state: any, partialState: any) {
        return {
          ...state,
          ...partialState,
        }
      },
    },
  })
  return { state, dispatch }
}
