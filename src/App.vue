<template>
<v-app>
  <v-toolbar app>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>Queue?</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn icon>
	<router-link to="/settings">
	  <v-icon>settings</v-icon>
	</router-link>
      </v-btn>
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
import Queue from "@/components/Queue";
import Navbar from "./components/Navbar";
export default {
  name: 'App',
  components: {Navbar, Queue},
  data : function() { 
    return {
      followId: 1,
      list: "jhdf69ux", 
    }
  },
  computed: {
    queuesList() {
      return this.$store.getters.getQueueWithFollow(this.followId);
    },
    currentQueue() {
      return this.$route.params.id;
    }
  },
  mounted() {
    if (localStorage.getItem("followId"))
      this.followId = localStorage.getItem("followId");
    //TODO axios
    console.log(this.$route.params);	
  }
}
</script>

<style>

</style>
