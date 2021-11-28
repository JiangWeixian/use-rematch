import { useRematch } from '../src/use-rematch'
import { renderHook } from '@testing-library/react-hooks'

describe('basic usage of use-rematch', () => {
  test('state init should work fine', () => {
    const hook = renderHook(() =>
      useRematch({
        name: 'hook',
        state: {
          text: 1,
        } as { text: number },
        reducers: {
          set: (v) => v,
        },
      }),
    )
    expect(hook.result.current.state.text).toBe(1)
  })

  test('reducer and effect should be initialized correct', () => {
    const hook = renderHook(() =>
      useRematch({
        name: 'hook',
        state: {
          text: 1,
        } as { text: number },
        reducers: {
          set: (v) => v,
        },
        effects: {
          async asyncSet(this: any, payload) {
            this.set(payload)
          },
        },
      }),
    )
    expect(typeof (hook.result.current.dispatch as any).set).toBe('function')
    expect(typeof (hook.result.current.dispatch as any).asyncSet).toBe('function')
  })

  test('reducer and effect should work correct', async () => {
    const hook = renderHook(() =>
      useRematch({
        name: 'hook',
        state: {
          text: 1,
        } as { text: number },
        reducers: {
          set(v, payload) {
            return {
              ...v,
              ...payload,
            }
          },
        },
        effects: {
          async asyncSet(this: any, payload) {
            this.set(payload)
          },
        },
      }),
    )
    ;(hook.result.current.dispatch as any).set({ text: 2 })
    expect(hook.result.current.state.text).toBe(2)
    ;(hook.result.current.dispatch as any).asyncSet({ text: 3 })
    expect(hook.result.current.state.text).toBe(3)
  })
})
