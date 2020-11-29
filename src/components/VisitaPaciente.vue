<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Visita paciente</v-toolbar-title>
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
                      <v-text-field v-model="editedItem.medicamento" 
                        label="Medicamento" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.dosis" 
                        label="Dosis (mg)" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.peso" 
                        label="Peso (Kg)" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.temperatura" 
                        label="Temperatura (C)" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.presion" 
                        label="Presión ()" required></v-text-field>
                    </v-flex>
                    <v-textarea
                      name="input-7-1"
                      label="Observaciones"
                      v-model="editedItem.observaciones" 
                    ></v-textarea>                    
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
      :items="visitas"
      class="elevation-1"
    >
    <template v-slot:item="{ item }">
        <tr>
            <td class="text-xs-right">{{ item.NoVisita }}</td>
            <td class="text-xs-right">{{ item.medicamento }}</td>
            <td class="text-xs-right">{{ item.dosis }}</td>
            <td class="text-xs-right">{{ item.peso }}</td>
            <td class="text-xs-right">{{ item.temperatura }}</td>
            <td class="text-xs-right">{{ item.presion }}</td>
            <td class="text-xs-right">{{ item.observaciones }}</td>
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
  export default {
    name: 'visitaPaciente',
    data: () => ({
      dialog: false,
      headers: [
        { 
          text: 'No. Visita', 
          align: 'center', 
          value: 'NoVisita', 
          sortable: true,},
        {
          text: 'Medicamento',
          align: 'center',
          sortable: false,
          value: 'medicamento'
        },
        {
          text: 'Dosis (mg)',
          align: 'center',
          sortable: false,
          value: 'dosis'
        },
        {
          text: 'Peso (Kg)',
          align: 'center',
          sortable: false,
          value: 'peso'
        },
        {
          text: 'Temperatura (C)',
          align: 'center',
          sortable: false,
          value: 'temperatura'
        },
        {
          text: 'Presión',
          align: 'center',
          sortable: false,
          value: 'presion'
        },
        {
          text: 'Observaciones',
          align: 'center',
          sortable: false,
          value: 'observaciones'
        },
        { text: 'Actions',sortable: false }
      ],
      visitas: [],
      editedIndex: -1,
      editedItem: {
        NoVisita: 0,
        medicamento: '',
        dosis: 0,
        peso: 0,
        temperatura: 0,
        presion: 0,
        observaciones : '',
      },
      defaultItem: {
        NoVisita: 0,
        medicamento: '',
        dosis: 0,
        peso: 0,
        temperatura: 0,
        presion: 0,
        observaciones : '',
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Registrar visita' : 'Actualizar visita'
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
        this.visitas = [
          {
            NoVisita: 1,
            medicamento: 'Chichanosol',
            dosis: 15,
            peso: 70,
            temperatura: 32,
            presion: 24,
            observaciones : 'tiene covid',
          },
          {
            NoVisita: 2,
            medicamento: 'Chichanosol',
            dosis: 15,
            peso: 70,
            temperatura: 32,
            presion: 24,
            observaciones : 'fuera de riesgo',
          },
          {
            NoVisita: 3,
            medicamento: 'Chichanosol',
            dosis: 15,
            peso: 70,
            temperatura: 32,
            presion: 24,
            observaciones : 'posible contagio',
          },
        ]
      },
      
      editItem (item) {
        this.editedIndex = this.visitas.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.visitas.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.visitas.splice(index, 1)
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
          Object.assign(this.visitas[this.editedIndex], this.editedItem)
        } else {
          this.addVisita(this.editedItem)
          this.visitas.push(this.editedItem)
        }
        this.close()
      },

      async addVisita(editedItem) {
        let res = null;
          try {
            console.log(editedItem)
            const myHeaders = new Headers();
            const data = {
              method: 'POST',
                headers: myHeaders,
                body: new URLSearchParams({
                  'doctor_document': editedItem.NoVisita,
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