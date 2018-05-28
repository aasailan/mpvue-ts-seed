// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue';
import Vuex from 'vuex';
import { INCREMENT, DECREMENT } from '@/store/types';

Vue.use(Vuex as any);

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    [INCREMENT]: (state) => {
      const obj = state;
      obj.count += 1;
    },
    [DECREMENT]: (state) => {
      const obj = state;
      obj.count -= 1;
    }
  }
});

export default store;
