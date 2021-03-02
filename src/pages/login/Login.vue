<template>
<form @submit.prevent="doLogin()" class="form-principal d-flex align-items-center justify-content-center">
        <template v-if="isLoading">
        <base-spinner/>
    </template>
    <template  v-else >
        <div class="card">
            <div class="card-header text-center">
                <img src="~/../../assets/logo.png">
                <h3>Seja bem-vindo</h3>
            </div>
            <div class="card-body">
                <div class="form-group">
                    <input 
                    required
                    type="email" 
                    class="form-control" 
                    placeholder="email@email.com" 
                    id="Email"
                    v-model="email">
                </div>
                <div class="form-group">
                    <input 
                    required 
                    type="password" 
                    class="form-control" 
                    placeholder="digite sua senha" 
                    id="password"
                    v-model="password"
                    :class="{errorAuth: hasError}">
                </div>
                <button class="btn btn-primary btn-block w-100" :disabled="isLoading" >   
                    Entrar
                </button>
                <h6 v-if="isError">{{errorMessage}}</h6>
            </div>
        </div>
    </template>
</form>
</template>

<script>
import BaseSpinner from '../../components/BaseSpinner.vue';

export default {
  components: { BaseSpinner },
  name: 'Login',
  data: () => {
    return {
        isLoading: false,
        isError: false,
        hasError: false,
        errorMessage: "",
        email: "",
        password: ""
    }
  },
  methods:{
    async doLogin(){
        this.isLoading = true;
        const {email, password} = this;
        try{
            const res = await this.$firebase.auth().signInWithEmailAndPassword(email, password);
            window.uid = res.user.uid;
            this.$router.push({name: "home"}).catch(()=>{});
        }catch(error){
            if(error.code === "auth/user-not-found"){
                this.isError = true;
               this.errorMessage = "Usuário não encontrado";
            }else if(error.code === "auth/wrong-password"){
                this.isError = true;
                this.hasError = true;
               this.errorMessage = "Senha Inválida";
            }    
        }
      setTimeout(()=>{
        this.isLoading = false
      }, 300)
    }
  },  
    beforeRouteEnter(to, from, next){
        next(vn => { 
            if(window.uid){
                vn.$router.push({name: "home"}).catch(()=>{})
            }
        })
    }
}
</script>
<style scoped>
.errorAuth{
    border: 1.5px solid rgb(255, 0, 0);
}
</style>
