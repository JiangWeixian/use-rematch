import { PluginFactory } from '../src/plugin'

describe('plugins', () => {
  test('oninit, onmiddleware should exit', () => {
    const plugin = PluginFactory.create({})
    expect(typeof plugin.onInit).toBe('function')
    expect(typeof plugin.onMiddlewarse).toBe('function')
  })

  test('oninit should return model', () => {
    const plugin = PluginFactory.create({})
    const model = { text: 1 }
    expect(plugin.onInit?.(model)).toBe(model)
  })

  test('oninit could modify model', () => {
    const plugin = PluginFactory.create({
      onInit: (model) => {
        return {
          ...model,
          state: {
            ...model.state,
            text: 2
          }
        }
      },
    })
    const model = {
      name: 'plugin',
      state: {
        text: 1,
      }
    }
    const nextmodel = plugin.onInit(model)
    expect(nextmodel.state.text).toBe(2)
  })

  test('onmiddleware should be called', () => {
    let cnt = 0
    const plugin = PluginFactory.create({
      onMiddlewarse: (state) => {
        cnt += 1
        return state
      },
    })
    const model = {
      name: 'plugin',
      state: {
        text: 1,
      }
    }
    plugin.onMiddlewarse(model.state)
    expect(cnt).toBe(1)
  })
})