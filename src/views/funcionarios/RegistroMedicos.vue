<template>
    <v-container>
        <drawer-funcionarios/>
        <crud-medicos/>
    </v-container>
</template>

<script>
import crudMedicos from '@/components/funcionarios/CrudMedicos.vue'
import drawerFuncionarios from '@/components/funcionarios/DrawerFuncionarios.vue'

export default {
    components:{
        crudMedicos,
        drawerFuncionarios
    }
}
</script>

<style>

</style>