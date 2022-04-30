import { useStore } from '@/basic'

import { renderHook, act } from '@testing-library/react-hooks'

describe('set', () => {
  it('dispatch set should overwrite original state', () => {
    const { result } = renderHook(() => useStore())
    act(() => {
      result.current.dispatch.set({ count: 1 })
    })
    expect(result.current.state).toMatchObject({ count: 1 })
  })
})
