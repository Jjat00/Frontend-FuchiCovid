<template>
  <v-app>
    <v-container>
         <!-- <dashboard-core-app-bar/> -->
         <!-- <dashboard-core-drawer/>  -->
      <v-main>
        <router-view></router-view>
      </v-main>
    </v-container>
  </v-app>
</template>

<script>
import DashboardCoreAppBar from "@/components/NavBar.vue"
import DashboardCoreDrawer from "@/components/Drawer.vue"
import { mapActions } from 'vuex';

export default {
  name: 'App',

  components: {
    DashboardCoreAppBar,
    DashboardCoreDrawer
  },

  data: () => ({
    //
  }),

  methods: {
    ...mapActions(['leerTokenFuncionario', 'leerTokenMedico'])
  },
  created(){
    this.leerTokenFuncionario()
    this.leerTokenMedico()
  }
};
</script>

<style scoped>
    div{
        padding: 0;
        border: 0;
        margin-right: 0;
        margin-left: 0;
        max-width: 2000px;
    }

</style>