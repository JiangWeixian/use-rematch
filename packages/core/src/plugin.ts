/**
 * for reducer initize life cycle
 */

import { RematchReducerPlugin } from '../types'

export const PluginFactory = {
  create(plugin: RematchReducerPlugin): Required<RematchReducerPlugin> {
    return {
      onInit: (model: any) => {
        return plugin.onInit?.(model) ?? model
      },
      onMiddleware: (state: any) => {
        return plugin.onMiddleware?.(state) ?? state
      },
    }
  },
}
