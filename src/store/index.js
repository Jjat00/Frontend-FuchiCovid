import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        barColor: "rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)",
        imagenDrawer: "https://i.ibb.co/Cm6mTqx/coronavirus.jpg",
        loginImage: "https://i.ibb.co/K6vJtd7/portada-Fuchi.jpg",
        imagenServidorPublico: "https://i.ibb.co/XW31rg1/business.jpg",
        imagenMedico: "https://i.ibb.co/KDq4q9T/doctor.jpg",
        drawer: null,
        tipoUsuario: null,
        documentoFuncionario: null,
        nombrefuncianario: null,
        documentoMedico: null,
        nombreMedico: null,
        urlRoot: "http://localhost:3000",
    },
    mutations: {
        SET_BAR_IMAGE(state, payload) {
            state.barImage = payload;
        },
        SET_DRAWER(state, payload) {
            state.drawer = payload;
        },
        setTipoUsuario(state, payload) {
            state.tipoUsuario = payload;
        },
        setDocumentoFuncionario(state, payload) {
            state.documentoFuncionario = payload;
        },
        setDocumentoMedico(state, payload) {
            state.documentoMedico = payload;
        },
        setFuncionario(state, payload) {
            state.nombrefuncianario = payload;
        },
        setMedico(state, payload) {
            state.nombreMedico = payload;
        },
    },
    actions: {
        async login({ commit }, usuario) {
            const urlRoot = "http://localhost:3000"
            console.log("iniciando sesion...");
            console.log(usuario);
            try {
                let nombreUsurio = null;
                console.log('--------------------------')
                console.log(`${urlRoot}/login`);
                console.log('--------------------------')
                const res = await fetch(
                    `${urlRoot}/login`, {
                        method: "post",
                        headers: new Headers(),
                        body: new URLSearchParams({
                            document: usuario.documento,
                            password: usuario.password,
                        }),
                    }
                );
                const resDB = await res.json();
                console.log(resDB);
                nombreUsurio = resDB[0].doctor_name1;

                console.log("nombre de usuario: ");
                console.log(nombreUsurio);
                if (nombreUsurio != null) {
                    const nombreMedico =
                        resDB[0].doctor_name1 + " " + resDB[0].doctor_name2;
                    commit("setTipoUsuario", "medico");
                    commit("setDocumentoMedico", usuario.documento);
                    commit("setMedico", nombreMedico);
                    localStorage.setItem("tokenMedico", usuario.documento);
                    localStorage.setItem("nombreMedico", nombreMedico);
                } else {
                    const nombreFuncionario =
                        resDB[0].public_worker_name1 + " " + resDB[0].public_worker_name2;
                    commit("setTipoUsuario", "funcionario");
                    commit("setDocumentoFuncionario", usuario.documento);
                    commit("setFuncionario", nombreFuncionario);
                    localStorage.setItem("tokenFuncionario", usuario.documento);
                    localStorage.setItem("nombreFuncionario", nombreFuncionario);
                }
            } catch (error) {
                console.log(error);
                commit("setTipoUsuario", "noExiste");
            }
        },

        leerTokenFuncionario({ commit }) {
            if (localStorage.getItem("tokenFuncionario")) {
                console.log("obteniendo token");
                commit(
                    "setDocumentoFuncionario",
                    localStorage.getItem("tokenFuncionario")
                );
            } else {
                commit("setDocumentoFuncionario", null);
            }
        },
        leerNombreFuncionario({ commit }) {
            if (localStorage.getItem("nombreFuncionario")) {
                console.log("obteniendo token");
                commit("setFuncionario", localStorage.getItem("nombreFuncionario"));
            } else {
                commit("setFuncionario", null);
            }
        },
        leerNombreMedico({ commit }) {
            if (localStorage.getItem("nombreMedico")) {
                console.log("obteniendo token");
                commit("setMedico", localStorage.getItem("nombreMedico"));
            } else {
                commit("setMedico", null);
            }
        },
        leerTokenMedico({ commit }) {
            if (localStorage.getItem("tokenMedico")) {
                console.log("obteniendo token");
                commit("setDocumentoMedico", localStorage.getItem("tokenMedico"));
            } else {
                commit("setDocumentoMedico", null);
            }
        },
        cerrarSesionFuncionario({ commit }) {
            console.log("cerrando sesion funcionario");
            localStorage.removeItem("tokenFuncionario");
            localStorage.removeItem("nombreFuncionario");
            commit("setDocumentoFuncionario", null);
            commit("setFuncionario", null);
        },
        cerrarSesionMedico({ commit }) {
            console.log("cerrando sesion medico");
            localStorage.removeItem("tokenMedico");
            localStorage.removeItem("nombreMedico");
            commit("setDocumentoMedico", null);
            commit("setMedico", null);
        },
    },
});