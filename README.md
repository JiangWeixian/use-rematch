# @use-rematch

- [@use-rematch](#use-rematch)
  - [Packages](#packages)
  - [Install](#install)
  - [Usage](#usage)
    - [@use-rematch/core](#use-rematchcore)
  - [Author](#author)
  - [Show your support](#show-your-support)

*use-rematch is a React hook lib, redefine the way how you write reducer*

## Packages

- [@use-rematch/core](https://www.npmjs.com/package/@use-rematch/core)

## Install

```sh
npm install @use-rematch/core
```

## Usage

### @use-rematch/core

create hook in compnent without dispatch types

```tsx
import { useRematchReducer } from '@use-rematch/core';

const [state, dispatch] = useRematchReducer({
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

use dispatchers and state in component

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