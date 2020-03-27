import { createPluginStore } from '../src/index'
import { useRematchReducer } from '@use-rematch/core'
import { renderHook } from '@testing-library/react-hooks'

const plugin = createPluginStore()

describe('plugin-store', () => {
  test('plugin should work fine', async () => {
    const { result } = renderHook(() =>
      useRematchReducer(
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
    expect(result.current[0].text).toBe(1)
    result.current[1].set(2)
    expect(result.current[0].text).toBe(2)
    expect(localStorage.setItem).toHaveBeenLastCalledWith('hook', '{"text":2}')
  })
})
