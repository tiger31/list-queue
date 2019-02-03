// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'
import store from './store/store.js'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import Vuex from 'vuex';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router'

Vue.use(Vuex)
Vue.use(Vuetify);
Vue.use(VueRouter);

console.log(store);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  router,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
