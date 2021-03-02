<template>
<div class="form-principal d-flex align-items-center justify-content-center">
    <template v-if="isLoading">
    <base-spinner/>
  </template>
  <template v-else>
    <div class="card">
      <div class="card-header text-center w-30">
        <img src="~/../assets/logo.png">
      </div>
      <div class="card-body">
        <div class="d-flex justify-content-between" v-for="teste in teste" :key="teste['.key']">
            <span class="d-flex flex-column ">
            <span>{{teste.nome}}</span>
            <span>{{teste.descricao}}</span>
            </span>
            <button type="button" class="btn btn-outline-danger btn-xs d-flex justify-content-center align-items-center" @click="delet(teste)">X</button>
        </div>
        <br>
        <form @submit.prevent="submit()">
          <div class="form-group">
            <input 
            type="text" 
            class="form-control" 
            placeholder="Nome" 
            id="name"
            v-model="name"
            required>
          </div>
          <div class="form-group">
            <input 
            type="text" 
            class="form-control" 
            placeholder="Descrição" 
            id="description"
            v-model="description"
            required>
          </div>
          <div class="d-flex flex-column align-items-center">
            <button class="btn btn-primary btn-block w-50">
              Registrar
            </button>
            <button type="button" class="btn btn-primary btn-block w-50" @click="logout" >
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
</div >
</template>

<script>
import BaseSpinner from '../components/BaseSpinner.vue';
import {db} from '../firebase/index'

const testeQueyRef = db.collection('teste').doc("dev02").collection("dados");

export default {
  components: { BaseSpinner },
  name: 'Home',
  props: ['id'],
  data () {
    return {
      isLoading: true,
        description: "",
        name: "",
        teste: []
    }
  },
  created(){
      setTimeout(()=>{
        this.isLoading = false
      }, 300)
    },
    firestore (){
      return{
        teste : testeQueyRef.orderBy('dt_registro')
      }
    },
  methods:{
    async logout(){
      this.isLoading = true;

      await this.$firebase.auth().signOut();

      this.$router.push({name: "login"}).catch(()=>{})
      setTimeout(()=>{
        this.isLoading = false
      }, 700)
    },
    submit(){
      testeQueyRef.
      add({
        descricao: this.description,
        boo_ativo: 1,
        nome: this.name,
        dt_registro: new Date()
      })
      this.name = ""
      this.description= ""
    },
  delet(teste){
    testeQueyRef.doc(teste.id).delete()
  }
  },  
}
</script>

<style scoped>
.btn{
  margin-top: 0.32rem;
}
.btn-xs{
  width: 20px !important;
}
</style>
