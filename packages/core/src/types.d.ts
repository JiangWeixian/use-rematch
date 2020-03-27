import {
  ModelDescriptor,
  ExtractRematchDispatchersFromReducers,
  ExtractRematchDispatchersFromEffects,
  ModelReducers,
  ModelEffects,
  ModelGetters,
  ExtractRematchGettersObject,
} from '@rematch2/core'

type UseRematchReducerProps<M> = {
  plugins?: RematchReducerPlugin<M>[]
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

type RematchReducerPlugin<M = any> = {
  onInit?: (model: M) => M
  onMiddlewarse?: (state: any) => any
}
