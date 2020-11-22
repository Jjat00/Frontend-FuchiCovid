<template>
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
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

</template>

<script>
  import {mapState,} from 'vuex'
  export default {
    name: 'DashboardCoreDrawer',
    data () {
      return {
        items: [
          { title: 'Funcionarios', icon: 'mdi-account', to: '/funcionarios', },
          { title: 'Medicos', icon: 'mdi-doctor', to: '/medicos' },
          { title: 'Informes', icon: 'mdi-clipboard-outline', to: '/informes'},
        ],
        right: null,
      }
    },
    computed: {
      ...mapState(['barColor', 'barImage']),
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