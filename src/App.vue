<template>
  <div id="app">
    <template v-if="isLoading">
   <base-spinner />
    </template>
    <template  v-else>
  <router-view></router-view>
    </template>
  </div>
</template>

<script>
import 'regenerator-runtime/runtime'

export default {
  name: 'app',
  data () {
    return {
      isLoading: true,
    }
  },
  mounted(){
    this.$firebase.auth().onAuthStateChanged( user =>{
      window.uid = user ? user.uid : null;
      this.$router.push({name: window.uid? "home" : "login"}).catch(()=>{})
    })
    setTimeout(() => {
      this.isLoading = false
    }, 700)
  }, 
}
</script>

<style>
.form-principal{
    height: 100vh;
}
.card{
    width: 40%;
}
img{
  width: 4rem;
  height: 4rem;
}
</style>
