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
        tipoUsuario: null,
        documentoFuncionario: null,
        documentoMedico: null,
    },
    mutations: {
        SET_BAR_IMAGE(state, payload) {
            state.barImage = payload
        },
        SET_DRAWER(state, payload) {
            state.drawer = payload
        },
        setTipoUsuario(state, payload) {
            state.tipoUsuario = payload
        },
        setDocumentoFuncionario(state, payload) {
            state.documentoFuncionario = payload
        },
        setDocumentoMedico(state, payload) {
            state.documentoMedico = payload
        }
    },
    actions: {
        async login({ commit }, usuario) {
            console.log('iniciando sesion...')
            console.log(usuario)
            try {
                let nombreUsurio = null
                const res = await fetch('https://centromedicofuchicovid.herokuapp.com/login', {
                    method: 'post',
                    headers: new Headers(),
                    body: new URLSearchParams({
                        'document': usuario.documento,
                        'password': usuario.password,
                    })
                })
                const resDB = await res.json()
                console.log(resDB)
                nombreUsurio = resDB[0].doctor_name1

                console.log('nombre de usuario: ')
                console.log(nombreUsurio)
                if (nombreUsurio != null) {
                    commit('setTipoUsuario', 'medico')
                    commit('setDocumentoMedico', usuario.documento)
                    localStorage.setItem('tokenMedico', usuario.documento)
                } else {
                    commit('setTipoUsuario', 'funcionario')
                    commit('setDocumentoFuncionario', usuario.documento)
                    localStorage.setItem('tokenFuncionario', usuario.documento)
                }

            } catch (error) {
                console.log(error)
                commit('setTipoUsuario', 'noExiste')
            }
        },

        leerTokenFuncionario({ commit }) {
            if (localStorage.getItem('tokenFuncionario')) {
                console.log('obteniendo token')
                console.log(localStorage.getItem('tokenFuncionario'))
                commit('setDocumentoFuncionario', localStorage.getItem('tokenFuncionario'))
                console.log('this.documentoFuncionario')
                console.log(this.documentoFuncionario)
            } else {
                commit('setDocumentoFuncionario', null)
            }
        },
        leerTokenMedico({ commit }) {
            if (localStorage.getItem('tokenMedico')) {
                console.log('obteniendo token')
                console.log(localStorage.getItem('tokenMedico'))
                commit('setDocumentoMedico', localStorage.getItem('tokenMedico'))
                console.log('this.documentoFuncionario')
                console.log(this.documentoFuncionario)
            } else {
                commit('setDocumentoMedico', null)
            }
        },
        cerrarSesionFuncionario({ commit }) {
            console.log('cerrando sesion funcionario')
            localStorage.removeItem('tokenFuncionario')
            commit('setDocumentoFuncionario', null)
        },
        cerrarSesionMedico({ commit }) {
            console.log('cerrando sesion medico')
            localStorage.removeItem('tokenMedico')
            commit('setDocumentoMedico', null)
        }

    }

})