import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: () =>
            import ( /* muestra la vista home */ '../views/Home.vue'),
        meta: { rutaProtegida: true }
    }, {
        path: '/login',
        name: 'Login',
        component: () =>
            import ( /* muestra la vista home */ '../views/Login.vue'),
    },
    {
        path: '/funcionarios',
        name: 'Funcionarios',
        component: () =>
            import ( /* muestra la vista de funcionarios */ '../views/Funcionarios.vue'),
        meta: { rutaProtegidaFunc: true },
    },
    {
        path: '/medicos',
        name: 'Medicos',
        component: () =>
            import ( /* muestra la vista de médicos*/ '../views/Medicos.vue'),
        meta: { rutaProtegida: true }
    }, {
        path: '/informes',
        name: 'Informes',
        component: () =>
            import ( /* muestra la vista de informes */ '../views/Informes.vue')
    }, {
        path: '/contactoEmergencia/:documentoPaciente',
        name: 'ContactoEmergencia',
        component: () =>
            import ( /* muestra la vista de contactos de emergencía de cierto paciente */
                '../views/ContactoEmergencia.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {

    if (to.name == 'Funcionarios' &&
        store.state.documentoFuncionario === null) {
        next('/login')
    } else {
        next()
    }
    if (to.name == 'Medicos' && store.state.documentoMedico === null) {
        next('/login')
    } else {
        next()
    }


})

export default router