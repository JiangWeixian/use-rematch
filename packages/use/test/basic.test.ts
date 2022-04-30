import { useStore } from '@/basic'

import { renderHook, act } from '@testing-library/react-hooks'

describe('basic store', () => {
  it('initial state should work', () => {
    const { result } = renderHook(() => useStore({ count: 1 }))
    expect(result.current.state).toMatchObject({ count: 1 })
  })

  it('dispatch set should overwrite original state', () => {
    const { result } = renderHook(() => useStore())
    act(() => {
      result.current.dispatch.set({ count: 1 })
    })
    expect(result.current.state).toMatchObject({ count: 1 })
  })

  it('dispatch update should partial update original state', () => {
    const { result } = renderHook(() => useStore({ count: 1 }))
    act(() => {
      result.current.dispatch.update({ dolphin: 1 })
    })
    expect(result.current.state).toMatchObject({ count: 1, dolphin: 1 })
  })
})
