import { RematchReducerPlugin } from '@use-rematch/core'
import store from 'store2'

export const createPluginStore = (): RematchReducerPlugin => {
  let name: string = ''
  return {
    onInit: model => {
      const state = store.get(model.name)
      name = model.name
      return state
        ? {
            ...model,
            state,
          }
        : model
    },
    onMiddleware: state => {
      store.set(name, state)
    },
  }
}
