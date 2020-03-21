import { useRematchReducer } from '../src/use-rematch-reducer'
import { renderHook } from '@testing-library/react-hooks'

describe('basic usage of use-rematch-reducer', () => {
  test('state init should work fine', () => {
    const hook = renderHook(() => useRematchReducer({
      name: 'hook',
      state: {
        text: 1,
      } as { text: number },
      reducers: {
        set: (v) => v
      }
    }))
    expect(hook.result.current[0].text).toBe(1)
  })

  test('reducer and effect should be initilzed correct', () => {
    const hook = renderHook(() => useRematchReducer({
      name: 'hook',
      state: {
        text: 1,
      } as { text: number },
      reducers: {
        set: (v) => v
      },
      effects: {
        async asyncSet(this: any, payload) {
          this.set(payload)
        }
      },
    }))
    expect(typeof hook.result.current[1].set).toBe('function')
    expect(typeof hook.result.current[1].asyncSet).toBe('function')
  })

  test('reducer and effect should work correct', async () => {
    const hook = renderHook(() => useRematchReducer({
      name: 'hook',
      state: {
        text: 1,
      } as { text: number },
      reducers: {
        set(v, payload) {
          return {
            ...v,
            ...payload
          }
        }
      },
      effects: {
        async asyncSet(this: any, payload) {
          this.set(payload)
        }
      },
    }))
    hook.result.current[1].set({ text: 2 })
    expect(hook.result.current[0].text).toBe(2)
    hook.result.current[1].asyncSet({ text: 3 })
    expect(hook.result.current[0].text).toBe(3)
  })

  test('getters should work fine', async () => {
    const hook = renderHook(() => useRematchReducer({
      name: 'hook',
      state: {
        text: 1,
      } as { text: number },
      reducers: {
        set(v, payload) {
          return {
            ...v,
            ...payload
          }
        }
      },
      getters: {
        bigthanzero(state) {
          return state.text > 0
        }
      },
    }))
    expect(hook.result.current[2].bigthanzero).toBe(true)
    hook.result.current[1].set({ text: 0 })
    expect(hook.result.current[2].bigthanzero).toBe(false)
  })
})