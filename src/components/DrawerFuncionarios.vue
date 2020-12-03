<template>
    <div>
      <div>
        <v-row justify="center">

  </v-row>
      </div>
      <v-navigation-drawer
      v-model="drawer"
      :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
      :right="$vuetify.rtl"
      :src="loginImage"
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
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title  @click="mostrarCrud(item.title)"> {{ item.title}} </v-list-item-title>
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
    name: 'drawerFuncionarios',
    components:{
      loginUsuario
    },
    data () {
      return {
        tipoUsuario : '',
        nombreCrud: null,
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
    methods: {
      mostrarCrud(nombre){
        console.log(nombre)
      }
    },
    computed: {
      ...mapState(['barColor', 'loginImage', 'dialogoInicioSesion',
        'documento']),

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
      },
    },   

  }
</script>