# @use-rematch/core

<p>
  <img alt="Version" src="https://img.shields.io/github/package-json/v/jiangweixian/use-rematch-reducer/v2?label=use-rematch-reducer&logo=npm&style=for-the-badge" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" />
  </a>
  <a href="https://twitter.com/jiangweixian" target="_blank">
    <img alt="Twitter: jiangweixian" src="https://img.shields.io/twitter/follow/jiangweixian.svg?style=for-the-badge" />
  </a>
</p>

- [@use-rematch/core](#use-rematchcore)
  - [Features](#features)
  - [Install](#install)
  - [Usage](#usage)
  - [TODO](#todo)
  - [Author](#author)
  - [Show your support](#show-your-support)

## Features

- [@use-rematch/core]

## Install

```sh
npm install @use-rematch/core
```

## Usage

```tsx
// import
import { useRematchReducer } from '@use-rematch/core';

// create hook in compnent
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

// use in component
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

see **full code** in [examples](/examples/src/pages/index.tsx)

## TODO

- [ ] - add test

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