import {
  ModelDescriptor,
  ExtractRematchDispatchersFromReducers,
  ExtractRematchDispatchersFromEffects,
  ModelReducers,
  ModelEffects,
  ModelGetters,
  ExtractRematchGettersObject,
} from '@rematch2/core'

type UseRematchReducerProps<M extends ModelDescriptor<any, any, any, any> = any> = {
  plugins?: RematchReducerPlugin<M>[]
  hooks?: RematchReducerHook<M>[]
}

export function useRematchReducer<
  S,
  R extends ModelReducers<S>,
  E extends ModelEffects<S>,
  G extends ModelGetters<any>
>(
  model: ModelDescriptor<S, R, E, G>,
  props?: UseRematchReducerProps<ModelDescriptor<S, R, E, G>>,
): [
  ModelDescriptor<S, R, E, G>['state'],
  ExtractRematchDispatchersFromReducers<R> & ExtractRematchDispatchersFromEffects<E>,
  ExtractRematchGettersObject<G>,
]

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
