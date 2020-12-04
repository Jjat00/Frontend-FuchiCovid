<template>
  <v-app-bar
    id="app-bar" absolute app
    color="secondary" flat height="50"
  >
    <v-btn  color="button" dark
      class="mr-3" elevation="1" fab
      small @click="setDrawer(!drawer)"
    >
      <v-icon v-if="value">
        mdi-view-quilt
      </v-icon>

      <v-icon v-else>
        mdi-dots-vertical
      </v-icon>
    </v-btn>

    <v-toolbar-title class="titleLogin">
      FuchiCovid
    </v-toolbar-title>

    <v-spacer />

    <div class="mx-3" />

    <v-btn class="ml-2" min-width="0" text to="/">
      <v-icon>mdi-home</v-icon>
    </v-btn>

  </v-app-bar>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'DashboardCoreAppBar',
    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      ...mapState(['drawer']),
    },

    methods: {
      ...mapMutations({
        setDrawer: 'SET_DRAWER',
      }),
    },
  }
</script>

<style scoped>
    .titleLogin{
        color: rgb(224, 224, 224);
        padding-left: 10px;
        font-weight: bold;
        font-size: 30px;
    }
</style>