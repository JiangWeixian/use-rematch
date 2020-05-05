import React from 'react'
import styles from './index.css'
import { useRematch } from '@use-rematch/core'
import { useGlobal, useGlobalState, useGlobalDispatch } from '@use-rematch/use-global'

const OtherComponentsA = () => {
  const state = useGlobalState('@use-rematch-core/use-global', s => s)
  return <p>{state && state.cnt}</p>
}

export default function() {
  const { state, dispatch } = useRematch(
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
    { hooks: [useGlobal] },
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
