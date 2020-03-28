import React from 'react';
import styles from './index.css';
import { useRematchReducer } from '@use-rematch/core';

export default function() {
  const [state, dispatch] = useRematchReducer({
    name: '@use-rematch-core/basic',
    state: {
      cnt: 0,
      loading: false,
    },
    reducers: {
      add: (state, payload?: number) => {
        return {
          ...state,
          cnt: payload ? state.cnt + payload : state.cnt + 1,
        };
      },
      toggleLoading: state => {
        return {
          ...state,
          loading: !state.loading,
        };
      },
    },
    effects: {
      async asyncAdd(payload: number) {
        this.toggleLoading();
        setTimeout(async () => {
          this.add(payload);
          this.toggleLoading();
        }, 1000);
      },
    },
  });
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
  );
}
