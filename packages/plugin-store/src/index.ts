import { RematchReducerPlugin } from '@use-rematch/core'
import store from 'store2'

export const PluginStore: RematchReducerPlugin = {
  onInit: model => {
    const state = store.get(model.name)
    return state
      ? {
          ...model,
          state,
        }
      : model
  },
  onMiddlewarse: model => {
    store.set(model.name, model.state)
  },
}
