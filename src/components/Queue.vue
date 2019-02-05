<template>
  <main>
  <v-container fluid :class="{ 'py-0' : !$vuetify.breakpoint.smAndDown, 'px-0' : !$vuetify.breakpoint.mdAndUp}">    
      <v-card class="elevation-8 queue">
	<v-toolbar dark>
	  <v-toolbar-title>
	    {{$store.state.list.queuesList[queue]}}
	  </v-toolbar-title>
	  <v-spacer></v-spacer>
	  <v-btn icon @click="editable = !editable">
	    <v-icon v-if="!editable">settings</v-icon>
	    <v-icon v-else>check</v-icon>
	  </v-btn>
	</v-toolbar>  
	<v-list>
	  <draggable :options="options" @update="onUpdate">
	    <transition-group type="transition" :name="'flip-list'">
	      <QueueElement class="queue-element" v-for="user in list" 
		  :key="user.id" 
		  :unique-key="user.id" 
		  :follow="user.id === followId"
		  :editable="editable"			   
		  @done="onDone"
		  @removed="onRemoved"
		  @follow="onFollow">
		{{user.name}}
	      </QueueElement>
	    </transition-group>
	  </draggable>
	</v-list>
      </v-card>
    </v-container>
  </main>
</template>

<script>
    import draggable from 'vuedraggable';
    import QueueElement from "./QueueElement";

    export default {
      name: "Queue",
      components: {QueueElement, draggable},
      props: ["queue"],
      data: function () {
        return {
          editable : false,
        }
      },
      mounted () {
	console.log(this.$vuetify.breakpoint);
      },
      computed: {
        options () {
          return {
            animation: 0,
            group: "subject",
            disabled: !this.editable,
            ghostClass: "list-item-ghost"
          }
        },
	list () {
	  return this.$store.getters.getQueueOrdered(this.queue) || [];
	},
	followId () {
	  return this.$store.state.list.followId;
	}
      },
      methods: {
        onDone(id) {
          let index = this.list.findIndex((element) => element.id === id);
	  if (index > -1) {
	    let newOrder = this.list.map((element) => {
	      return element.id;
	    })
	    newOrder.splice(index, 1)
	    newOrder.push(this.list[index].id);
	    this.$store.dispatch('setOrder', {
	      queue: this.queue,
	      order: newOrder
	    });
	  }
        },
        onRemoved(id) {
          let index = this.list.findIndex((element) => element.id === id);
	  if (index > -1) {
	    let newOrder = this.list.map((element) => {
	      return element.id;
	    })
	    newOrder.splice(index, 1);
	    this.$store.dispatch('setOrder', {
	      queue: this.queue,
	      order: newOrder
	    });
	  }
        },
	onFollow(id) { 
	  this.$store.commit('setFollowId', {
	    followId: id
	  });
	},
	onUpdate(event) {
	  console.log(event);
	  let element = this.list[event.oldIndex];
	  let newOrder = this.list.map((e) => {
	    return e.id;
	  })
	  newOrder.splice(event.oldIndex, 1);
	  newOrder.splice(event.newIndex, 0, element.id);
	  console.log(newOrder);
	  this.$store.dispatch('setOrder', {
	    queue: this.queue,
	    order: newOrder
	  });
	}
      }
    }
</script>

<style lang="scss">
  .queue {
  }
  .flip-list-move {
    transition: transform 0.5s;
  }
  .no-move {
    transition: transform 0s;
  }
  .list-item-ghost {
    opacity: 0.5;
  }
</style>
