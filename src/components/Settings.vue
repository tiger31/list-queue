<template>
  <v-app>
    <v-content>
    <v-container fluid>
      <v-layout wrap justify-space-around row>
	<v-flex md4 sm12>
	  <v-card class="elevation-8">
	    <v-navigation-drawer floating permanent value="true" width="100%">

	    </v-navigation-drawer>
	  </v-card>
	</v-flex>
	<v-flex md8 sm12>
	  <v-container fluid>
	    <v-text-field v-model="newList" :rules="rules.newList" label="Добавить список" solo></v-text-field>
	    <v-btn color="info"
	      @click="addNewList"
	      :loadind="loaders.newList"
	      :disabled="loaders.newList"
	    >Добавить</v-btn>
	  </v-container>
	</v-flex>
      </v-layout>
    </v-container>
    </v-content>
  </v-app>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Settings',
  data () {
    return {
      newList: "",

      rules: {
        newList: [
	  v => !!v || "Название списка не может быть пустой строкой"
	]
      },
      loaders: {
        newList: false
      }
    }
  },

  methods: {
    addNewList () {
      if (this.newList != "") {
	this.loaders.newList = true;	
	this.$store.dispatch('addList', { name: this.newList })
	  .finally(() => this.loaders.newList = false);
      }
    }
  }
}

</script>

<style>
</style>
