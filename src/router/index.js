import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

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
            import ( /* webpackChunkName: "about" */ '../views/Funcionarios.vue'),
        meta: { rutaProtegidaFunc: true }
    },
    {
        path: '/medicos',
        name: 'Medicos',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Medicos.vue'),
        meta: { rutaProtegida: true }
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

router.beforeEach((to, from, next) => {
    const rutaEsProtegida = to.matched.some(
        item => item.meta.rutaProtegida
    )

    const rutaFunc = to.matched.some(
        item => item.meta.rutaProtegidaFunc
    )
    if (rutaEsProtegida && store.state.documentoMedico === null) {
        next('/')
    } else {
        next()
    }
    if (rutaFunc && store.state.documentoFuncionario === null) {
        next('/')
    } else {
        next()
    }
})

export default router