import { useRematch } from '@use-rematch/core'

import './App.css'

function App() {
  const { state, dispatch } = useRematch({
    state: {
      dolphin: 1,
      loading: false,
    },
    reducers: {
      add(state, payload?: number) {
        return {
          ...state,
          dolphin: state.dolphin + (payload ?? 1),
        }
      },
      toggle(state) {
        return {
          ...state,
          loading: !state.loading,
        }
      },
    },
    effects: {
      async addAsync() {
        this.toggle()
        setTimeout(() => {
          this.add()
          this.toggle()
        }, 1000)
      },
    },
  })

  return (
    <div className="w-sceen h-screen flex justify-center items-center">
      <div className="p-2 shadow-lg rounded-md flex flex-col justify-center bg-base-300">
        <div className="stats shadow bg-transparent">
          <div className="stat">
            <div className="stat-title">The count</div>
            <div className="stat-value h-12 flex items-center">
              {state.loading ? <i className="gg-spinner" /> : state.dolphin}
            </div>
          </div>
        </div>
        <div>
          <button className="btn btn-ghost" onClick={() => dispatch.add()}>
            increment
          </button>
          <button className="btn btn-ghost" onClick={() => dispatch.addAsync()}>
            increment.Async
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
