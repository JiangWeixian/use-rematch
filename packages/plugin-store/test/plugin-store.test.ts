import { createPluginStore } from '../src/index'
import { useRematchReducer } from '@use-rematch/core'
import { renderHook } from '@testing-library/react-hooks'

const plugin = createPluginStore()

describe('plugin-store', () => {
  test('plugin should find', () => {
    const { result } = renderHook(() =>
      useRematchReducer(
        {
          name: 'hook',
          state: {
            text: 1,
          } as { text: number },
          reducers: {
            set: v => v,
          },
        },
        { plugins: [plugin] },
      ),
    )
    expect(result.current[0]).toMatchObject({ text: 1 })
    result.current[1].set({ text: 2 })
    expect(localStorage.setItem).toHaveBeenCalled()
  })
})
