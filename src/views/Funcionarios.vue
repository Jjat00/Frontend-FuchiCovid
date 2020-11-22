<template>
    <v-container>
        <h1>Funcionarios</h1>

        <v-card>
            <v-tabs
            v-model="tab"
            
            dark
            >
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
                <v-card-text>{{ item.content }}</v-card-text>
                <crudMedicos v-if="item.tab == 'Medicos'"></crudMedicos>
                <crudPacientes v-if="item.tab == 'Pacientes'"></crudPacientes>

                </v-card>
            </v-tab-item>
            </v-tabs-items>
        </v-card>
        
    </v-container>
</template>

<script>
import crudMedicos from '@/components/CrudMedicos.vue'
import crudPacientes from '@/components/CrudPacientes.vue'

export default {
    name: 'Funcionarios',
    components:{
        crudMedicos,
        crudPacientes
    },
    data () {
      return {
        tab: null,
        items: [
          { tab: 'Medicos', content: 'Tab 1 Content' },
          { tab: 'Pacientes', content: 'Tab 2 Content' },
        ],
      }
    },    
    
}
</script>