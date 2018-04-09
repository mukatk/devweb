import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Cadastro from '@/components/Cadastro'
import Landing from '@/components/Landing'

Vue.use(Router)

export default new Router({
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
    }
  ],
  mode: 'history'
})
