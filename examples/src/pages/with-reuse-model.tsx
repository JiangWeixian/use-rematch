import React from 'react'
import styles from './index.css'
import { useRematchReducer } from '@use-rematch/core'
import { countdonw } from '../models/countdonw'

export default function() {
  const [state, dispatch] = useRematchReducer(countdonw)
  return (
    <div className={styles.normal}>
      <h1>state</h1>
      <p>{state.loading ? 'loading' : state.cnt}</p>
      <div>
        <a style={{ marginRight: '16px' }} onClick={() => dispatch.add()}>
          +
        </a>
        <a style={{ marginRight: '16px' }} onClick={() => dispatch.asyncAdd(1)}>
          async + after 1s
        </a>
        <a style={{ marginRight: '16px' }} onClick={() => dispatch.add(-1)}>
          -
        </a>
      </div>
    </div>
  )
}
