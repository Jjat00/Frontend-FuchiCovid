<template>
    <v-container>
        <drawer-funcionarios/>
        <crud-contacto-emergencia/>
    </v-container>
</template>

<script>
import crudContactoEmergencia from '@/components/funcionarios/CrudContactoEmergencia.vue'
import drawerFuncionarios from '@/components/funcionarios/DrawerFuncionarios.vue'

export default {
    name: 'contactoPaciente',
    components:{
        crudContactoEmergencia,
        drawerFuncionarios
    },
}
</script>

<style>

</style>