# @use-rematch/core

[![npm](https://img.shields.io/npm/v/@use-rematch/core.svg?style=flat-square)](https://www.npmjs.org/package/@use-rematch/core)

## install

```console
pnpm i @use-rematch/core
```

## usage

create hook in compnent without dispatch types

```tsx
import { useRematch } from '@use-rematch/core';

const [state, dispatch] = useRematch({
  name: '@use-rematch/core',
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
    toggleLoading: (state) => {
      return {
        ...state,
        loading: !state.loading,
      };
    },
  },
  effects: {
    async asyncAdd(payload: number, state: State) {
      this.toggleLoading();
      setTimeout(async () => {
        this.add(payload);
        this.toggleLoading();
      }, 1000);
    },
  },
});
```
