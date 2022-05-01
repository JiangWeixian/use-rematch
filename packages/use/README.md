# @use-rematch/use
*useful recipes*

[![npm](https://img.shields.io/npm/v/@use-rematch/use.svg?style=flat-square)](https://www.npmjs.org/package/@use-rematch/core)


## install

```console
pnpm i @use-rematch/use
```

## usage

### `basic`

simple reducer model with basic `set & update` reducer.

```tsx
import useStore from '@use-rematch/use/basic'

const { state, dispatch } = useStore({ dolphin: 1 })

// overwrite set
// from { dolphin: 1 } to { zoo: 1 }
dispatch.set({ zoo: 1 })

// partial update
// from { zoo: 1 } to { dolphin: 1, zoo: 1 }
dispatch.update({ dolphin: 1 })
```