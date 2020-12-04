<template>
  <div class="home">
    <v-img
      :src = loginImage
      max-width="3000"
      max-height="3000"
      >
    <v-row align="center">
      <v-col>
        <v-img src="https://i.ibb.co/wBQZRnR/New-Project-5.png"
          max-width="500"
        >
        </v-img>
      </v-col>      
      <v-col class="buttons">
        <v-card
          class="mx-auto my-12"
          max-width="350"
        >
        <v-img
        height="230"
        :src="imagenServidorPublico"
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
        :src="imagenMedico"
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
        ...mapState(['loginImage', 'imagenMedico', 'imagenServidorPublico'])
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
</style>