import { useRematch } from '@use-rematch/core'

export const useStore = () => {
  const { state, dispatch } = useRematch({
    name: '@use-rematch/basic',
    state: {},
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
