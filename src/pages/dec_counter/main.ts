import Vue from 'vue';
import App from './dec_counter';
import store from '@/store';

Vue.prototype.$store = store;
const app = new Vue(App);
app.$mount();
