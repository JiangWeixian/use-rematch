import React from 'react'
import styles from './index.css'
import { useRematchReducer } from '@use-rematch/core'
import { useGlobalSWR, useGlobalSWRState } from '@use-rematch/use-global'
import { cache } from 'swr'

const OtherComponentsA = () => {
  const state = useGlobalSWRState('@use-rematch-core/use-global')
  console.log(state)
  return <p>{state && state.cnt}</p>
}

export default function() {
  const [state, dispatch] = useRematchReducer(
    {
      name: '@use-rematch-core/use-global',
      state: {
        cnt: 0,
        loading: false,
      },
      reducers: {
        add: (state, payload?: number) => {
          return {
            ...state,
            cnt: payload ? state.cnt + payload : state.cnt + 1,
          }
        },
        toggleLoading: state => {
          return {
            ...state,
            loading: !state.loading,
          }
        },
      },
      effects: {
        async asyncAdd(payload: number) {
          this.toggleLoading()
          setTimeout(async () => {
            this.add(payload)
            this.toggleLoading()
          }, 1000)
        },
      },
    },
    { hooks: [useGlobalSWR] },
  )
  return (
    <div className={styles.normal}>
      <h1>state</h1>
      <p>{state.loading ? 'loading' : state.cnt}</p>
      <div>
        <a style={{ marginRight: '16px' }} onClick={() => dispatch.add()}>
          add
        </a>
        <a style={{ marginRight: '16px' }} onClick={() => dispatch.asyncAdd(1)}>
          async add after 1s
        </a>
        <a style={{ marginRight: '16px' }} onClick={() => dispatch.add(-1)}>
          reduce
        </a>
      </div>
      <h1>come from global store</h1>
      <OtherComponentsA />
    </div>
  )
}
