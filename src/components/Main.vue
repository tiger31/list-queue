<template>
<v-app>
  <v-toolbar app>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>Queue?</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-menu offset-y>	    
	<v-btn slot="activator" flat>
	  <v-icon>account_circle</v-icon>
	  {{(user) ? user.email: "Sign In"}}
	</v-btn>
	<v-list>
	  <router-link to="/settings">
	    <v-list-tile @click="">
	      <v-list-tile-action>
		<v-icon>settings</v-icon>
	      </v-list-tile-action>
	      <v-list-tile-content class="pr-2">
		Настройки
	      </v-list-tile-content>
	    </v-list-tile>
	    </router-link>
	  <router-link to="/lists">
	    <v-list-tile @click="">
	      <v-list-tile-action>
		<v-icon>format_list_numbered</v-icon>
	      </v-list-tile-action>
	      <v-list-tile-content>
		Очереди
	      </v-list-tile-content>
	    </v-list-tile>
	  </router-link>
	    <v-list-tile @click="">
	    <v-list-tile-action>
	      <v-icon>power_settings_new</v-icon>
	    </v-list-tile-action>
	    <v-list-tile-content>
	      Выйти
	    </v-list-tile-content>
	  </v-list-tile>
	</v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
  <v-content>
    <v-container fluid>
      <v-layout wrap justify-space-around row>
	<v-flex md4 sm12>
	  <v-card class="elevation-8">
	    <v-navigation-drawer floating permanent value="true" width="100%">
	      <Navbar :queuesList="queuesList" :list="list"></Navbar>
	    </v-navigation-drawer>
	  </v-card>
	</v-flex>
	<v-flex md8 sm12>
	  <Queue :queue="currentQueue"/>
	</v-flex>
      </v-layout>
    </v-container>
  </v-content>
</v-app>
</template>

<script>
import Queue from "./Queue";
import Navbar from "./Navbar";
import firebase from 'firebase';

export default {
  name: 'Main',
  components: {Navbar, Queue},
  data : function() { 
    return {
      list: "jhdf69ux",
    }
  },
  computed: {
    queuesList() {
      return this.$store.getters.getQueueWithFollow;
    },
    currentQueue() {
      return this.$route.params.id;
    },
    followId() {
      return this.$store.state.list.followId;
    },
    user() {
      return firebase.auth().currentUser;
    }
  },
  mounted() {
    //TODO temp fix remove futher
    if (this.$route.name == "root") {
      this.$router.push(`${this.list}/1`);
    }
    if (localStorage.getItem(this.list) !== undefined) {
      console.log(this.$store);
      this.$store.commit('setFollowId', {
	followId: parseInt(localStorage[this.list])
      });
    }
    //TODO axios
    console.log(this.$route);
  },
  watch: {
    '$route' (to, from) {
      if (to.name != "queue")
        this.$router.push(`${this.list}/1`);
    }
  }
}
</script>

<style>

</style>
