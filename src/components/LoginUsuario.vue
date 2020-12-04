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
            <v-btn :disabled="!valid" dark class="mr-4 my-3"
                block @click="validate"
                >
                Login
            </v-btn>
          <!-- Mensaje Error -->
            <div class="text-center">
              <p v-if="showMensajeError" class="mensajeError">
                Datos incorrectos
              </p>
            </div>
        </v-form>
    </v-card-text>

    </v-card>

  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: 'loginUsuario',
    data: () => ({
      show1: false,
      valid: true,
      showMensajeError: false,
      usuario:{
          documento: 1234145,
          password: 'CrazyCarrot',
      },
      name: '',
      documentoRules: [
        v => !!v || 'documento is required',
        /* v => (v && v.length <=7) || 'documento must be more than 8 characters', */
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
      async validate () {
        this.$refs.form.validate()
        if (this.valid) {
            await this.login(this.usuario)    
            console.log('tipo de usuario: ')      
            console.log(this.tipoUsuario)    
            switch (this.tipoUsuario) {
              case 'noExiste':
                this.showMensajeError = true
                break;
              case 'medico':
                this.$router.push('medicos')
                break;
              case 'funcionario':
                this.$router.push('funcionarios')
                break;
            
              default:
                break;
            }  
            //this.$store.commit('setDialogoSesion', false)
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      ...mapActions([
          'login'
      ])
    },
    computed:{
      ...mapState(['tipoUsuario'])
    }

  }
</script>


<style scoped>
  a {
    text-decoration: none;
  }
  .mensajeError{
    font-size: 20px;
    color: rgb(156, 24, 24);
  }
</style>