import axios from 'axios';
import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
export interface State {
  data: any;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    data: null
  },
  mutations: {
    setWeatherdata(state, payload) {
      state.data = state.data + payload;
    }
  },
  actions: {
    async getWeatherData(context, payload) {
      console.log('getWeatherData');
      const cwbapiurl =
        'https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0001-001?Authorization=CWB-507541B9-F919-4B2C-9A48-21D9859B4EAA&limit=2&locationName=%E5%AE%89%E5%8D%97';
      axios(cwbapiurl).then((res) => console.log(res.data));
    }
  }
});

export function useStore() {
  return baseUseStore(key);
}
