<template>
<v-container>
  <h1 class="mx-4">Pedidos</h1>
  <drawer-medicos/>
  <crud-pedidos/>
</v-container>
</template>

<script>
import drawerMedicos from '@/components/medicos/DrawerMedicos.vue'
import crudPedidos from '@/components/medicos/CrudPedidos.vue'

export default {
  components: { 
      drawerMedicos,
      crudPedidos
    },
    name: 'pedidos'
}
</script>

<style>

</style>