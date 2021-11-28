export const builtIn = () => {
  return {
    reducers: {
      set(state: any, part: any) {
        return {
          ...state,
          ...part,
        }
      },
      toggle(state: any, key: string) {
        return {
          ...state,
          [key]: !state[key],
        }
      },
    },
  }
}
