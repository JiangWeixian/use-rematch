import { createModel } from '@use-rematch/core'

export const countdonw = createModel({
  name: '@use-rematch-core/with-reuse-model',
  state: {
    cnt: 0,
    loading: false,
  },
  reducers: {
    add: (state, payload?: number) => {
      return {
        ...state,
        cnt: payload ? state.cnt + payload : state.cnt + 1,
      }
    },
    toggleLoading: state => {
      return {
        ...state,
        loading: !state.loading,
      }
    },
  },
  effects: {
    async asyncAdd(payload: number) {
      this.toggleLoading()
      setTimeout(async () => {
        this.add(payload)
        this.toggleLoading()
      }, 1000)
    },
  },
})
