import { RematchReducerPlugin } from '@use-rematch/core'
import store from 'store2'

const PluginStore: RematchReducerPlugin = {
  onInit: model => {
    const state = store.get(model.name)
    return state
      ? {
          ...model,
          state,
        }
      : model
  },
}
