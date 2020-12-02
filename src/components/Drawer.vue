<template>
    <div>
      <div>
        <v-row justify="center">
    <v-dialog
      v-model="drawerInicioSesion"
      max-width="400"
      max-heigth="600"
    >
    <v-card>
      <v-card-text>
        <loginUsuario :tipo-usuario="tipoUsuario"/>
      </v-card-text> 
    </v-card>

    </v-dialog>
  </v-row>
      </div>
      <v-navigation-drawer
      v-model="drawer"
      :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
      :right="$vuetify.rtl"
      :src="barImage"
      mobile-breakpoint="960"
      app
      width="260"
      v-bind="$attrs"    
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              Fuchi covid
            </v-list-item-title>
            <v-list-item-subtitle>
              items
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list
          dense
          nav
        >
          <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.to"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title @click="iniciarSecion(item.title)"> {{ item.title}} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>

</template>

<script>
  import { mapMutations, mapState,} from 'vuex'
  import loginUsuario from '@/components/LoginUsuario.vue'
  export default {
    name: 'DashboardCoreDrawer',
    components:{
      loginUsuario
    },
    data () {
      return {
        tipoUsuario : '',
        items: [
          { 
            title: 'Funcionarios', 
            icon: 'mdi-account', 
            to: '/funcionarios', 
          },
          { 
            title: 'Medicos', 
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
    methods: {
      ...mapMutations(['setDialogoSesion']),

      iniciarSecion(usuario){        
        if (usuario == 'Funcionarios') {
          console.log('iniciar sesion funcionarios')
          this.tipoUsuario = 'funcionario'
          if (this.documentoFuncionario != null) {
            this.setDialogoSesion(false)
          }else{
            this.setDialogoSesion(true)
          }  
        }
        if (usuario == 'Medicos') {
          console.log('iniciar sesion medicos') 
          this.tipoUsuario = 'medico'
          if (this.documentoMedico != null) {
            this.setDialogoSesion(false)
          }else{
            this.setDialogoSesion(true)
          }            
        }
      
        console.log(this.dialogoInicioSesion)
      }
    },
    computed: {
      ...mapState(['barColor', 'barImage', 'dialogoInicioSesion',
        'documentoFuncionario', 'documentoMedico']),

      drawer: {
        get () {
          return this.$store.state.drawer
        },
        set (val) {
          this.$store.commit('SET_DRAWER', val)
        },
      },

      drawerInicioSesion: {
        get () {
          return this.$store.state.dialogoInicioSesion
        },
        set (val) {
          this.$store.commit('setDialogoSesion', val)
        },
      },

      computedItems () {
        return this.items.map(this.mapItem)
      },
    },   

  }
</script>