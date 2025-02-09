import { createContext, Context, useContext } from 'react';

export interface IUseStoreSetHandler<T> {
  (oldValue: T): T;
};

export interface IUseStore <T>{
  (key: string, defaultValue: T): [T, (value: (T | IUseStoreSetHandler<T>)) => any, () => any];
}

export interface IStoreContext<T = any> {
  useStore: IUseStore<T>;
}

export const defaultContext: IStoreContext = {
  useStore: (key, defaultValue) => [defaultValue, value => undefined, () => undefined],
};

export const StoreContext = createContext<IStoreContext>(defaultContext);

export interface ISetKeyValue {}

export function useStore<T>(
  key: string,
  defaultValue: T,
  context: Context<IStoreContext> = StoreContext,
): [T, (value: T) => T, () => T] {
  const { useStore } = useContext(context);
  return useStore(key, defaultValue);
}
