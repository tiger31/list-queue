import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Settings from '../components/Settings.vue'
import Main from '../components/Main.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: "/" , name: "root", component: Main },
    { path: "/login", name: "login", component: Login },
    { path: "/register", name: "register", component: Register },
    { path: "/settings", name: "settings", component: Settings },
    { path: "/:list/:id", name: "queue", component: Main }
  ]
})
