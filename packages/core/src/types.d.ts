import {
  ModelDescriptor,
  ExtractRematchDispatchersFromReducers,
  ExtractRematchDispatchersFromEffects,
  ModelReducers,
  ModelEffects,
  ModelGetters,
  ExtractRematchGettersObject,
} from '@rematch2/core'

export function useRematchReducer<
  S,
  R extends ModelReducers<S>,
  E extends ModelEffects<S>,
  G extends ModelGetters<any>
>(
  model: ModelDescriptor<S, R, E, G>,
): [
  ModelDescriptor<S, R, E, G>['state'],
  ExtractRematchDispatchersFromReducers<R> & ExtractRematchDispatchersFromEffects<E>,
  ExtractRematchGettersObject<G>,
]

type RematchReducerPlugin = {
  onInit: (initalState: any) => any
  onMiddlewarse: (state: any) => any
}

