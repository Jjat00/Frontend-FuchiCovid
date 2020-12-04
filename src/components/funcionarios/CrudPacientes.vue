<template>
  <div class="mx-4">
    <v-toolbar flat color="white">
      <h2>Información pacientes</h2>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn dark class="mb-2" v-on="on">Nuevo paciente</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
      <!-- Crear nuevo paciente  -->
          <v-card-text>
            <form ref="form"  @submit.prevent="save">
                <v-container grid-list-md>
                 <v-layout wrap>
                   <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.documento" 
                        label="documento" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                    <v-combobox v-model="editedItem.tipoDocumento" 
                        :items="itemsDocumentos" label="tipo documento" required></v-combobox>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.nombre1" 
                        label="Nombre 1" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.nombre2" 
                        label="Nombre 2" ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.apellido1" 
                        label="Apellido 1" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.apellido2" 
                        label="Apellido 2" ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.edad" 
                        label="Edad" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.personasCasa" 
                        label="No. personas en cas" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.documentoMedico" 
                        label="Documento médico" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.coordenadas" 
                        label="Coordenadas" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.ciudadInfeccion" 
                        label="Ciudad de contagio" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.direccion" 
                        label="Direccion" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.barrio" 
                        label="Barrio" required></v-text-field>
                    </v-flex>

                    <v-row class="pa-2 mt-2 d-flex justify-center">
                        <v-btn class="mt-2" width="200" type="submit" 
                        large dark>Registrar</v-btn>
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
    
  <!-- Consultar pacientes  -->    
    <v-data-table
      :headers="headers"
      :items="pacientes"
      class="elevation-1"
    >
    <template v-slot:item="{ item }">
        <tr>
            <td class="text-xs-right">{{ item.fechaRegistro}}</td>
            <td class="text-xs-right">{{ item.horaRegistro}}</td>
            <td class="text-xs-right">{{ item.documento }}</td>
            <td class="text-xs-right">{{ item.tipoDocumento }}</td>
            <td class="text-xs-right">{{ item.nombre1 }}</td>
            <td class="text-xs-right">{{ item.nombre2 }}</td>
            <td class="text-xs-right">{{ item.apellido1}}</td>
            <td class="text-xs-right">{{ item.apellido2}}</td>
            <td class="text-xs-right">{{ item.edad }}</td>
            <td class="text-xs-right">{{ item.personasCasa }}</td>
            <td class="text-xs-right">{{ item.medico }}</td>
            <td class="text-xs-right">{{ item.coordenadas }}</td>
            <td class="text-xs-right">{{ item.ciudadInfeccion }}</td>
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
                class="mr-2"
                @click="deleteItem(item)"
            >
                mdi-delete
            </v-icon>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  class="mt-1"
                  icon text
                >
                <router-link :to="{name:'ContactoEmergencia', params:{documentoPaciente: item.documento}}">
                  <v-icon small> 
                    mdi-account-plus 
                  </v-icon> 
                </router-link>
                </v-btn>
              </template>
              <span>Agregar contacto emergencia</span>
            </v-tooltip>
          </td>
        </tr>
    </template> 
    </v-data-table>
  </div>
</template>

