import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: "/" , name: "root", component: App},	  
    { path: "/:list/:id", name: "queue", component: App }
  ]
})
