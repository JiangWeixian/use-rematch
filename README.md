<!--
  Title: use-rematch-reducer
  Description: use rematch like model in useReducer
  Author: JiangWeixian
  -->

# use-rematch-reducer

<p>
  <img alt="Version" src="https://img.shields.io/github/package-json/v/jiangweixian/use-rematch-reducer/v2?label=use-rematch-reducer&logo=npm&style=for-the-badge" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" />
  </a>
  <a href="https://twitter.com/jiangweixian" target="_blank">
    <img alt="Twitter: jiangweixian" src="https://img.shields.io/twitter/follow/jiangweixian.svg?style=for-the-badge" />
  </a>
</p>

> use [rematch2](https://github.com/JiangWeixian/rematch-v2) like reducer: [examples](https://github.com/JiangWeixian/use-rematch-reducer/tree/master/examples)

> if you ara [rematch](https://github.com/rematch/rematch) user, use `use-rematch-reducer@<1.0.0`; if you are [rematch2](https://github.com/JiangWeixian/rematch-v2) user, use `use-rematch-reducer@>=1.0.0`

- [use-rematch-reducer](#use-rematch-reducer)
  - [Features](#features)
  - [Install](#install)
  - [Usage](#usage)
  - [TODO](#todo)
  - [Author](#author)
  - [Show your support](#show-your-support)

## Features

- typescript typo supported by [rematch2](https://github.com/JiangWeixian/rematch-v2). rematch2 has better typo like this.
  
  ![better-typo-in-rematch2](/docs/screenshots/rematch2.jpg)

- async dispatch

## Install

```sh
npm install use-rematch-reducer --save
```

## Usage
> only support [rematch2's createModel](https://github.com/JiangWeixian/rematch-v2), [rematch2's combineModels](https://github.com/JiangWeixian/rematch-v2) is not supported

![screenshots](/docs/screenshots/use-rematch-reducer.gif)

```tsx
// import
import { useRematchReducer } from 'use-rematch-reducer';

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

- [ ] - add test part

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