<script>
  export default {
    name: 'crudPacientes',
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Fecha registro',
          align: 'center',
          sortable: false,
          value: 'fechaRegistro'
        },
        {
          text: 'Hora registro',
          align: 'center',
          sortable: false,
          value: 'horaRegistro'
        },
        { 
          text: 'No. Documento', 
          align: 'center', 
          value: 'documento', 
          sortable: false,
        },
        {
          text: 'Tipo documento',
          align: 'center',
          sortable: false,
          value: 'tipoDocumento'
        },
        {
          text: 'Nombre 1',
          align: 'center',
          sortable: false,
          value: 'nombre1'
        },
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
          text: 'Edad',
          align: 'center',
          sortable: false,
          value: 'edad'
        },
        {
          text: 'No. personas en casa',
          align: 'center',
          sortable: false,
          value: 'personasCasa'
        },
        {
          text: 'Médico',
          align: 'center',
          sortable: false,
          value: 'medico'
        },
        {
          text: 'Coordenadas',
          align: 'center',
          sortable: false,
          value: 'coordenada'
        },
        {
          text: 'Ciudad de infección',
          align: 'center',
          sortable: false,
          value: 'ciudadInfeccion'
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
      pacientes: [],
      itemsDocumentos: [
          'C.C',
          'C.E'
      ],
      editedIndex: -1,
      editedItem: {
        fechaRegistro: '',
        horaRegistro: '',
        documento: null,
        tipoDocumento: '',
        nombre1: '',
        nombre2: '',
        apellido1: '',
        apellido2: '',
        edad:null,
        personasCasa:null,
        medico:null,
        documentoMedico: null,
        coordenadas:'',
        ciudadInfeccion:'',
        direccion: '',
        barrio: '',
      },
      defaultItem: {
        fechaRegistro: '',
        horaRegistro: '',
        documento: null,
        tipoDocumento: '',
        nombre1: '',
        nombre2: '',
        apellido1: '',
        apellido2: '',
        edad:null,
        personasCasa:null,
        medico:null,
        documentoMedico: null,
        coordenadas:'',
        ciudadInfeccion:'',
        direccion: '',
        barrio: '',
      }
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Registrar paciente' : 'Actualizar paciente'
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
          this.pacientes = []
          const res = await fetch('https://centromedicofuchicovid.herokuapp.com/getPatient/')
          const resDB = await res.json()
          console.log(resDB) 
          resDB.forEach(paciente => {
              const nuevaFecha = paciente.register_date.substring(0,10)
              const auxPacientes = {
                fechaRegistro: nuevaFecha,
                horaRegistro: paciente.register_hour,
                documento: paciente.patient_document,
                tipoDocumento: paciente.type_of_document,
                nombre1: paciente.patient_name1,
                nombre2: paciente.patient_name2,
                apellido1: paciente.patient_lastname1,
                apellido2: paciente.patient_lastname2,
                edad: paciente.patient_age,
                personasCasa: paciente.patient_roommates,
                medico: paciente.doctor_name1 + ' ' + paciente.doctor_lastname1,
                coordenadas: paciente.coordinates,
                ciudadInfeccion: paciente.possible_infection_city,
                direccion: paciente.patient_address,
                barrio: paciente.neighborhood,
              }
              this.pacientes.push(auxPacientes)
              console.log(auxPacientes)
          });       
        } catch (error) {
          console.log(error)
        }
      },
      editItem (item) {
        this.editedIndex = this.pacientes.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item) {
        const index = this.pacientes.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.pacientes.splice(index, 1)
        this.editedItem = Object.assign({}, item)
        this.deletePaciente(this.editedItem)        
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
          this.updateInfoPaciente(this.editedItem)
          Object.assign(this.pacientes[this.editedIndex], this.editedItem)
        } else {
          this.addPaciente(this.editedItem)
        }
        this.close()
      },
      async addPaciente(editedItem) {
        let res = null;
          try {
            console.log(editedItem)
            console.log('Registrando paciente ...1');
            const headers = new Headers();
            const data = {
              method: 'POST',
                headers: headers,
                body: new URLSearchParams({
                  type_of_document: editedItem.tipoDocumento,
                  patient_document: editedItem.documento,
                  name1: editedItem.nombre1,
                  name2: editedItem.nombre2,
                  lastname1: editedItem.apellido1,
                  lastname2: editedItem.apellido2,
                  age: editedItem.edad,
                  people_in_the_house: editedItem.personasCasa,
                  coordinates: editedItem.coordenadas,
                  possible_infection_city: editedItem.ciudadInfeccion,
                  patient_address: editedItem.direccion,
                  doctor_document: editedItem.documentoMedico,
                  public_worker_ID: '1',
                  neighborhood: editedItem.barrio
                })
            }
            console.log('Registrando paciente...2');
            const response = await fetch('https://centromedicofuchicovid.herokuapp.com/createPatient', data)
            console.log('Registrando paciente...3');
            console.log(response)
            this.initialize()
            } catch (error) {
                console.log(error)
            } 
        },
      async updateInfoPaciente(editedItem) {
          let res = null
          try {
              const myHeaders = new Headers();
              const data = {
              method: 'PUT',
                headers: myHeaders,
                body: new URLSearchParams({
                'type_of_document': editedItem.tipoDocumento,
                'patient_document': editedItem.documento,
                'name1': editedItem.nombre1,
                'name2': editedItem.nombre2,
                'lastname1': editedItem.apellido1,
                'lastname2': editedItem.apellido2,
                'age': editedItem.edad,
                'people_in_the_house': editedItem.personasCasa,
                'coordinates': editedItem.coordenadas,
                'possible_infection_city': editedItem.ciudadInfeccion,
                'patient_address': editedItem.direccion,
                'doctor_document': editedItem.documentoMedico,
                'public_worker_ID': '1',
                'neighborhood': editedItem.barrio
                })
              }
              console.log(data)
              console.log('Registrando paciente...');
              const response = await fetch('https://centromedicofuchicovid.herokuapp.com/editPatient', data)
              console.log('Registrando paciente...2');
              res = await response.json()
              console.log(res)
          } catch (error) {
              console.log(error)
          }
        },        
        async deletePaciente(editedItem) {
            let res = null;
            try {
                const myHeaders = new Headers();
                const data = {
                method: 'DELETE',
                    headers: myHeaders,
                    body: new URLSearchParams({
                    'patient_document': editedItem.documento
                    })
                }
                const response = await fetch('https://centromedicofuchicovid.herokuapp.com/deletePatient', data)
                //const resDB = await response.json()
                console.log(response)
            } catch (error) {
                console.log(error)
            }
            console.log(res)
        },        
    }
  }
</script>


<style scoped>
  a {
    color: rgb(104, 105, 107);
    text-decoration: none;
  }
</style>