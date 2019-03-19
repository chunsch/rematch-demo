import { useCallback } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { init, RematchRootState } from '@/models/core';
import topics from './topics';

export const models = {
  topics,
};

export const store = init({
  models,
});

export type Store = typeof store;
export type Dispatch = typeof store.dispatch;
export type RootState = RematchRootState<typeof models>;
export type UseModel<T> = T & { dispatch: Dispatch };

export function useModel<Result>(mapState?: (state: RootState) => any, memoizationArray?: any[]): Result {
  const mapResult: ReturnType<typeof mapState> = useMappedState(
    useCallback(mapState, memoizationArray || []),
  );

  return {
    dispatch: useDispatch(),
    ...mapResult,
  };
}

// export function useModel(mapState?: (state: RootState) => any, memoizationArray?: any[]): (ReturnType<typeof mapState> | { dispatch: Dispatch })  {
//   const mapResult: ReturnType<typeof mapState> = useMappedState(
//     useCallback(mapState, memoizationArray || []),
//   );
//
//   return {
//     dispatch: useDispatch(),
//     ...mapResult,
//   };
// }
