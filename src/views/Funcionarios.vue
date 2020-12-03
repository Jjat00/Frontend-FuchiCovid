<template>
    <v-container>

    <!-- Navigation  -->
    <div>
      <v-navigation-drawer
      v-model="drawer"
      :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
      :right="$vuetify.rtl"
      :src="loginImage"
      mobile-breakpoint="960"
      app
      width="250"
      v-bind="$attrs"    
      >

      
      <h1 class="mx-2 my-2">Usuario 1</h1>
      <h4 class="mx-2 my-2">user@gmail.com</h4>

        <v-divider class="mb-4"></v-divider>

        <v-list
          dense
          nav
        >
          <v-list-item class="items"
            v-for="item in items"
            :key="item.title"
            @click="mostrarCrud(item.title)"
            link
          >
            <v-list-item-icon class="icons">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon> 

            <v-list-item-content>
              <v-list-item-title> {{ item.title}} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>

    <!-- Cruds  -->
        <v-row>
            <v-col>
            <h1>Funcionarios</h1>
            </v-col>
            <v-col cols="1">
                <router-link :to="{name:'Login'}">
                    <v-btn class="pa-2 mt-2 d-flex justify-left" min-width="0" text
                    @click="salirSesion"
                    >
                        <v-icon>mdi-logout</v-icon>
                    </v-btn>
                </router-link>
            </v-col>
        </v-row>
        <v-card>

            <v-card flat>
                <crud-medicos v-if="nombreCrud == 'medicos'"></crud-medicos>
                <crud-pacientes v-if="nombreCrud == 'pacientes'"></crud-pacientes>
            </v-card>

        </v-card>
    </v-container>
</template>

<script>
import { mapMutations, mapState,} from 'vuex'
import loginUsuario from '@/components/LoginUsuario.vue'
import crudMedicos from '@/components/CrudMedicos.vue'
import crudPacientes from '@/components/CrudPacientes.vue'
import { mapActions } from 'vuex'

export default {
    name: 'Funcionarios',
    components:{
        crudMedicos,
        crudPacientes,
    },
    data () {
      return {
        tipoUsuario : '',
        nombreCrud: 'informes',
        items: [
          { 
            title: 'Registrar pacientes', 
            icon: 'mdi-account', 
            to: '/funcionarios', 
          },
          { 
            title: 'Registrar médicos', 
            icon: 'mdi-doctor', 
            to: '/medicos' 
          },
          { 
          title: 'Informes', 
            icon: 'mdi-clipboard-outline', 
            to: '/informes'
          },
        ],
        right: null,

      }
    },    
    methods:{
        ...mapActions(['cerrarSesionFuncionario']),
        salirSesion(){
            this.cerrarSesionFuncionario()
            //location.reload();
        },
      mostrarCrud(nombre){
        switch (nombre) {
            case 'Registrar pacientes':
                this.nombreCrud = 'pacientes'
                break;
            case 'Registrar médicos':
                this.nombreCrud = 'medicos'
                break;
        
            case 'Informes':
                this.nombreCrud = 'informes'
                break;
            default:
                break;
        }
        console.log(this.nombreCrud)
      }        
    },
    computed: {
      ...mapState(['barColor','barImage', 'loginImage', 'documento']),

      drawer: {
        get () {
          return this.$store.state.drawer
        },
        set (val) {
          this.$store.commit('SET_DRAWER', val)
        },
      },
      computedItems () {
        return this.items.map(this.mapItem)
      }
    }
}
</script>

<style scoped>
  a {
    text-decoration: none;
  }
  div{
      padding: 1rem;
      padding-top: 0;
  }
  .icons{
      margin-left: 1px;
      margin-right: 1px;
      padding-left: 2px;
      padding-right: 2px;
  }
  .items{
      margin-left: 1px;
      margin-right: 1px;
      padding-left: 2px;
      padding-right: 2px;
  }
</style>