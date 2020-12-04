<template>
    <v-container>
    <!-- Navigations -->
    <drawer-funcionarios/>
    <!-- Cruds  -->
        <v-row>
            <v-col>
            <h1>Funcionarios</h1>
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
        <v-card>
            <v-card flat>
                <informes></informes>
            </v-card>

        </v-card>
    </v-container>
</template>

<script>
import { mapMutations, mapState, mapActions} from 'vuex'
import drawerFuncionarios from '@/components/funcionarios/DrawerFuncionarios.vue'
import informes from '@/components/Informes.vue'

export default {
    name: 'Funcionarios',
    components:{
        informes,
        drawerFuncionarios
    },
   
    methods:{
        ...mapActions(['cerrarSesionFuncionario']),
        salirSesion(){
            this.cerrarSesionFuncionario()
            //location.reload();
        },        
    },

}
</script>

<style scoped>
  a {
    text-decoration: none;
  }
  div{
      padding: 1rem;
      padding-top: 0;
  }
  .icons{
      margin-left: 1px;
      margin-right: 1px;
      padding-left: 2px;
      padding-right: 2px;
  }
  .items{
      margin-left: 1px;
      margin-right: 1px;
      padding-left: 2px;
      padding-right: 2px;
  }
</style>