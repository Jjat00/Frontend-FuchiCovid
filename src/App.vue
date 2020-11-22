<template>
  <v-app>
    <v-container>
        <dashboard-core-app-bar/>
        <dashboard-core-drawer/>
      <v-main>
        <router-view></router-view>
      </v-main>
    </v-container>
  </v-app>
</template>

<script>
import DashboardCoreAppBar from "@/components/NavBar.vue"
import DashboardCoreDrawer from "@/components/Drawer.vue"

export default {
  name: 'App',

  components: {
    DashboardCoreAppBar,
    DashboardCoreDrawer
  },

  data: () => ({
    //
  }),
};
</script>
