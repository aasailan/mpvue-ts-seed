import Vue from 'vue';
import App from './add_counter';
import store from '@/store';

Vue.prototype.$store = store;
const app = new Vue(App);
app.$mount();
