<template>
  <v-container>
    <v-card
        class="mx-auto"
        max-width="400"
        max-height="500"
    >
    <v-card-title class="mx-2 my-3">
        Inicio de sesión de usuario
    </v-card-title>
    <v-card-text>
        <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        >
            <v-text-field
            v-model="usuario.documento"
            :counter="10"
            :rules="documentoRules"
            label="Documento"
            required
            ></v-text-field>

            <v-text-field
              v-model="usuario.correo"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <router-link v-if="tipoUsuario == 'funcionario'" :to="{name:'Funcionarios'}">
                <v-btn :disabled="!valid" dark class="mr-4 my-3"
                block @click="validate"
                >
                    Login
                </v-btn>
            </router-link>
            <router-link v-if="tipoUsuario == 'medico'" :to="{name:'Medicos'}">
                <v-btn :disabled="!valid" dark class="mr-4 my-3"
                block @click="validate"
                >
                    Login
                </v-btn>
            </router-link>
        </v-form>
    </v-card-text>

    </v-card>

  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: 'login',
    props: ['tipoUsuario'],
    data: () => ({
      valid: true,
      usuario:{
          documento: null,
          correo: 'jjat@gmail.com',
      },
      name: '',
      documentoRules: [
        v => !!v || 'documento is required',
        v => (v && v.length <= 10) || 'documento must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],

    }),

    methods: {
      validate () {
        this.$refs.form.validate()
        if (this.valid) {
          if (this.tipoUsuario == 'funcionario') {
            this.loginFuncionario(this.usuario)          
            this.$store.commit('setDialogoSesion', false)
          }
          if (this.tipoUsuario == 'medico') {
            this.loginMedico(this.usuario)
            this.$store.commit('setDialogoSesion', false)
          }
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      ...mapActions([
          'loginFuncionario',
          'loginMedico'
      ])
    },
  }
</script>


<style scoped>
  a {
    text-decoration: none;
  }
</style>