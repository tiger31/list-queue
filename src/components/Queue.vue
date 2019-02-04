<template>
  <main>
  <v-container fluid :class="{ 'py-0' : !$vuetify.breakpoint.smAndDown, 'px-0' : !$vuetify.breakpoint.mdAndUp}">    
      <v-card class="elevation-8 queue">
	<v-list>
	  <draggable v-model="userList" :options="options" @update="onUpdate">
	    <transition-group type="transition" :name="'flip-list'">
	      <QueueElement class="queue-element" v-for="user in list" 
		  :key="user.id" 
		  :unique-key="user.id" 
		  :follow="user.id === followId" 
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
          editable : true,
	  followId : 3,
          userList : [
            { id: 0, name: "Графов Денис" },
            { id: 1, name: "Сидорина Елена" },
            { id: 2, name: "Хираев Малик" },
            { id: 3, name: "Сергеев Илья" },
            { id: 4, name: "Судакова Алена" },
            { id: 5, name: "Чуприна Анастасия" },
            { id: 6, name: "Косенков Михаил" },
            { id: 7, name: "Дмитрий Арихиерев" },
          ]
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
          let index = this.userList.findIndex((element) => element.id === id);
	  if (index > -1) {
	    this.followId = id;
	  }
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
