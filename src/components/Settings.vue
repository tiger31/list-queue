<template>
	<v-app>
		<v-content>
			<v-container fluid>
				<v-layout wrap justify-space-around row>
					<v-flex xs12>
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
							<v-layout wrap row>
								<v-flex sm12 md6>
									<ListView :list="currentList" :listData="currentListData" />
								</v-flex>
								<v-flex sm12 md6>
									<QueueView :list="currentList" :listData="currentListData" />
								</v-flex>
							</v-layout>
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

import QueueCard from './queue/QueueCard'

export default {
  name: 'Settings',
  components: { ListView, QueueView, UserLists, QueueCard},
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
    }
  },
  computed: {
		currentListData() {
			return (this.currentList) ? this.lists[this.currentList] : undefined;
		},
		lists() {
			return this.$store.state.user.lists;
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
  },
	mounted () {
		firebase.auth().onAuthStateChanged((user) => {
			if (user)
				user.getIdToken()
					.then(() => this.$store.dispatch('getUserLists'))
					.catch((err) => console.log(err))
		})
	}
}

</script>

<style>
</style>
