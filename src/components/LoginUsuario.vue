<template>
  <v-container>
    <v-card
        class="mx-auto"
        max-width="450"
        max-height="600"
    >
    <v-card-title class="justify-center">
        Inicio de Sesión de Usuario
    </v-card-title>
    <v-divider></v-divider>
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
            v-model="usuario.password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[passwordRules.required, passwordRules.min]"
            :type="show1 ? 'text' : 'password'"
            required
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            @click:append="show1 = !show1"
            counter
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
    name: 'loginUsuario',
    props: ['tipoUsuario'],
    data: () => ({
      show1: false,
      valid: true,
      usuario:{
          documento: null,
          password: '31324',
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
      passwordRules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The email and password you entered don\'t match'),
        },

    }),

    methods: {
      validate () {
        this.$refs.form.validate()
        if (this.valid) {
          if (this.tipoUsuario == 'funcionario') {
            this.loginFuncionario(this.usuario)          
            //this.$store.commit('setDialogoSesion', false)
          }
          if (this.tipoUsuario == 'medico') {
            this.loginMedico(this.usuario)
            //this.$store.commit('setDialogoSesion', false)
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