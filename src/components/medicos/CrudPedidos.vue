<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>laboratorios</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical        
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn dark class="mb-2" v-on="on">Hacer pedido</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <form ref="form"  @submit.prevent="save">
                <v-container grid-list-md>
                 <v-layout wrap>
                    <v-flex xs12 sm6 md4>
                    <v-combobox v-model="editedItem.laboratorio" 
                        :items="itemsLaboratorios" label="laboratorio" required>
                    </v-combobox>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                    <v-combobox v-model="editedItem.medicina" 
                        :items="itemsMedicinas" label="medicina" required>
                    </v-combobox>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.cantidad" 
                        label="cantidad" required></v-text-field>
                    </v-flex>
                    </v-layout>
                        <v-row class="pa-2 mt-2 d-flex justify-center">
                          <v-btn class="mt-2" width="200" type="submit" 
                            large dark>Registrar
                          </v-btn>
                        </v-row>
                </v-container> 
            </form>                 

          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="stock"
      class="elevation-1"
    >
    <template v-slot:item="{ item }">
        <tr>
            <td class="text-center">{{ item.laboratorio }}</td>
            <td class="text-center">{{ item.medicina }}</td>
            <td class="text-center">{{ item.cantidad }}</td>
        </tr>
    </template> 
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
  export default {
    name: 'crudPedidos',
    data: () => ({
      documentoPaciente: null,
      dialog: false,
      headers: [
        {
          text: 'Laboratorio',
          align: 'center',
          sortable: false,
          value: 'laboratorio'
        },
        {
          text: 'Medicina',
          align: 'center',
          sortable: false,
          value: 'medicina'
        },
        {
          text: 'Cantidad tabletas x 12 pastas',
          align: 'center',
          sortable: true,
          value: 'cantidad'
        },
      ],
        stock: [],
        itemsLaboratorios: [
          'Farma Palma',
          'CaliMed ltda.',
          'Valle Salud',
          'Colvida',
        ],
        itemsMedicinas: [
          'Chichanosol',
          'Choclometanol',
          'Mixamorranilo'
        ],
      editedIndex: -1,
      editedItem: {
        laboratorio: '',
        medicina: '',
        cantidad: null,
      },
      defaultItem: {
        laboratorio: '',
        medicina: '',
        cantidad: null,
      }
    }),

    computed: {
      ...mapState(['documentoMedico']),
      formTitle () {
        return this.editedIndex === -1 ? 'Registrar Pedido' : 'Actualizar pedido'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },
    created () {
      this.initialize()
    },

    methods: {
      async initialize () {
        try {
          this.stock = []
          const res = await fetch(`https://centromedicofuchicovid.herokuapp.com/getStock`)
          const resDB = await res.json()
          console.log(resDB)
          resDB.forEach(stock => {
            const auxStock = {
              laboratorio: stock.lab_name,
              medicina: stock.medicine_name,
              cantidad: stock.quantity,
            }
            this.stock.push(auxStock)
          });
        } catch (error) {
          console.log(error)
        }
      },
      
      editItem (item) {
        this.editedIndex = this.stock.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.stock.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.stock.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.stock[this.editedIndex], this.editedItem)
        } else {
          this.addPedido(this.editedItem)
          this.stock.push(this.editedItem)
        }
        this.close()
      },

      async addPedido(editedItem) {
        let res = null;
          try {
            console.log(editedItem)
            const myHeaders = new Headers();
            const data = {
              method: 'POST',
                headers: myHeaders,
                body: new URLSearchParams({
                    'medicine_name' : editedItem.medicina, 
                    'lab_name' : editedItem.laboratorio, 
                    'doctor_document' : this.documentoMedico, 
                    'quantity' : editedItem.cantidad
                  })
              }
              
            console.log('Registrando visita...');
            const response = await fetch('https://centromedicofuchicovid.herokuapp.com/doOrder', data)
            console.log(response)
            this.initialize()
            } catch (error) {
                console.log(error)
            } 
        }      
    }
  }
</script>