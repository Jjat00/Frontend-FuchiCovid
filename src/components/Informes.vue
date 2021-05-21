<template>
    <v-container>
      <v-row>
        <v-col>
          <h1 class="mx-4">Reportes</h1>
        </v-col>
        <v-col class="text-right">
            <v-btn class="mr-2"
              large dark @click="generarReporte">Generar Reporte
            </v-btn>
        </v-col>
      </v-row>
    <v-data-table
      :headers="headers"
      :items="reportes"
      class="elevation-1"
    >
    <template v-slot:item="{ item }">
        <tr>
            <td class="text-center">{{ item.NoReporte }}</td>
            <td class="text-center">{{ item.fecha }}</td>
            <td class="text-center">{{ item.hora }}</td>
            <td class="text-center">{{ item.promedioContagiados}}</td>
            <td class="text-center">{{ item.promedioEdad }}</td>
            <td class="text-center">{{ item.visitasDiarios }}</td>
            <td class="text-center">{{ item.visitasSemanales }}</td>
            <td class="text-center">{{ item.visitasMensuales }}</td>
        </tr>
    </template> 
    </v-data-table>        
    </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'informes',
    data: () => ({
        reportes: [],
        headers: [
        { 
          text: 'No. Reporte', 
          align: 'center', 
          value: 'NoReporte', 
          sortable: false,
        },
        {
          text: 'Fecha',
          align: 'center',
          sortable: false,
          value: 'fecha'
        },
        {
          text: 'Hora',
          align: 'center',
          sortable: false,
          value: 'hora'
        },
        {
          text: 'Prom. contagiados barrio',
          align: 'center',
          sortable: false,
          value: 'promedioContagiados'
        },
        {
          text: 'Prom. Edad',
          align: 'center',
          sortable: false,
          value: 'promedioEdad'
        },
        {
          text: 'Prom. visitas diarias',
          align: 'center',
          sortable: false,
          value: 'visitasDiarios'
        },
        {
          text: 'Prom. visitas semanales',
          align: 'center',
          sortable: false,
          value: 'visitasSemanales'
        },
        {
          text: 'Prom. visitas mensuales',
          align: 'center',
          sortable: false,
          value: 'visitasMensuales'
        }
      ],        
    }),
      
    methods:{
        async initialize () {
            try {
            this.reportes = []
            const res = await fetch(`${this.urlRoot}/getReport/`)
            const resDB = await res.json()
            console.log(resDB) 
            resDB.forEach(reporte => {
              const nuevaFecha = reporte.report_date.substring(0,10)
              const auxReport = {
                  NoReporte: reporte.report_number,
                  fecha: nuevaFecha,
                  hora: reporte.report_hour,
                  promedioContagiados : reporte.neighborhood_average,
                  promedioEdad: reporte.age_average,
                  visitasDiarios: reporte.diario,
                  visitasSemanales: reporte.semanal,
                  visitasMensuales: reporte.mensual,
                }
                this.reportes.push(auxReport)
                console.log(auxReport)
            });                    
            } catch (error) {
                console.log(error)
            }
      },   
      async generarReporte(){
          try {
            const myHeaders = new Headers();
            const data = {
              method: 'POST',
                headers: myHeaders,
                body: new URLSearchParams({})
            }            
            console.log('generando reportes...')
            const response = await fetch(`${this.urlRoot}/createReport`, data)
            console.log(response)
            this.initialize()
          } catch (error) {
            console.log(error)
          }
      }
    },
    computed:{
        ...mapState(['documentoMedico', 'urlRoot'])
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