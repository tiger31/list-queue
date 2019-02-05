<template>
  <v-app>
    <v-content>
      <v-container fluid>
	<v-layout wrap row>
	  <v-flex md6 sm8 offset-sm2 offset-md3>
	    <v-card class="elevetion-8 py-4 px-4">
	      <v-card-title primary-title>
		<h4 class="display-1">Регистрация</h4>
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
		  <v-text-field label="Подтверждение пароля"
		    v-model="passwordConfirm"
      		    :rules="rules.passwordConfirm"
      		    :type="'password'"
		    required>
		  </v-text-field>
		</v-form>
	      </v-card-title>
	      <v-card-actions>
		<router-link to="/login">Уже есть аккаунт?</router-link>
		<v-spacer></v-spacer>
		<v-btn color="info" @click="login">Регистрация</v-btn>
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
  name: 'Register',
  data () {
    return {
      valid: false,
      email: "",
      password: "",
      passwordConfirm: "",
      rules: {
        password: [
	  v => !!v || "Это поле обязательно для заполнения",
	  v => /(?=.{8,})/.test(v) || "Пароль должен содержать не менее 8 символов",
	],
	passwordConfirm: [
	  v => v == this.password || "Пароли не совпадают"
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
	firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
	  .then((user) => {
	    if (firebase.auth().currentUser && !firebase.auth().currentUser.emailVerified) {
	      firebase.auth().currentUser.sendEmailVerification()
		.then(() => console.log("Email sent")) //TODO notification
	        .catch((err) => console.log("Error while sendind email", err))
	        .finally(() => firebase.auth().signOut());
	    }
	  })
          .catch((err) => console.log(err));
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
