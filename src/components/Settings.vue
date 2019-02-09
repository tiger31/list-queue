<template>
  <v-app>
    <v-navigation-drawer app dark>
      <v-list dense>
	<div class="subtitle pl-4" color="white">
	  Списки
	</div>
	<v-list-tile>
	  <v-list-tile-avatar tile>
	    <v-icon>view_headline</v-icon>
	  </v-list-tile-avatar>
	  <v-list-tile-content>
	    <v-list-tile-title>
	      Мои списки
	    </v-list-tile-title>
	  </v-list-tile-content>
	</v-list-tile>
	<div class="subtitle pl-4" color="white">
	  Аккаунт
	</div>
	<v-list-tile>
	  <v-list-tile-avatar tile>
	    <v-icon>settings</v-icon>
	  </v-list-tile-avatar>
	  <v-list-tile-content>
	    <v-list-tile-title>
	      Настройки
	    </v-list-tile-title>
	  </v-list-tile-content>
	</v-list-tile>
	<v-list-tile>
	  <v-list-tile-avatar tile>
	    <v-icon>power_settings_new</v-icon>
	  </v-list-tile-avatar>
	  <v-list-tile-content>
	    <v-list-tile-title>
	      Выйти
	    </v-list-tile-title>
	  </v-list-tile-content>
	</v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-content>
    <v-container fluid>
      <v-layout wrap justify-space-around row>
	<v-flex md8 sm12>
	  <v-container fluid>
	    <v-text-field v-model="newList" :rules="rules.newList" label="Добавить список" solo></v-text-field>
	    <v-btn color="info"
	      @click="addNewList"
	      :loadind="loaders.newList"
	      :disabled="loaders.newList"
	    >Добавить</v-btn>
	  </v-container>
		<v-container>
			<UserLists @listChoose="setActiveList" :lists="lists"/>
		</v-container>
	  <v-container v-if="currentList" fluid>
	    <ListView :list="currentList" :listData="currentListData" @updateList="updateList"/>
			<QueueView :list="currentList" :listData="currentListData" @updateQueues="updateQueues"/>
	  </v-container>
	</v-flex>
      </v-layout>
    </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Vue from 'vue'
import firebase from 'firebase'
import ListView from './ListView.vue'
import UserLists from './UserLists.vue'
import QueueView from './QueueView.vue'

export default {
  name: 'Settings',
  components: { ListView, QueueView, UserLists },
  data () {
    return {
      newList: "",
      currentList: undefined,
      rules: {
        newList: [
					v => !!v || "Название списка не может быть пустой строкой"
				]
      },
      loaders: {
        newList: false
      },
			lists: {},
    }
  },
  computed: {
		currentListData() {
			return (this.currentList) ? this.lists[this.currentList] : undefined;
		}
	},
  methods: {
    addNewList () {
      if (this.newList != "") {
			this.loaders.newList = true;	
			this.$store.dispatch('addList', { name: this.newList })
				.then((doc) => this.currentList = doc.id)
				.catch((err) => console.log(err))
      }
    },
		setActiveList(key) {
		  this.currentList = key;
		},
		getUserLists () {	
			firebase.firestore().collection("lists").where("owner", "==", firebase.auth().currentUser.uid).get()
				.then((querySnapshot) => querySnapshot.forEach(doc => Vue.set(this.lists, doc.id, doc.data())))
				.catch((err) => console.log("Ошибка при получание списков пользователя", err));
		},
		updateList(list, elements) {
			Vue.set(this.lists[list], 'elements', elements)
		},
		updateQueues(list, elements) {
			Vue.set(this.lists[list], 'queues', elements)
		}
  },
	mounted () {
		firebase.auth().onAuthStateChanged((user) => {
			if (user)
				user.getIdToken()
					.then(() => this.getUserLists())
					.catch((err) => console.log(err))
		})
	}
}

</script>

<style>
</style>
