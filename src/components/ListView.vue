<template>
 <div v-if="present">
	 <div class="headline">{{listData.name}}</div>
	 <v-card class="elevation-5 pb-3">
		 <v-toolbar color="white" class="elevation-0" dense>
			 <v-spacer></v-spacer> 
			 <v-btn icon flat @click="editMode = !editMode">
				 <v-icon>settings</v-icon>
			 </v-btn>  
		 </v-toolbar>
		 <v-list>
			 <div class="empty" v-if="newElementsList.length === 0 && !addingNewElement">Список пуст</div>
			 <v-list-tile v-if="newElementsList.length > 0" v-for="element in newElementsList" :key="element.id">
				 <v-list-tile-title>
					 {{element.name}}
				 </v-list-tile-title>
				 <v-spacer></v-spacer>
			 </v-list-tile>
			 <v-list-tile v-if="addingNewElement">
				 <v-list-tile-content>
					 <v-text-field v-model="newElement" :rules="rules.newElement" label="Элемент">
					 </v-text-field>
				 </v-list-tile-content>
				 <v-spacer></v-spacer>
				 <v-btn color="success" flat icon @click="addNewElement">
	       <v-icon>add_circle</v-icon>
				 </v-btn>
				 <v-btn color="error" flat icon @click="addingNewElement = false; newElement=''">
					 <v-icon>remove_circle</v-icon>
				 </v-btn>
			 </v-list-tile>
		 </v-list>
		 <v-card-actions>
			 <v-spacer></v-spacer>
			 <v-btn color="success" v-if="changed" @click="saveElements">
				 Сохранить
			 </v-btn>
			 <v-btn color="info" @click="addingNewElement = true" :disabled="addingNewElement">
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
  name: "ListView",
  props: ["list", "listData"],
  data () {
    return {
      editMode: false,
      newElement: "",
      addingNewElement: false,
      rules: {
        newElement: [
					v => !!v || "Элемент не может быть пустой строкой"
				]
      },
      newElementsList: []
    }
  },
  computed: {
    changed() {
      if (this.listData.elements.length != this.newElementsList.length)
				return true;
      else {
        let old = this.listData.elements.map(e => e.id).sort(this.sort);
				let n = this.newElementsList.map(e => e.id).sort(this.sort);
				for (let i = 0; i < n.length; i++)
				if (old[i].id != n[i].id)
					return true;
				return false;
      }
    },
		present() {
		  return this.list !== undefined;
		}
  },
	mounted () {	
		Vue.set(this,'newElementsList', Object.values(Vue.util.extend({}, this.listData.elements)));
	},
  methods: {
    addNewElement () {
      if (this.newElement) {
				let ids = [];
					ids.push(...this.newElementsList.map(e => e.id), 
						...this.listData.elements.map(e => e.id));
				let id = ((ids.length > 0) ? Math.max(...ids) : -1) + 1;
				this.newElementsList.push({id: id, name: this.newElement});
				this.newElement = "";
				this.addingNewElement = false;
      }
    },
    sort(a, b) {
      if (a < b) return -1;
      else if (a > b) return 1;
      return 0;
    },
    saveElements() {
      if (this.changed) {
				firebase.firestore().collection("lists").doc(this.list).update({
					elements: this.newElementsList
				}).then(() => this.$emit("updateList", this.list, Object.values(Vue.util.extend(this.newElementsList))));
      }
    }
  },
	watch: {
		listData (n, o) {
			Vue.set(this,'newElementsList', Object.values(Vue.util.extend({}, n.elements)));
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
