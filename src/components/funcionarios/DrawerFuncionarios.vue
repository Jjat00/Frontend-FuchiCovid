<template>
<v-container>
    <!-- Navigation  -->
    <div>
      <v-navigation-drawer
      v-model="drawer"
      :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
      :right="$vuetify.rtl"
      :src="imagenDrawer"
      mobile-breakpoint="960"
      app
      width="250"
      v-bind="$attrs"    
      >

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title my-2">
            {{nombrefuncianario}}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{documentoFuncionario}}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

        <v-divider></v-divider>

        <v-list
          dense
          nav
        >
          <v-list-item class="items"
            v-for="item in items"
            :key="item.title"
            :to="item.to"
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
</v-container>
</template>

<script>
  import { mapMutations, mapState,} from 'vuex'

  export default {
    name: 'drawerFuncionarios',

    data () {
      return {
        tipoUsuario : '',
        nombreCrud: null,
        items: [
          { 
            title: 'Registrar médicos', 
            icon: 'mdi-doctor', 
            to: '/registroMedicos' 
          },          
          { 
            title: 'Registrar pacientes', 
            icon: 'mdi-account', 
            to: '/registroPacientes', 
          },
          { 
          title: 'Informes', 
            icon: 'mdi-clipboard-outline', 
            to: '/funcionarios'
          },
        ],
        right: null,
      }
    },
    methods: {

    },
    computed: {
      ...mapState(['barColor', 'barImage', 'imagenDrawer', 
        'documentoFuncionario','nombrefuncianario']),

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