import { RematchReducerPlugin } from './types';

export const PluginFactory = {
  create(plugin: RematchReducerPlugin): RematchReducerPlugin {
    return {
      onInit: (initialState: any) => {
        return plugin.onInit(initialState) ?? initialState
      },
      onMiddlewarse: (state: any) => {
        return plugin.onMiddlewarse(state) ?? state
      }
    }
  },
}
