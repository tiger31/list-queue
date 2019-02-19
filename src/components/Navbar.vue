<template>
      <v-list>
	<router-link 
	  v-for="queue in queuesList"
	  :key="queue.id"
	  :to="{path : '/' + list + '/' + queue.id}"
	  tag="div">
	  <v-list-tile @click="">
	    <v-list-tile-avatar color="deep-purple lighten-1" size="28">
	    <span class="white--text">
	      {{(queue.order)?queue.order:'-'}}
	    </span>
	    </v-list-tile-avatar>
	    <v-list-tile-content>
	      <v-list-tile-title>{{queue.name}}</v-list-tile-title>
	    </v-list-tile-content>
	  </v-list-tile>
	</router-link>
      </v-list>
</template>

<script>
    export default {
      name: "Navbar",
      props: ["queuesList", "list"],
    }
</script>

<style lang="scss">

</style>
