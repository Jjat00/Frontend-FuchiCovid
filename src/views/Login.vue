<template>
<v-app>
    <v-container>
        
        <!-- <h1 class="titleLogin">FuchiCOVID</h1> -->

        <v-img
            :src = loginImage
            max-width="1500">
         <v-row>
            <v-col>
                <loginUsuario class="login"></loginUsuario>
            </v-col>
        </v-row> 
        </v-img>

    </v-container>

</v-app>



</template>

<script>
import loginUsuario from '@/components/LoginUsuario.vue'
import { mapState } from 'vuex'

export default {
    name: 'Login',
    components:{
      loginUsuario
    },
    data(){
        return{

        }
    },
    computed:{
        ...mapState(['loginImage'])
    }
}
</script>

<style scoped>
    div{
        padding: 0;
        border: 0;
        margin-right: 0;
        margin-left: 0;
        max-width: 2000px;
    }
    .titleLogin{
        color: rgb(224, 224, 224);
        padding-left: 10px;
        background-color: rgb(42, 42, 42);
        font-size: 40px;
    }
    .login{
        margin-top: 8rem;
        margin-bottom: 8rem;
        margin-right: 2rem;
        opacity: 0.8;
    }

</style>

