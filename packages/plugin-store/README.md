# @use-rematch/plugin-store

*save state to localstorage and recover from localstorage*

## install

```console
pnpm i @use-rematch/core @use-rematch/plugin-store
```

## usage

```tsx
import { useRematch } from '@use-rematch/core';
import { createPluginStore } from '@use-rematch/plugin-store'

const PluginStore = createPluginStore()

const useHook = () => {
  const { state, dispatch } = useRematch({
    name: 'use-rematch-reducer',
    state: {
      cnt: 0,
      loading: false,
    },
    reducers: {
      add: (state) => {
        return {
          ...state,
          cnt: state.cnt + 1,
        };
      },
    },
  }, { plugins: [PluginStore] });
  return { state, dispatch }
}
```
