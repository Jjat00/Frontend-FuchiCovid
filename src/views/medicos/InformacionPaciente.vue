<template>
    <v-container class="mx-4 mt-3 pr-4">
        <drawer-medicos/>
        <div class="mx-4">
            <h1>Paciente: {{paciente.nombre}} {{paciente.apellido}}</h1>
            <h3> No documento: {{documentoPaciente}} </h3>
        </div>
        <visita-paciente/>
        <crud-personas-paciente/>
    </v-container>
</template>

<script>
import drawerMedicos from '@/components/medicos/DrawerMedicos.vue'
import visitaPaciente from '@/components/medicos/VisitaPaciente.vue'
import crudPersonasPaciente from '@/components/medicos/CrudPersonasPaciente.vue'
export default {
    components:{
        drawerMedicos,
        visitaPaciente,
        crudPersonasPaciente
    },
    data: () =>({
        documentoPaciente : null,
        paciente: {
            nombre : '',
            apellido : '',
        },
    }),
    created(){
        this.documentoPaciente = this.$route.params.documentoPaciente
        this.obtenerPaciente()
    },
    methods:{
        async obtenerPaciente(){
            const res = await fetch(`https://centromedicofuchicovid.herokuapp.com/getPatient/${this.documentoPaciente}`)
            const resDB = await res.json()
            this.paciente = {
                'nombre': resDB[0].patient_name1,
                'apellido': resDB[0].patient_lastname1
            }
            console.log(this.paciente) 
      },      
      async getContactosEmergencia () {
        this.contactos = []
        const res = await fetch(`https://centromedicofuchicovid.herokuapp.com/getEmergencyContact/${this.documentoPaciente}`)
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
      }
      
    }
}
</script>

<style>

</style>