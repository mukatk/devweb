import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Cadastro from '@/components/Cadastro'

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
    }
  ],
  mode: 'history'
})
