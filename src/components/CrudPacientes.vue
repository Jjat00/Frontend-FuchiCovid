<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Información pacientes</v-toolbar-title>
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
                    <v-text-field v-model="editedItem.documento" 
                        label="documento" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                    <v-combobox v-model="editedItem.tipoDocumento" 
                        :items="itemsDocumentos" label="tipo documento" required></v-combobox>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.nombre" 
                        label="Nombre 1" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.nombre" 
                        label="Nombre 2" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.apellido" 
                        label="Apellido 1" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.apellido" 
                        label="Apellido 2" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.documento" 
                        label="Edad" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.universidad" 
                        label="Mo. personas en cas" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.entidad" 
                        label="Documento médico" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.documento" 
                        label="Coordenadas" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.documento" 
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
            <td class="text-xs-right">{{ item.documentoMedico }}</td>
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
                @click="deleteItem(item)"
            >
                mdi-delete
            </v-icon>
            </td>
        </tr>
    </template> 

<!--       <template v-slot:items="props">
        <td>{{ props.item.nombre }}</td>
        <td class="text-xs-right">{{ props.item.apellido }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            mdi-delete
          </v-icon>
        </td>
      </template> 
 -->
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
          text: 'Documento médico',
          align: 'center',
          sortable: false,
          value: 'documentoMedico'
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
        documentoMedico:null,
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
        documentoMedico:null,
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
      initialize () {
        const fecha = new Date()
        console.log(fecha)
        this.pacientes = [
          {
            fechaRegistro: '12-10-2020',
            horaRegistro: '20:20',
            documento: 11931551,
            tipoDocumento: 'C.C',
            nombre1: 'Lina',
            nombre2: 'Marcela',
            apellido1: 'Duque',
            apellido2: 'Becerra',
            edad:19,
            personasCasa:4,
            documentoMedico:3191542,
            coordenadas:'48-785N',
            ciudadInfeccion:'Cali',
            direccion: 'calle 54 a # 1',
            barrio: 'Los Andes',
          },
          {
            fechaRegistro: '12-10-2020',
            horaRegistro: '20:20',
            documento: 11931906,
            tipoDocumento: 'C.C',
            nombre1: 'Luisa',
            nombre2: 'Marcela',
            apellido1: 'Diaz',
            apellido2: 'Lopez',
            edad:35,
            personasCasa:2,
            documentoMedico:3191542,
            coordenadas:'48-895N',
            ciudadInfeccion:'Medellin',
            direccion: 'calle 54 a # 6',
            barrio: 'Floralia',
          },
          {
            fechaRegistro: '12-10-2020',
            horaRegistro: '18:20',
            documento: 1193146,
            tipoDocumento: 'C.C',
            nombre1: 'Juan',
            nombre2: 'Martin',
            apellido1: 'Lopez',
            apellido2: 'Becerra',
            edad:15,
            personasCasa:2,
            documentoMedico:31915428,
            coordenadas:'48-785N',
            ciudadInfeccion:'Cali',
            direccion: 'calle 89 a # 1',
            barrio: 'Los álamos',
          }
        ]
      },

      editItem (item) {
        this.editedIndex = this.pacientes.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.pacientes.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.pacientes.splice(index, 1)
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
          Object.assign(this.pacientes[this.editedIndex], this.editedItem)
        } else {
          this.pacientes.push(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>