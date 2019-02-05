<template>
  <v-app>
    <v-content>
      <v-container fluid>
	<v-layout wrap row>
	  <v-flex md6 sm8 offset-sm2 offset-md3>
	    <v-card class="elevetion-8 py-4 px-4">
	      <v-card-title primary-title>
		<h4 class="display-1">Вход</h4>
	      </v-card-title>
	      <v-card-title>
		<v-form id="login-from" v-model="valid">
		  <v-text-field label="Электронная почта"
		    v-model="email"
      		    :rules="rules.email"
		    required>
		  </v-text-field>
		  <v-text-field label="Пароль"
		    v-model="password"
      		    :rules="rules.password"
      		    :type="'password'"
		    required>
		  </v-text-field>
		</v-form>
	      </v-card-title>
	      <v-card-actions>
		<router-link to="/register">Регистрация</router-link>
		<v-spacer></v-spacer>
		<v-btn color="info" @click="login">Войти</v-btn>
	      </v-card-actions>
	    </v-card>
	  </v-flex>
	</v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import firebase from 'firebase'


export default {
  name: 'Login',
  data () {
    return {
      valid: false,
      email: "",
      password: "",
      rules: {
        password: [
	  v => !!v || "Это поле обязательно для заполнения",
	],
	email: [
	  v => !!v || "Это поле обязательно для заполнения",
	  v => /.+@.{2,}\..{2,}/.test(v) || "Электронная почта имеет неправильный формат"
	]
      }
    }
  },
  methods: {
    login () {
      if (this.valid)
	firebase.auth().signInWithEmailAndPassword(this.email, this.password)
	  .then((user) => {
	    if (!user.user.emailVerified)
	      firebase.auth().signOut(); 
	    else 
	      this.$router.push("/");
	  }).catch((err) => console.log(err));
    }
  }

}

</script>

<style>
 #login-from {
   width: 100%;
 }
 a {
   text-decoration: none;
 }
</style>
