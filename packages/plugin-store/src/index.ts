import { RematchReducerPlugin } from '@use-rematch/core'

export const createPluginStore = (): RematchReducerPlugin => {
  let name = ''
  return {
    onInit: (model) => {
      const state = localStorage.getItem(model.name)
      name = model.name
      if (!state) {
        localStorage.setItem(name, JSON.stringify(model.state))
        return model
      }
      return {
        ...model,
        state: JSON.parse(state),
      }
    },
    onMiddleware: (state) => {
      localStorage.setItem(name, JSON.stringify(state))
    },
  }
}
