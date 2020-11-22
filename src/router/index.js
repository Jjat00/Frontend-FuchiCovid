import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: () =>
            import ( /* muestra la vista home */ '../views/Home.vue')
    },
    {
        path: '/funcionarios',
        name: 'Funcionarios',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Funcionarios.vue')
    },
    {
        path: '/medicos',
        name: 'Medicos',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Medicos.vue')
    },
    {
        path: '/informes',
        name: 'Informes',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Informes.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router