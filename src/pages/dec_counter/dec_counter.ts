import { Component, Emit, Vue } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
// Use Vuex
import { Mutation } from 'vuex-class';
import { DECREMENT } from '@/store/types';
const debug = require('debug')('log:Page/Counter');

@Component
export default class Counter extends Vue {
  AppUrls = AppUrls;

  @Mutation(DECREMENT)
  decrementMutation;

  // computed
  get count () {
    return this.$store.state.count;
    // return store.state.count;
  }

  decrement() {
    this.decrementMutation();
    // store.commit('decrement');
  }
}
