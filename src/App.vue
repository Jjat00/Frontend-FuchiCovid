<template>
  <v-app>
    <v-container>
      <dashboard-core-app-bar/>
      <v-main>
        <router-view></router-view>
      </v-main>
    </v-container>
  </v-app>
</template>

<script>

import { mapActions, mapState } from 'vuex';
import DashboardCoreAppBar from "@/components/NavBar.vue"

export default {
  name: 'App',
  components: {
    DashboardCoreAppBar
  },
  methods: {
    ...mapActions(['leerTokenFuncionario','leerTokenMedico', 
      'leerNombreFuncionario', 'leerNombreMedico'])
  },
  computed:{
    ...mapState(['documentoFuncionario', 'documentoMedico'])
  },
  created(){
    this.leerTokenFuncionario()
    this.leerTokenMedico()
    this.leerNombreFuncionario()
    this.leerNombreMedico()
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