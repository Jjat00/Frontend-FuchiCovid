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
      :src="imagenDrawer"
      mobile-breakpoint="960"
      app
      width="260"
      v-bind="$attrs"    
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title my-2">
              {{nombreMedico}}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{documentoMedico}}
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
              <v-list-item-title> {{ item.title}} </v-list-item-title>
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
    name: 'drawerMedicos',
    components:{
      loginUsuario
    },
    data () {
      return {
        tipoUsuario : '',
        nombreCrud: null,
        items: [
          { 
            title: 'Pacientes', 
            icon: 'mdi-account', 
            to: '/pacientes', 
          },
          { 
            title: 'Pedidos', 
            icon: 'mdi-store', 
            to: '/pedidos' 
          },
          { 
          title: 'Informes', 
            icon: 'mdi-clipboard-outline', 
            to: '/medicos'
          },
        ],
        right: null,
      }
    },
    methods: {

    },
    computed: {
      ...mapState(['barColor', 'imagenDrawer','documentoMedico','nombreMedico']),

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