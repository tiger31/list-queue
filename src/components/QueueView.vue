<template>
 <div v-if="present">
   <div class="headline">Очереди {{listData.name}}</div>
   <v-card class="elevation-5 pb-3">
       <v-toolbar color="white" class="elevation-0" dense>
	 <v-spacer></v-spacer> 
	 <v-btn icon flat @click="editMode = !editMode">
	   <v-icon>settings</v-icon>
	 </v-btn>  
       </v-toolbar>
       <v-list>
	 <div class="empty" v-if="newQueuesList.length === 0 && !addingNewQueue">Список пуст</div>
	 <v-list-tile v-if="newQueuesList.length > 0" v-for="element in newQueuesList" :key="element.id">
	   <v-list-tile-title>
	     {{element.name}}
	   </v-list-tile-title>
	   <v-spacer></v-spacer>
	 </v-list-tile>
	 <v-list-tile v-if="addingNewQueue">
	   <v-list-tile-content>
	     <v-text-field v-model="newQueue" :rules="rules.newQueue" label="Очередь">
	     </v-text-field>
	   </v-list-tile-content>
	   <v-spacer></v-spacer>
	     <v-btn color="success" flat icon @click="addNewQueue">
	       <v-icon>add_circle</v-icon>
	     </v-btn>
	     <v-btn color="error" flat icon @click="addingNewQueue = false; newQueue=''">
	       <v-icon>remove_circle</v-icon>
	     </v-btn>
	 </v-list-tile>
       </v-list>
       <v-card-actions>
	 <v-spacer></v-spacer>
	 <v-btn color="success" v-if="changed" @click="saveQueues">
	   Сохранить
	 </v-btn>
	 <v-btn color="info" @click="addingNewQueue = true" :disabled="addingNewQueue">
	   Добавить элемент
	 </v-btn>
       </v-card-actions>
   </v-card>
 </div>
</template>

<script>
import Vue from 'vue'
import firebase from 'firebase'

export default {
  name: "QueueView",
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
      },
      newQueuesList: []
    }
  },
  computed: {
    changed() {
      if (this.listData.queues.length != this.newQueuesList.length)
				return true;
      else {
        let old = this.listData.queues.map(e => e).sort(this.sort);
        let n = this.newQueuesList.map(e => e).sort(this.sort);
		for (let i = 0; i < n.length; i++)
            if (old[i].id != n[i].id || old[i].order.length != n[i].order.length)
                return true;
            else
                for (let j = 0; j < n[i].order.length; j++)
                    if (n[i].order[j] != old[i].order[j])
                        return true;
        return false;
      }
    },
		present() {
		  return this.list !== undefined;
		}
  },
	mounted () {	
		Vue.set(this,'newQueuesList', Object.values(Vue.util.extend({}, this.listData.queues)));
	},
  methods: {
    addNewQueue () {
      if (this.newQueue) {
				let ids = [];
					ids.push(...this.newQueuesList.map(e => e.id), 
						...this.listData.queues.map(e => e.id));
				let id = ((ids.length > 0) ? Math.max(...ids) : -1) + 1;
				this.newQueuesList.push({
					id: id,
					name: this.newQueue,
					order: this.listData.elements.map(e => e.id)
				});
				this.newQueue = "";
				this.addingNewQueue = false;
      }
    },
    sort(a, b) {
      if (a.id < b.id) return -1;
      else if (a.id > b.id) return 1;
      return 0;
    },
    saveQueues() {
      if (this.changed) {
				firebase.firestore().collection("lists").doc(this.list).update({
					queues: this.newQueuesList
				}).then(() => this.$emit("updateQueues", this.list, Object.values(Vue.util.extend(this.newQueuesList))));
      }
    }
  },
	watch: {
		listData (n, o) {
			Vue.set(this,'newQueuesList', Object.values(Vue.util.extend({}, n.queues)));
		}
	}
}

</script>

<style>
.empty {
  color: grey;
  padding: 20px;
  text-align: center;
}
</style>
