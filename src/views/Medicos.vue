<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>Medicos</h1>
            </v-col>
            <v-col cols="1">
                <router-link :to="{name:'Login'}">
                    <v-btn class="pa-2 mt-2 d-flex justify-left" min-width="0" text
                    @click="salirSesion"
                    >
                        <v-icon>mdi-logout</v-icon>
                    </v-btn>
                </router-link>
            </v-col>
        </v-row>                

        <pacientes-medico></pacientes-medico>
        <visitaPaciente/>

    </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import visitaPaciente from '@/components/VisitaPaciente.vue'
import pacientesMedico from '@/components/PacientesMedico.vue'


export default {
    name: 'Medicos',
    components:{
        visitaPaciente,
        pacientesMedico,
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