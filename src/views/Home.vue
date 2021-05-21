<template>
  <div class="home">
    <v-img
      src = ''
      max-width="3500"
      max-height="3500"
      >
    <v-row align="center">
      <div class="texto-principal margin-interno">
                <h1>Una aplicación diseñada para el registro y seguimiento de pacientes 
                    diagnosticados con el virus COV-SARS-2
                </h1>
      </div>   
    </v-row>
    <v-row>
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
    <footer class="footer margin-interno">
        <nav class="pie">
            <a href="#">Desarrollado por Jaime Aza</a>
        </nav>
    </footer>
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

    *{
        margin: 0;
        padding: 0px;
        box-sizing: border-box;
        text-decoration: none;
    }
    .home {
        font-family: 'Lora', serif;
        font-family: 'Montserrat', sans-serif;
    }

    .texto-principal{
        background: url(https://i.ibb.co/K6vJtd7/portada-Fuchi.jpg);
        background-position: center;
        background-attachment: contain;
        background-size: cover;
        height: 550px;
        display: flex;
        align-items: center;
    }

    h1{
        font-family: 'Montserrat', serif;
        font-size: 31px;
        color: rgb(26, 24, 24);
        font-weight: 2px;
        text-align: center;
        line-height: 1.6;
    }

    .footer{
        background: #202020;
        display: flex;
        justify-content: center;
        margin-top: 10px;
    }
    .pie{
        text-align: center;
    }
    .pie a{
        color: #fff;
        font-size: 11px;
        text-transform: uppercase;
        padding: 0 10px;
        letter-spacing: 2px;
    }   
    
    .buttons {
      padding-top: 2rem;
      text-align: center;
      
    }
    .button {
      width: 250px;
    }
</style>