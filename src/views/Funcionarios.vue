<template>
    <v-container>
        <v-row>
            <v-col>
            <h1>Funcionarios</h1>
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
        <v-card>
            <v-tabs v-model="tab" dark>
                <v-tab
                    v-for="item in items"
                    :key="item.tab"
                >
                    {{ item.tab }}
                </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
            <v-tab-item
                v-for="item in items"
                :key="item.tab"
            >
            <v-card flat>
                <crud-medicos v-if="item.tab == 'Medicos'"></crud-medicos>
                <crud-pacientes v-if="item.tab == 'Pacientes'"></crud-pacientes>
            </v-card>
            </v-tab-item>
            </v-tabs-items>
        </v-card>
    </v-container>
</template>

<script>
import crudMedicos from '@/components/CrudMedicos.vue'
import crudPacientes from '@/components/CrudPacientes.vue'
import { mapActions } from 'vuex'

export default {
    name: 'Funcionarios',
    components:{
        crudMedicos,
        crudPacientes,
    },
    data () {
      return {
        tab: null,
        items: [
          { tab: 'Medicos' },
          { tab: 'Pacientes'},
        ],
      }
    },    
    methods:{
        ...mapActions(['cerrarSesionFuncionario']),
        salirSesion(){
            this.cerrarSesionFuncionario()
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