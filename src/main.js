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

import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyD31QAARDb9OOb3-klyIe-9s07majjvico",
    authDomain: "list-queue.firebaseapp.com",
    databaseURL: "https://list-queue.firebaseio.com",
    projectId: "list-queue",
    storageBucket: "list-queue.appspot.com",
    messagingSenderId: "827885448656"
};

firebase.initializeApp(config);

Vue.use(Vuex)
Vue.use(Vuetify);
Vue.use(VueRouter);

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
