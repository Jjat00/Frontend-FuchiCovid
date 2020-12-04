<template>
    <v-container>
        <drawerMedicos></drawerMedicos>
        <v-row>
            <v-col class="mx-4">
                <h1>Médicos</h1>
            </v-col>
            <v-col cols="1">
                <router-link :to="{name:'Login'}">
                    <v-btn class="pa-2 mt-2 d-flex justify-right" min-width="0" text
                    @click="salirSesion"
                    >
                        <v-icon>mdi-logout</v-icon>
                    </v-btn>
                </router-link>
            </v-col>
        </v-row>                

        <informes/>


    </v-container>
</template>

<script>
import { mapActions } from 'vuex'

import drawerMedicos from '@/components/medicos/DrawerMedicos.vue'
import informes from '@/components/Informes.vue'


export default {
    name: 'Medicos',
    components:{
        drawerMedicos,
        informes
    },
    methods:{
        ...mapActions(['cerrarSesionMedico']),
        salirSesion(){
            this.cerrarSesionMedico()
        }
    }
}
</script>


<style scoped>
  a {
    text-decoration: none;
  }
</style>