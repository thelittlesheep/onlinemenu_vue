import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";

export interface State {
  shoppingCart: Product[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    menuDataFrom: [], // 購物車列表
  },
});

export function useStore() {
  // 通過key給store提供型別
  return baseUseStore(key);
}
