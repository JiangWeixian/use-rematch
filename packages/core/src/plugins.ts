import { RematchReducerPlugin } from './types';

export const PluginFactory = {
  create(plugin: RematchReducerPlugin): RematchReducerPlugin {
    return {
      onInit: (initialState: any) => {
        return plugin.onInit(initialState) ?? initialState
      },
      onMiddlewarses: (state: any) => {
        return plugin.onMiddlewarses(state) ?? state
      }
    }
  },
}