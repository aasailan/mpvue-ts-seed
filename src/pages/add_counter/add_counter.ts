import { Component, Emit, Vue } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
// Use Vuex
import store from '@/store';
import { Mutation } from 'vuex-class';
import { INCREMENT } from '@/store/types';
const debug = require('debug')('log:Page/Counter');

@Component
export default class Counter extends Vue {
  AppUrls = AppUrls;

  @Mutation(INCREMENT)
  incrementMutation;

  // computed
  get count () {
    return this.$store.state.count;
    // return store.state.count;
  }

  increment() {
    debug('hello4');
    this.incrementMutation();
    // store.commit('increment');
  }

  // decrement() {
  //   store.commit('decrement');
  // }
}
