import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
        barImage: 'https://i.ibb.co/CmhDXtS/43532.jpg',
        //loginImage: 'http://drive.google.com/uc?export=view&id=1ZkvnhXpAjERgF2lQPN6Kw_2wI1LvbpZb',
        loginImage: 'https://i.ibb.co/VmzYD8s/coronavirus-4972480-1920-3.png',
        drawer: null,
        documentoFuncionario: null,
        documentoMedico: null,
        dialogoInicioSesion: null,
    },
    mutations: {
        SET_BAR_IMAGE(state, payload) {
            state.barImage = payload
        },
        SET_DRAWER(state, payload) {
            state.drawer = payload
        },
        setDocumentoFuncionario(state, payload) {
            state.documentoFuncionario = payload
        },
        setDocumentoMedico(state, payload) {
            state.documentoMedico = payload
        },
        setDialogoSesion(state, payload) {
            state.dialogoInicioSesion = payload
        },
    },
    actions: {
        async loginFuncionario({ commit }, usuario) {
            console.log('inicio sesion funcionario')
            console.log(usuario)
            try {
                const res = await fetch('https://centromedicofuchicovid.herokuapp.com/login', {
                    method: 'post',
                    headers: new Headers(),
                    body: new URLSearchParams({
                        'document': usuario.documento,
                        'password': usuario.password,
                    })
                })
                const resDB = await res.json()
                console.log("------------------------------------")
                console.log(resDB)

                commit('setDocumentoFuncionario', usuario.documento)
                    //commit('setDialogoSesion', false)
                localStorage.setItem('tokenFuncionario', usuario.documento)
            } catch (error) {
                console.log(error)
            }
        },

        leerTokenFuncionario({ commit }) {
            if (localStorage.getItem('tokenFuncionario')) {
                commit('setDocumentoFuncionario', localStorage.getItem('tokenFuncionario'))
            } else {
                commit('setDocumentoFuncionario', null)
            }
        },

        cerrarSesionFuncionario({ commit }) {
            console.log('cerrando sesion')
            localStorage.removeItem('tokenFuncionario')
            commit('setDocumentoFuncionario', null)
        },

        async loginMedico({ commit }, usuario) {
            console.log('inicio sesion medico')
            console.log(usuario)
            try {
                /* const res = await fetch('https://centromedicofuchicovid.herokuapp.com/login/', {
                    method: 'post',
                    headers: new Headers(),
                    body: new URLSearchParams({
                        'document': usuario.documento,
                        'password': usuario.correo,
                    })
                }) */
                const resDB = await res.json()
                console.log(resDB)
                console.log("******************")
                commit('setDocumentoMedico', usuario.documento)
                commit('setDialogoSesion', false)
                localStorage.setItem('tokenMedico', usuario.documento)
            } catch (error) {
                console.log(error)
            }
        },

        leerTokenMedico({ commit }) {
            if (localStorage.getItem('tokenMedico')) {
                commit('setDocumentoMedico', localStorage.getItem('tokenMedico'))
            } else {
                commit('setDocumentoMedico', null)
            }
        },

        cerrarSesionMedico({ commit }) {
            console.log('cerrando sesion')
            localStorage.removeItem('tokenMedico')
            commit('setDocumentoMedico', null)
        },

    },
    modules: {

    }
})