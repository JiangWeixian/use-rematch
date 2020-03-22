import { RematchReducerPlugin } from './types';

export const PluginFactory = {
  create(plugin: RematchReducerPlugin): RematchReducerPlugin {
    return {
      onInit: (model: any) => {
        return plugin.onInit(model) ?? model
      },
      onMiddlewarse: (state: any) => {
        return plugin.onMiddlewarse(state) ?? state
      }
    }
  },
}
