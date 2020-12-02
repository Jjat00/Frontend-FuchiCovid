<template>
    <v-container>
        <crud-contacto-emergencia/>
    </v-container>
</template>

<script>
import crudContactoEmergencia from '@/components/CrudContactoEmergencia.vue'
export default {
    name: 'ContactoEmergencia',
    components:{
        crudContactoEmergencia
    },
}
</script>

<style>

</style>