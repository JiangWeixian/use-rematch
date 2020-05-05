/*
 * Type definitions for use-rematch
 * Jiangweixian https://github.com/jiangweixian
 */

// typo utils
export as namespace userematch

export type LifeCycle = {
  init?(): void
}

export type ExtractRematchDispatcherAsyncFromEffect<E> = E extends () => Promise<infer R>
  ? RematchDispatcherAsync<void, void, R>
  : E extends (payload: infer P) => Promise<infer R>
  ? RematchDispatcherAsync<P, void, R>
  : E extends (payload: infer P, meta: infer M) => Promise<infer R>
  ? RematchDispatcherAsync<P, M, R>
  : E extends (payload: infer P, meta: infer M, extra: infer PS) => Promise<infer R>
  ? RematchDispatcherAsync<P, M, R>
  : RematchDispatcherAsync<any, any, any>

export type ExtractRematchDispatchersFromEffectsObject<effects extends ModelEffects<any>> = {
  [effectKey in keyof effects]: ExtractRematchDispatcherAsyncFromEffect<effects[effectKey]>
}

export type ExtractRematchDispatchersFromEffects<
  effects extends ModelConfig['effects']
> = effects extends ModelEffects<any> ? ExtractRematchDispatchersFromEffectsObject<effects> : {}

export type ExtractRematchDispatcherFromReducer<R> = R extends () => any
  ? RematchDispatcher<void, void>
  : R extends (state: infer S) => infer S
  ? RematchDispatcher<void, void>
  : R extends (state: infer S, payload: infer P) => infer S
  ? RematchDispatcher<P, void>
  : R extends (state: infer S, payload: infer P, meta: infer M) => infer S
  ? RematchDispatcher<P, M>
  : RematchDispatcher<any, any>

export type ExtractRematchDispatchersFromReducersObject<reducers extends ModelReducers<any>> = {
  [reducerKey in keyof reducers]: ExtractRematchDispatcherFromReducer<reducers[reducerKey]>
}

export type ExtractRematchDispatchersFromReducers<
  reducers extends ModelReducers<any>
> = ExtractRematchDispatchersFromReducersObject<reducers & {}>

export type ExtractRematchDispatchersFromModel<
  M extends ModelConfig
> = ExtractRematchDispatchersFromReducers<M['reducers']> &
  ExtractRematchDispatchersFromEffects<M['effects']>

export type RematchDispatcher<P = void, M = void> = [P] extends [void]
  ? (...args: any[]) => Action<any, any>
  : [M] extends [void]
  ? (payload: P) => Action<P, void>
  : (payload: P, meta: M) => Action<P, M>

export type RematchDispatcherAsync<P = void, M = void, R = void> = ([P] extends [void]
  ? (...args: any[]) => Promise<R>
  : [M] extends [void]
  ? (payload: P) => Promise<R>
  : (payload: P, meta: M) => Promise<R>) &
  ((action: Action<P, M>) => Promise<R>) &
  ((action: Action<P, void>) => Promise<R>)

export type ModelDescriptor<
  S,
  R extends ModelReducers<any>,
  E extends ModelEffects<any>,
  SS = S
> = {
  name?: string
  state: S
  baseReducer?: (state: SS, action: Action) => SS
  reducers?: R
  effects?: E &
    ThisType<
      ExtractRematchDispatchersFromReducers<R> &
        ExtractRematchDispatchersFromEffects<E> & { dispatch: (action: Action) => void }
    >
  lifecycle?: LifeCycle &
    ThisType<
      ExtractRematchDispatchersFromReducers<R> &
        ExtractRematchDispatchersFromEffects<E> & { dispatch: (action: Action) => void }
    >
}

export type Action<P = any, M = any> = {
  type: string
  payload?: P
  meta?: M
}

export type ModelReducers<S = any> = {
  [key: string]: (state: S, payload: any, meta?: any) => S
}

type ModelEffects<S> = {
  [key: string]: (payload: any, rootState: any, currentState: S) => void
}

export interface Model<S = any, SS = S> extends ModelConfig<S, SS> {
  name: string
  reducers: ModelReducers<S>
}

export interface ModelConfig<
  S = any,
  SS = S,
  R extends ModelReducers<any> = any,
  E extends ModelEffects<any> = any
> {
  name?: string
  state: S
  lifecyle?: LifeCycle
  baseReducer?: (state: SS, action: Action) => SS
  reducers?: R
  effects?: E
}

// use-rematch
export type useRematchProps<M extends ModelDescriptor<any, any, any, any> = any> = {
  plugins?: RematchReducerPlugin<M>[]
  hooks?: RematchReducerHook<M>[]
}

export function useRematch<S, R extends ModelReducers<S>, E extends ModelEffects<S>>(
  model: ModelDescriptor<S, R, E>,
  props?: useRematchProps<ModelDescriptor<S, R, E>>,
): {
  state: ModelConfig<S>['state']
  dispatch: ExtractRematchDispatchersFromReducers<R> & ExtractRematchDispatchersFromEffects<E>
}
export function useRematch<S, R extends ModelReducers<S>, E extends ModelEffects<S>>(
  model: ModelConfig<S>,
  props?: useRematchProps<ModelDescriptor<S, R, E>>,
): {
  state: ModelConfig<S>['state']
  dispatch: ExtractRematchDispatchersFromReducers<R> & ExtractRematchDispatchersFromEffects<E>
}

export type RematchReducerPlugin<M = any> = {
  onInit?: (model: M) => M
  onMiddleware?: (state: any) => any
}

export type RematchReducerHook<M extends ModelDescriptor<any, any, any, any> = any> = (
  name: string,
  state: M['state'],
  dispatch: ExtractRematchDispatchersFromReducers<M['reducers']> &
    ExtractRematchDispatchersFromEffects<M['effects']>,
) => any

export function createModel<S, R extends ModelReducers<S>, E extends ModelEffects<S>>(
  model: ModelDescriptor<S, R, E>,
): ModelConfig<S, any, R, E>
