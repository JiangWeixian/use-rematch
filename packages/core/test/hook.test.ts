import { useRematch } from '../src/use-rematch'
import { renderHook } from '@testing-library/react-hooks'

describe('hook', () => {
  test('hook should get state', () => {
    let name, state, dispatch
    const useSub = (m, s, d) => {
      name = m
      state = s
      dispatch = d
    }
    renderHook(() =>
      useRematch(
        {
          name: 'hook',
          state: {
            text: 1,
          } as { text: number },
          reducers: {
            set: v => v,
          },
        },
        { hooks: [useSub] },
      ),
    )
    expect(name).toBe('hook')
    expect(state.text).toBe(1)
    expect(dispatch.set).toBeDefined()
  })

  test('hook should subscribe state', () => {
    let name, state, dispatch
    const useSub = (m, s, d) => {
      name = m
      state = s
      dispatch = d
    }
    const { result } = renderHook(() =>
      useRematch(
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
        { hooks: [useSub] },
      ),
    )
    result.current[1].set({ text: 2 })
    expect(name).toBe('hook')
    expect(state.text).toBe(2)
    expect(dispatch.set).toBeDefined()
  })
})
