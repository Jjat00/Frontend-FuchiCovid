import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
    /* Rotuas de acceso a todos los usuarios */
    {
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
    /*  Rutas de los funcionarios*/
    {
        path: '/funcionarios',
        name: 'Funcionarios',
        component: () =>
            import ( /* muestra la vista de funcionarios */ '../views/funcionarios/Funcionarios.vue'),
        meta: { rutaProtegida: true },
    }, {
        path: '/registroMedicos',
        name: 'RegistrarMedicos',
        component: () =>
            import ( /* muestra la vista para registrar medicos */
                '../views/funcionarios/RegistroMedicos.vue')
    }, {
        path: '/registroPacientes',
        name: 'RegistrarPacietes',
        component: () =>
            import ( /* muestra la vista para registrar pacientes */
                '../views/funcionarios/RegistroPacientes.vue')
    }, {
        path: '/contactoEmergencia/:documentoPaciente',
        name: 'ContactoEmergencia',
        component: () =>
            import ( /* muestra la vista de contactos de emergencía de cierto paciente */
                '../views/funcionarios/ContactoEmergencia.vue')
    },
    /* Rutas de los medicos */
    {
        path: '/medicos',
        name: 'Medicos',
        component: () =>
            import ( /* muestra la vista de médicos*/ '../views/medicos/Medicos.vue'),
        meta: { rutaProtegida: true }
    }, {
        path: '/paciente/:documentoPaciente',
        name: 'InformacionPaciente',
        component: () =>
            import ( /* muestra la vista de informacion de cierto paciente */
                '../views/medicos/InformacionPaciente.vue')
    }, {
        path: '/pedidos',
        name: 'Pedidos',
        component: () =>
            import ( /* muestra la vista de contactos de pedidos de medicamentos */
                '../views/medicos/Pedidos.vue')
    }, {
        path: '/pacientes',
        name: 'Pacientes',
        component: () =>
            import ( /* muestra la vista de contactos de pedidos de medicamentos */
                '../views/medicos/PacientesMedico.vue')
    }
]

const router = new VueRouter({
    /* mode: 'history',
    base: process.env.BASE_URL, */
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