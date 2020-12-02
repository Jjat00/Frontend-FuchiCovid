<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>Medicos</h1>
            </v-col>
            <v-col cols="1">
                <router-link :to="{name:'Home'}">
                    <v-btn class="pa-2 mt-2 d-flex justify-left" min-width="0" text
                    @click="salirSesion"
                    >
                        <v-icon>mdi-logout</v-icon>
                    </v-btn>
                </router-link>
            </v-col>
        </v-row>                
        <crudPacientes/>
        <visitaPaciente/>
        <contactoEmergencia/>
    </v-container>
</template>

<script>
import visitaPaciente from '@/components/VisitaPaciente.vue'
import crudPacientes from '@/components/CrudPacientes.vue'
import { mapActions } from 'vuex'

export default {
    name: 'Medicos',
    components:{
        crudPacientes,
        visitaPaciente,
    },
    methods:{
        ...mapActions(['cerrarSesionMedico']),
        salirSesion(){
            this.cerrarSesionMedico()
            location.reload();
        }        
    }
}
</script>


<style scoped>
  a {
    text-decoration: none;
  }
</style>