import { useGlobal, useGlobalDispatch, useGlobalState, store } from '../src/use-global'
import { useRematchReducer } from '@use-rematch/core'
import { renderHook } from '@testing-library/react-hooks'

const useGlobalInOtherHook = () => {
  const state = useGlobalState('hook', state => state)
  const dispatch = useGlobalDispatch('hook', dispatch => dispatch)
  return {
    state,
    dispatch,
  }
}

beforeEach(() => {
  store['hook'] = {
    callbacks: [],
  }
})

const delay = (ms = 1000) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, ms)
  })
}

describe('use-global', () => {
  test('register model to global namespace', () => {
    renderHook(() =>
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
        { hooks: [useGlobal] },
      ),
    )
    expect(store['hook']).toBeDefined()
    expect(store['hook'].state.text).toBe(1)
    expect(store['hook'].dispatch).toBeDefined()
  })

  test('global model could be updated', async () => {
    const hook = renderHook(() =>
      useRematchReducer(
        {
          name: 'hook',
          state: {
            text: 1,
          } as { text: number },
          reducers: {
            set: (v, payload) => {
              return {
                ...v,
                ...payload,
              }
            },
          },
        },
        { hooks: [useGlobal] },
      ),
    )
    expect(store['hook'].state.text).toBe(1)
    hook.result.current[1].set({ text: 2 })
    await delay(0)
    expect(store['hook'].state.text).toBe(2)
  })

  test('use global state and dispatch in other hook', async () => {
    renderHook(() =>
      useRematchReducer(
        {
          name: 'hook',
          state: {
            text: 1,
          } as { text: number },
          reducers: {
            set: (v, payload) => {
              return {
                ...v,
                ...payload,
              }
            },
          },
        },
        { hooks: [useGlobal] },
      ),
    )
    const hook = renderHook(() => useGlobalInOtherHook())
    expect(hook.result.current.state.text).toBe(1)
    hook.result.current.dispatch.set({ text: 2 })
    await delay(0)
    expect(store['hook'].state.text).toBe(2)
    expect(hook.result.current.state.text).toBe(2)
  })

  test('use global state and dispatch in multiple hook', async () => {
    renderHook(() =>
      useRematchReducer(
        {
          name: 'hook',
          state: {
            text: 1,
          } as { text: number },
          reducers: {
            set: (v, payload) => {
              return {
                ...v,
                ...payload,
              }
            },
          },
        },
        { hooks: [useGlobal] },
      ),
    )
    const hook1 = renderHook(() => useGlobalInOtherHook())
    const hook2 = renderHook(() => useGlobalInOtherHook())
    expect(hook1.result.current.state.text).toBe(1)
    expect(hook2.result.current.state.text).toBe(1)
    hook1.result.current.dispatch.set({ text: 2 })
    await delay(0)
    expect(store['hook'].state.text).toBe(2)
    expect(hook2.result.current.state.text).toBe(2)
  })
})
