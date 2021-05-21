<template>
  <div class="mx-4">
    <h2>Documento Paciente: {{documentoPaciente}}</h2>
    <v-toolbar flat color="white">
      <v-toolbar-title>Contacto de emergencia</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn dark class="mb-2" v-on="on">Nuevo Contacto</v-btn>
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
                      <v-text-field v-model="editedItem.documento" 
                        label="documento" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.nombre1" 
                        label="nombre1" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.nombre2" 
                        label="nombre2" ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.apellido1" 
                        label="apellido1" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.apellido2" 
                        label="apellido2" ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.celular" 
                        label="celular" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.relacion" 
                        label="relacion" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.correo" 
                        label="correo" required></v-text-field>
                    </v-flex>

                  
                    </v-layout>
                        <v-row class="pa-2 mt-2 d-flex justify-center">
                        <v-btn class="mt-2" width="200" type="submit" 
                        large dark>Registrar</v-btn>
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
      :items="contacto"
      class="elevation-1"
    >
    <template v-slot:item="{ item }">
        <tr>
            <td class="text-xs-right">{{ item.documento }}</td>
            <td class="text-xs-right">{{ item.nombre1 }}</td>
            <td class="text-xs-right">{{ item.nombre2 }}</td>
            <td class="text-xs-right">{{ item.apellido1 }}</td>
            <td class="text-xs-right">{{ item.apellido2 }}</td>
            <td class="text-xs-right">{{ item.celular }}</td>
            <td class="text-xs-right">{{ item.relacion }}</td>
            <td class="text-xs-right">{{ item.correo }}</td>
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
  import {mapState} from 'vuex'
  export default {
    name: 'crudContactoEmergencia',
    data: () => ({
      dialog: false,
      documentoPaciente: null,
      headers: [
        { 
          text: 'Documento', 
          align: 'center', 
          value: 'documento', 
          sortable: true
        },
        { 
          text: 'Nombre 1', 
          align: 'center', 
          value: 'nombre1', 
          sortable: true,},
        {
          text: 'Nombre 2',
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
          text: 'Celular',
          align: 'center',
          sortable: false,
          value: 'celular'
        },
        {
          text: 'Relación',
          align: 'center',
          sortable: false,
          value: 'relacion'
        },
        {
          text: 'Correo',
          align: 'center',
          sortable: false,
          value: 'correo'
        },
        { text: 'Actions',sortable: false }
      ],
      contacto: [],
      editedIndex: -1,
      editedItem: {
        documento: null,
        nombre1: '',
        nombre2: '',
        apellido1: '',
        apellido2: '',
        celular: null,
        relacion: '',
        correo: '',
      },
      defaultItem: {
        documento: null,
        nombre1: '',
        nombre2: '',
        apellido1: '',
        apellido2: '',
        celular: null,
        relacion: '',
        correo: '',
      },
    }),

    computed: {
      ...mapState(['urlRoot']),

      formTitle () {
        return this.editedIndex === -1 ? 'Registrar contacto' : 'Actualizar contacto'
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
        this.contacto = []
        const res = await fetch(`${this.urlRoot}/getEmergencyContact/${this.documentoPaciente}`)
        const resDB = await res.json()
        console.log(resDB)  
        resDB.forEach(contactoPaciente => {
            const auxContactoPacientes = {
              documento: contactoPaciente.contact_document,
              nombre1: contactoPaciente.name1,
              nombre2: contactoPaciente.name2,
              apellido1: contactoPaciente.lastname1,
              apellido2: contactoPaciente.lastname2,
              celular:contactoPaciente.phone,
              relacion: contactoPaciente.relationship,
              correo: contactoPaciente.email
            }
            this.contacto.push(auxContactoPacientes)
        });                  
      },
      
      editItem (item) {
        this.editedIndex = this.contacto.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.contacto.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.contacto.splice(index, 1)
        this.editedItem = Object.assign({}, item)
        this.deleteContacto(this.editedItem)        
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
          this.updateInfoContacto(this.editedItem)
          Object.assign(this.contacto[this.editedIndex], this.editedItem)
        } else {
          this.addContacto(this.editedItem)
        }
        this.close()
      },
      async deleteContacto(editedItem) {
            let res = null;
            try {
                const myHeaders = new Headers();
                const data = {
                method: 'DELETE',
                    headers: myHeaders,
                    body: new URLSearchParams({
                    'patient_document': this.documentoPaciente,
                    'contact_document': editedItem.documento
                    })
                }
                const response = await fetch(`${this.urlRoot}/deleteEmergencyContact`, data)
                console.log(response)
            } catch (error) {
                console.log(error)
            }
            console.log(res)
        },      
      async updateInfoContacto(editedItem) {
          let res = null
          try {
              const myHeaders = new Headers();
              const data = {
              method: 'PUT',
                headers: myHeaders,
                body: new URLSearchParams({
                'patient_document': this.documentoPaciente,
                'contact_document': editedItem.documento,
                'name1': editedItem.nombre1,
                'name2': editedItem.nombre2,
                'lastname1': editedItem.apellido1,
                'lastname2': editedItem.apellido2,
                'relationship': editedItem.relacion,
                'phone':editedItem.celular,
                'email': editedItem.correo
                })
              }
              console.log(data)
              console.log('Actualizando contacto...');
              const response = await fetch(`${this.urlRoot}/editEmergencyContact`, data)
              console.log(response)
          } catch (error) {
              console.log(error)
          }
      },
      async addContacto(editedItem) {
        let res = null;
          try {
            console.log(editedItem)
            const myHeaders = new Headers();
            const data = {
              method: 'POST',
                headers: myHeaders,
                body: new URLSearchParams({
                  'patient_document' : this.documentoPaciente, 
                  'contact_document' : editedItem.documento, 
                  'name1' : editedItem.nombre1, 
                  'name2' : editedItem.nombre2, 
                  'lastname1' : editedItem.apellido1, 
                  'lastname2' : editedItem.apellido2, 
                  'relationship' : editedItem.relacion, 
                  'phone' : editedItem.celular, 
                  'email' : editedItem.correo
                })
              }
              
            console.log('Registrando contacto de emergencia...');
            const response = await fetch(`${this.urlRoot}/createEmergencyContact`, data)
            console.log(response)
            this.initialize() 
            } catch (error) {
                console.log(error)
            } 
        }      
    }
  }
</script>