<template>
	<div v-if="present">
		<div class="headline">Очереди {{listData.name}}</div>
		<div class="empty" v-if="listData.queues.length === 0 && !addingNewQueue">Список пуст</div>
		<QueueCard v-for="queue in listData.queues"
			:key="queue.id"
			:queue="queue"
			@removeQueue="removeQueue(queue)"
		/>
				<v-text-field v-model="newQueue" :rules="rules.newQueue" label="Новая очередь" solo full-width class="mx-2"
					v-if="addingNewQueue">		
					<v-btn color="error" flat icon @click="addingNewQueue = false; newQueue=''"
						slot="append-outer" class="ma-0">
						<v-icon>remove_circle</v-icon>
					</v-btn>
				</v-text-field>
		
		<v-btn block color="info" class="mx-2 btn-custon" 
			@click="(addingNewQueue) ? addQueue() : addingNewQueue = true"
			:disabled='listData.queues.length === 10 || (addingNewQueue && newQueue == "")'>
			{{(addingNewQueue) ? "Сохранить" : "Добавить очередь"}}
		</v-btn>
	</div>
</template>

<script>
import Vue from 'vue'
import firebase from 'firebase'

import QueueCard from './queue/QueueCard.vue'

export default {
  name: "QueueView",
	components: { QueueCard },
  props: ["list", "listData"],
  data () {
    return {
      editMode: false,
      newQueue: "",
      addingNewQueue: false,
      rules: {
        newQueue: [
					v => !!v || "Название очереди не может быть пустой строкой"
				]
      }
    }
  },
  computed: {
		present() {
		  return this.list !== undefined;
		}
  },
  methods: {
    addQueue () {
      if (this.newQueue) {
				let queue = {
					id: this.$store.getters.nextQueueId(this.list),
					name: this.newQueue,
					order: this.listData.elements.map(e => e.id)
				}
				this.$store.dispatch('setQueue', {
					list: this.list,
					queue: queue,
					updateNextId: true
				}).finally(() => {
					this.newQueue = "";
					this.addingNewQueue = false;
					console.log("Saved... or not...")
				})
      }
    },
		removeQueue(queue) {
			this.$store.dispatch('removeQueue', { list: this.list, queue: queue });
		},
  },
}

</script>

<style>
.empty {
  color: grey;
  padding: 20px;
  text-align: center;
}
.btn-custon {
	width: calc(100% - 16px);
}
.v-input__append-outer {
	margin-top: 8px !important
}
</style>
