<template>
  <div class="home">
    <v-img
      :src = loginImage
      max-width="3000"
      max-height="3000"
      >
  
    <v-row align="center">
            <v-col>
                <h1 class="mensaje text-center">
                    FuchiCOVID, una aplicación diseñada para el registro y seguimiento 
                    de pacientes diagnosticados con el virus del COVID-19.
                </h1>
            </v-col>      
      <v-col class="buttons">
        <v-card
          class="mx-auto my-12"
          max-width="350"
        >
        <v-img
        height="230"
        :src="barImage"
        ></v-img>
        <v-card-title>Funcionarios</v-card-title> 
        <v-card-actions>
          <v-btn
            color="deep-purple lighten-2"
            class="button mr-4 my-3"
            text block
            to="/funcionarios"
          >
            Ingresar
          </v-btn>
        </v-card-actions>
        </v-card>              
        
        </v-col>
        <v-col class="buttons">
        <v-card
          class="mx-auto my-12"
          max-width="350"
        >
        <v-img
        height="230"
        :src="barImage"
        ></v-img>
        <v-card-title>Médicos</v-card-title> 
        <v-card-actions>
          <v-btn
            color="deep-purple lighten-2"
            class="button mr-4 my-3"
            text block
            to="/medicos"
          >
            Ingresar
          </v-btn>
        </v-card-actions>
        </v-card>               
        </v-col>
        </v-row> 
        </v-img>    
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    
  },
      computed:{
        ...mapState(['loginImage', 'barImage'])
    }
}
</script>

<style  scoped>
    .buttons{
      padding-top: 2rem;
      text-align: center;
      opacity: 0.7;
    }
    .button{
      width: 250px;
    }
    .mensaje{
        font-weight: 800;
        font-style: italic;
        margin-top: 7rem;
        margin-bottom: 8rem;
        margin-left: 4rem;
        font-size: 30px;
        color: rgb(0, 0, 0);
    }    
</style>