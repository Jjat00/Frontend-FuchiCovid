<template>
    <v-container>
        <drawer-medicos/>
        <pacientes-medico></pacientes-medico>
    </v-container>
</template>

<script>
import pacientesMedico from '@/components/medicos/PacientesMedico.vue'
import drawerMedicos from '@/components/medicos/DrawerMedicos.vue'

export default {
    name: 'viewPacientesMedico',
    components:{
        pacientesMedico,
        drawerMedicos
    }
}
</script>

<style>

</style>