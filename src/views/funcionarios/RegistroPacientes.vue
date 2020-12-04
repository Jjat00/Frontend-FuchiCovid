<template>
    <v-container>
        <drawer-funcionarios/>
        <crud-pacientes/>
    </v-container>
</template>

<script>
import crudPacientes from '@/components/funcionarios/CrudPacientes.vue'
import drawerFuncionarios from '@/components/funcionarios/DrawerFuncionarios.vue'
export default {
    components:{
        crudPacientes,
        drawerFuncionarios
    }
}
</script>

<style>

</style>