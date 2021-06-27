import { createPluginStore } from '../src/index'
import { useRematch } from '@use-rematch/core'
import { renderHook } from '@testing-library/react-hooks'

const plugin = createPluginStore()

describe('plugin-store', () => {
  test('plugin should work fine', async () => {
    const { result } = renderHook(() =>
      useRematch(
        {
          name: 'hook',
          state: {
            text: 1,
          } as { text: number },
          reducers: {
            set: (v, text) => {
              return {
                ...v,
                text,
              }
            },
          },
        },
        { plugins: [plugin] },
      ),
    )
    expect(result.current.state.text).toBe(1)
    result.current[1].set(2)
    expect(result.current.state.text).toBe(2)
    expect(localStorage.setItem).toHaveBeenLastCalledWith('hook', '{"text":2}')
  })
})
