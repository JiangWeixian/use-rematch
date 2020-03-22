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
})