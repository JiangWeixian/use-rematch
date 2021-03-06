# @use-rematch

*use-rematch is a React hook lib, redefine the way how you write reducer. It's totally wrote by typescript!*

## introduction

### install

```sh
npm install @use-rematch/core
```

### features

- 📦 No extra dispatch types
- 🔢 Pluginable 
- 💗 Model is easy to reuse

## usage

### basic usage

you can create `reducer` without define **DISPATCH_TYPES**

```tsx
import { useRematch } from '@use-rematch/core';

const useHook = () => {
  const { state, dispatch } = useRematch({
    name: 'use-rematch-reducer',
    state: {
      cnt: 0,
    },
    reducers: {
      add: (state, payload?: number) => {
        return {
          ...state,
          cnt: payload ? state.cnt + payload : state.cnt + 1,
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
  return { state, dispatch }
}
```

then use dispatchers and state in component. In this way, you can dispatch action like `dispatch.add` or **dispatch a async action `asyncAdd`** with intellicode

```tsx
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
```

### reuse model config
> **for better type intelligence, recommend use `createModel`**

```tsx
import { createModel } from '@use-rematch/core'

const model = createModel({
  name: 'use-rematch-reducer',
  state: {
    cnt: 0,
  },
  reducers: {
    add: (state, payload?: number) => {
      return {
        ...state,
        cnt: payload ? state.cnt + payload : state.cnt + 1,
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
})

const useHook = () => {
  const { state, dispatch } = useRematch(model);
  return { state, dispatch }
}
```

### with plugin

you can use plugin to modify origianl model, for example, [@use-rematch/plugin-store](/packages/plugin-store) will init model state from localstorage, and store model.state to localstorage

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
      add: (state, payload?: number) => {
        return {
          ...state,
          cnt: payload ? state.cnt + payload : state.cnt + 1,
        };
      },
    },
  }, { plugins: [PluginStore] });
  return { state, dispatch }
}
```

## Packges

- [@use-rematch/core](https://www.npmjs.com/package/@use-rematch/core)
- [@use-rematch/plugin-store](https://www.npmjs.com/package/@use-rematch/plugin-store)

## Author

👤 **JW**

* Twitter: [@jiangweixian](https://twitter.com/jiangweixian)
* Github: [@JiangWeixian](https://github.com/JiangWeixian)

## Show your support

Give a ⭐️ if this project helped you!

<a href="https://www.patreon.com/jiangweixian">
  <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
