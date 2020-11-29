<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Información de médicos</v-toolbar-title>
      <h2>{{documentoFuncionario}}</h2>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn dark class="mb-2" v-on="on">Nuevo</v-btn>
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
                      <v-text-field v-model="editedItem.nombre1" 
                        label="Nombre 1" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.nombre2" 
                        label="Nombre 2" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.apellido1" 
                        label="Apellido 1" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.apellido2" 
                        label="Apellido 2" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.documento" 
                        label="documento" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                    <v-combobox v-model="editedItem.tipoDocumento" 
                        :items="itemsDocumentos" label="tipo documento" required></v-combobox>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.universidad" 
                        label="universidad" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.entidad" 
                        label="entidad" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.direccion" 
                        label="direccion" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.barrio" 
                        label="barrio" required></v-text-field>
                    </v-flex>
                    <v-row class="pa-2 mt-2 d-flex justify-center">
                        <v-btn class="mt-2" width="200" type="submit" 
                        large color="info">Registrar</v-btn>
                    </v-row>
                    </v-layout>
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
      :items="medicos"
      class="elevation-1"
    >
    <template v-slot:item="{ item }">
        <tr>
            <td>{{ item.nombre1 }}</td>
            <td>{{ item.nombre2 }}</td>
            <td class="text-xs-right">{{ item.apellido1 }}</td>
            <td class="text-xs-right">{{ item.apellido2 }}</td>
            <td class="text-xs-right">{{ item.documento }}</td>
            <td class="text-xs-right">{{ item.tipoDocumento }}</td>
            <td class="text-xs-right">{{ item.universidad }}</td>
            <td class="text-xs-right">{{ item.entidad }}</td>
            <td class="text-xs-right">{{ item.direccion }}</td>
            <td class="text-xs-right">{{ item.barrio }}</td>
            <td class="justify-center layout px-0">  
            <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
            >
                mdi-pencil
            </v-icon>
            <v-icon
                small
                @click="deleteItem(item)"
            >
                mdi-delete
            </v-icon>
            </td>
        </tr>
    </template> 
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'

  export default {
    name: 'crudMedicos',
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Nombre1',
          align: 'center',
          sortable: false,
          value: 'nombre1'
        },
        {
          text: 'Nombre2',
          align: 'center',
          sortable: false,
          value: 'nombre2'
        },
        {
          text: 'Apellido1',
          align: 'center',
          sortable: false,
          value: 'apellido1'
        },
        {
          text: 'Apellido2',
          align: 'center',
          sortable: false,
          value: 'apellido2'
        },
        { text: 'No. Documento', align: 'center', value: 'documento', sortable: false,},
        {
          text: 'Tipo documento',
          align: 'center',
          sortable: false,
          value: 'tipoDocumento'
        },
        {
          text: 'Universidad',
          align: 'center',
          sortable: false,
          value: 'universidad'
        },
        {
          text: 'Entidad',
          align: 'center',
          sortable: false,
          value: 'entidad'
        },
        {
          text: 'Dirección',
          align: 'center',
          sortable: false,
          value: 'direccion'
        },
        {
          text: 'Barrio',
          align: 'center',
          sortable: false,
          value: 'barrio'
        },
        { text: 'Actions',sortable: false }
      ],
      medicos: [],
      itemsDocumentos: [
          'C.C',
          'C.E'
      ],
      editedIndex: -1,
      editedItem: {
        nombre1: '',
        nombre2: '',
        apellido1: '',
        apellido2: '',
        documento: 0,
        tipoDocumento: '',
        universidad: '',
        entidad: '',
        direccion: '',
        barrio: '',
      },
      defaultItem: {
        nombre1: '',
        nombre2: '',
        apellido1: '',
        apellido2: '',
        documento: 0,
        tipoDocumento: '',
        universidad: '',
        entidad: '',
        direccion: '',
        barrio: '',
      }
    }),

    computed: {
      ...mapState(['documentoFuncionario']),

      formTitle () {
        return this.editedIndex === -1 ? 'Regitrar médico' : 'Actualizar médico'
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
      initialize () {
        this.medicos = [
          {
            nombre1: 'nombre1',
            nombre2: 'nombre1',
            apellido1: 'apellido1',
            apellido2: 'apellido1',
            documento: 104646454,
            tipoDocumento: 'T.I',
            universidad: 'U. Valle',
            entidad: 'Comfenalco',
            direccion: 'Calle 4c#90-27',
            barrio: 'Melendez',
          },
          {
            nombre1: 'nombre2',
            nombre2: 'nombre2',
            apellido1: 'apellido2',
            apellido2: 'apellido2',
            documento: 104646454,
            tipoDocumento: 'C.C',
            universidad: 'U. Valle',
            entidad: 'Comfenalco',
            direccion: 'Calle 4c#95-27',
            barrio: 'Capri',
          },
          {
            nombre1: 'nombre3',
            apellido1: 'apellido3',
            nombre2: 'nombre3',
            apellido2: 'apellido3',
            documento: 104646424,
            tipoDocumento: 'T.I',
            universidad: 'U. Valle',
            entidad: 'Comfenalco',
            direccion: 'Calle 4c#99-27',
            barrio: 'Melendez',
          }
        ]
      },
      
      editItem (item) {
        this.editedIndex = this.medicos.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.medicos.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.medicos.splice(index, 1)
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
          Object.assign(this.medicos[this.editedIndex], this.editedItem)
        } else {
          this.addMedico(this.editedItem)
          //this.medicos.push(this.editedItem)
        }
        this.close()
      },

      async addMedico(editedItem) {
        let res = null;
          try {
            console.log(editedItem)
            const myHeaders = new Headers();
            const data = {
              method: 'POST',
                headers: myHeaders,
                body: new URLSearchParams({
                  'doctor_document': editedItem.documento,
                  'type_of_document': editedItem.tipoDocumento,
                  'name1': editedItem.nombre1,
                  'name2': editedItem.nombre2,
                  'lastname1': editedItem.apellido1,
                  'lastname1': editedItem.apellido2,
                  'university_name': editedItem.universidad,
                  'entity_name':editedItem.entidad,
                  'doctor_address': editedItem.direccion,
                  'neighborhood': editedItem.barrio,
                  'public_worker_ID':'1'
                })
              }
              
            /* console.log('Registrando medico...');
            const response = await fetch('https://centromedicofuchicovid.herokuapp.com/createDoctor', data)
            res = await response.json()
            console.log(res) */
            } catch (error) {
                console.log(error)
            } 
        }      
    }
  }
</script>