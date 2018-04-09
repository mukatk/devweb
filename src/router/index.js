import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/Index'
import Cadastro from '@/components/Cadastro'
import Landing from '@/components/Landing'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'

import auth from '@/router/auth'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Cadastro',
      name: 'Cadastro',
      component: Cadastro
    },
    {
      path: '/Landing',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: Dashboard
    }
  ],
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  auth(to, from, next);
})

export default router
