<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Personas con las que vive</v-toolbar-title>
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
                      <v-text-field v-model="editedItem.NoDocumento" 
                        label="No. documento" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.nombre1" 
                        label="nombre 1" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.nombre2" 
                        label="nombre 2"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.apellido1" 
                        label="apellido 1" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.apellido2" 
                        label="apellido 2"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.relacion" 
                        label="relación" required></v-text-field>
                    </v-flex>
                   
                    </v-layout>
                        <v-row class="pa-2 mt-2 d-flex justify-center">
                        <v-btn class="mt-2" width="200" type="submit" 
                        large color="info">Registrar</v-btn>
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
      :items="personasPaciente"
      class="elevation-1"
    >
    <template v-slot:item="{ item }">
        <tr>
            <td class="text-xs-right">{{ item.NoDocumento }}</td>
            <td class="text-xs-right">{{ item.nombre1 }}</td>
            <td class="text-xs-right">{{ item.nombre2 }}</td>
            <td class="text-xs-right">{{ item.apellido1 }}</td>
            <td class="text-xs-right">{{ item.apellido2 }}</td>
            <td class="text-xs-right">{{ item.relacion }}</td>
        </tr>
    </template> 
    </v-data-table>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'crudPersonasPaciente',
    data: () => ({
      dialog: false,
      headers: [
        { 
          text: 'No. Documento', 
          align: 'center', 
          value: 'NoDocumento', 
          sortable: true,},
        {
          text: 'nombre 1',
          align: 'center',
          sortable: false,
          value: 'nombre1'
        },
        {
          text: 'nombre 2',
          align: 'center',
          sortable: false,
          value: 'nombre2'
        },
        {
          text: 'Apellido 1',
          align: 'center',
          sortable: false,
          value: 'apellido1'
        },
        {
          text: 'Apellido 2',
          align: 'center',
          sortable: false,
          value: 'apellido2'
        },
        {
          text: 'Relación',
          align: 'center',
          sortable: false,
          value: 'relacion'
        },
      ],
      personasPaciente: [],
      editedIndex: -1,
      editedItem: {
        NoDocumento: null,
        nombre1: '',
        nombre2: '',
        apellido1: '',
        apellido2: '',
        relacion: null,
      },
      defaultItem: {
        NoDocumento: null,
        nombre1: '',
        nombre2: '',
        apellido1: '',
        apellido2: '',
        relacion: null,
      }
    }),

    computed: {
      ...mapState(['urlRoot']),
      formTitle () {
        return this.editedIndex === -1 ? 'Registrar nueva persona' : 'Actualizar persona'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.documentoPaciente = this.$route.params.documentoPaciente
      this.initialize()
    },

    methods: {
      async initialize () {
        try {        
          const response = await fetch(`${this.urlRoot}/getRoommates/${this.documentoPaciente}`)
          const res = await response.json()  
          console.log(res)
          res.forEach(element => {
            const auxPersona = {
              'NoDocumento': element.contact_document,
              'nombre1': element.name1,
              'nombre2': element.name2,
              'apellido1': element.lastname1,
              'apellido2': element.lastname2,
              'relacion': element.relationship,
            }
            this.personasPaciente.push(auxPersona)
          });                
        } catch (error) {
          console.log(error)
        }
        
      },
      
      editItem (item) {
        this.editedIndex = this.personasPaciente.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.personasPaciente.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.personasPaciente.splice(index, 1)
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
          Object.assign(this.personasPaciente[this.editedIndex], this.editedItem)
        } else {
          this.addPersonaVivienda(this.editedItem)
          this.personasPaciente.push(this.editedItem)
        }
        this.close()
      },

      async addPersonaVivienda(editedItem) {
        let res = null;
          try {
            const myHeaders = new Headers();
            const data = {
              method: 'POST',
                headers: myHeaders,
                body: new URLSearchParams({
                  'contact_document': editedItem.NoDocumento,
                  'name1' : editedItem.nombre1,
                  'name2' : editedItem.nombre2,
                  'lastname1' : editedItem.apellido1,
                  'lastname2' : editedItem.apellido2,
                  'relationship' : editedItem.relacion,
                  'patient_document' : this.documentoPaciente
                })
            }
              
            console.log('Registrando persona con la que vive...');
            const response = await fetch(`${this.urlRoot}/createRoommates`, data)
            res = await response.json()
            console.log(res)
            } catch (error) {
                console.log(error)
            } 
        }
    }
  }
</script>