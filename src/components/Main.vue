<template>
<v-app>
	<v-navigation-drawer class="elevation-5" floating app>
		<Navbar :queuesList="queuesList" :list="currentList"></Navbar>
	</v-navigation-drawer>
  <v-content>
    <v-container fluid>
      <v-layout wrap justify-space-around row>
				<v-flex xs12>
					
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
  computed: {
    queuesList() {
      return this.$store.getters.getQueueWithFollow;
    },
    currentQueue() {
      return this.$route.params.id;
    },
		currentList() {
			return this.$route.params.list;
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
    if (localStorage.getItem(this.list) !== undefined) {
      console.log(this.$store);
      this.$store.commit('setFollowId', {
				followId: parseInt(localStorage[this.list])
      });
    }
		this.$store.dispatch('getList', { list: this.$route.params.list });
  },
  watch: {
    '$route' (to, from) {
			if (to.name === 'queue' && from.name === 'queue' && to.params.list !== from.params.list)
				this.$store.dispatch('getList', { list: to.params.list });
    }
  }
}
</script>

<style>

</style>
