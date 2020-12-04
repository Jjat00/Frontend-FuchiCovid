<template>
    <v-container>
    <h1 class="mx-4">Tus pacientes</h1>
    <v-data-table
      :headers="headers"
      :items="pacientes"
      class="elevation-1"
    >
    <template v-slot:item="{ item }">
        <tr>
            <td class="text-xs-right">{{ item.documento }}</td>
            <td class="text-xs-right">{{ item.tipoDocumento }}</td>
            <td class="text-xs-right">{{ item.nombre1 }}</td>
            <td class="text-xs-right">{{ item.apellido1}}</td>
            <td class="text-xs-right">{{ item.edad }}</td>
            <td class="text-xs-right">{{ item.ciudadInfeccion }}</td>
            <td class="text-xs-right">{{ item.direccion }}</td>
            <td class="text-xs-right">{{ item.barrio }}</td>
            <td class="justify-center layout px-0">  


            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  class="mt-1"
                  icon text
                >
                <router-link :to="{name:'InformacionPaciente', params:{documentoPaciente: item.documento}}">
                  <v-icon small> 
                    mdi-eye
                  </v-icon> 
                </router-link>
                </v-btn>
              </template>
              <span>Agregar visita paciente</span>
            </v-tooltip>
          </td>
        </tr>
    </template> 
    </v-data-table>        
    </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'pacientesMedico',
    data: () => ({
        pacientes: [],
        headers: [
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
          text: 'Apellido 1',
          align: 'center',
          sortable: false,
          value: 'apellido1'
        },
        {
          text: 'Edad',
          align: 'center',
          sortable: false,
          value: 'edad'
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
    }),
    methods:{
        async initialize () {
            try {
            const res = await fetch(`https://centromedicofuchicovid.herokuapp.com/getPatientByDoctor/${this.documentoMedico}`)
            const resDB = await res.json()
            console.log(resDB) 
            resDB.forEach(paciente => {
                const auxPacientes = {
                  fechaRegistro: paciente.register_date,
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
                  coordenadas: '0',
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
    },
    computed:{
        ...mapState(['documentoMedico'])
    },
    created(){
        this.initialize()
    }
}
</script>

<style scoped>
  a {
    color: rgb(104, 105, 107);
    text-decoration: none;
  }
</style>