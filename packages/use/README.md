# @use-rematch/use
*useful recipes*

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
dispatch.set({ dolphin: 1 })
```