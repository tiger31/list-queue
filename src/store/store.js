import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex);

const list = {
  state: {
    /*
    id: undefined,
    elements: [],
    queuesList: {},
    queuesOrder: {}
    */
      list: "jhdf69ux",
      followId: undefined,
      elements: {
	0: "Графов Денис" ,
	1: "Сидорина Елена",
	2: "Хираев Малик",
	3: "Сергеев Илья",
	4: "Судакова Алена",
	5: "Чуприна Анастасия",
	6: "Косенков Михаил",
	7: "Дмитрий Арихиерев",
      },
      queuesList: {
	1: "Трансляторы",
	2: "ОС",
	3: "Verilog",
	4: "графика"
      },
      queuesOrder: {
        1: [0,1,2,3,4,5,6,7],
	2: [2,1,7,5,4,3,0,6],
	3: [7,6,5,4,3,2,1,0],
	4: [4,1,0,6,7,3,5,2]
      }
  },
  getters: {
    getQueueOrdered: state => id => {
      let arr = [];
      for (let element of state.queuesOrder[id] || [])
        arr.push({
				  id: element,
	 				 name: state.elements[element]
				});
      return arr;
    },
    getQueueWithFollow: state => {
      let obj = {};
      for (let queue of Object.keys(state.queuesList)) {
				const order = (state.followId) ? state.queuesOrder[queue].indexOf(state.followId) : -1; 
				obj[queue] = {
	  			id : queue,
	  			name : state.queuesList[queue],
	  			order : (order > -1) ? order + 1 : undefined
				}
      }
      return obj;
    }
  },
  mutations: {
    setFollowId: (state, payload) => {
      if (payload.followId in state.elements) {
        state.followId = payload.followId;
				localStorage.setItem(state.list, state.followId);
      }
    },
    setList: (state, payload) => {
      state.list = payload.list;
			let elements = {};
			let queues = {};
			let orders = {};
			for (let element of payload.data.elements)
				elements[element.id] = element.name;
			console.log(payload.data);
			for (let queue in payload.data.queues) {
				queues[queue] = payload.data.queues[queue].name;
				orders[queue] = payload.data.queues[queue].order;
			}
			state.elements = elements;
			state.queuesList = queues;
			state.queuesOrder = orders;
    }
	  
  },
  actions: {
    //Getters
    async getList({ commit }, payload) {
      firebase.firestore().collection("lists").doc(payload.list).onSnapshot(
        (doc) => {
	  			commit('setList', {
						list: payload.list,
						data: doc.data()
					});
				}
      );
    },
    //Setters
    async setOrder({ state, commit }, payload) {
			firebase.firestore().collection('lists').doc(state.list).update({
				[`queues.${payload.queue}.order`] : payload.order
			}).then(() => console.log("Order synced with firestore"))
				.catch((err) => console.log(err));
    },
    //Adders
  },
}
const user = {
	state: {
		listener: undefined,
		listenerAttached: false,
		lists: {}
	},
	getters: {
		nextQueueId: state => list => state.lists[list].nextId.queue.next().value,
		nextElementId: state => list => state.lists[list].nextId.element.next().value
	},
	mutations: {
		//Listener
		setUserListsListener(state, payload) {
			state.listener = payload.listener;
			state.listenerAttached = true;
		},
		removeUserListsListener(state) {
			if (state.listenerAttached)
				state.listener()
			state.listenerAttached = false;
		},
		//Setters
		setLists(state, payload) {
			state.lists = payload.lists.docs.reduce((map, obj) => {
				map[obj.id] = obj.data();
				for(let generator in map[obj.id].nextId) {
					const start = map[obj.id].nextId[generator];
					map[obj.id].nextId[generator] = (function* () {
						for (let i = start;;i++)
							yield i;
					})();
				}
				return map;
			}, {});
		},
	},
	actions: {
		//Add/Update
		async setQueue({ state, commit }, payload) {
			const update = {
				[`queues.${payload.queue.id}`] : payload.queue
			}
			if (payload.updateNextId)
				update["nextId.queue"] = state.lists[payload.list].nextId.queue.next().value;
			return firebase.firestore().collection("lists").doc(payload.list).update(update);
		},
		async setElements({ state }, payload) {
			const update = {
				[`elements.${payload.element.id}`] : payload.element
			}
			if (payload.updateNextId)
				update["nextId.element"] = state.lists[payload.lists].nextId.element.next().value;
			return firebase.firestore().collection("lists").doc(payload.list).update(update);
		},
    async addList({ dispatch, commit }, payload) {
      if (firebase.auth().currentUser) {
      	return firebase.firestore().collection("lists").add({
	  			owner: firebase.auth().currentUser.uid,
				  name: payload.name,
					nextId: {
						queue: 0,
						element: 0
					},
				  elements: [],
				  editors: [],
				  queues: {},
				});
      }
      return false;
    },
		//Get
		async getUserLists({ state, commit }) {
			commit('removeUserListsListener');
			return new Promise((resolve, reject) => {
				if (!firebase.auth().currentUser)
					reject(new Error("User not found"));
				const userListsListener = firebase.firestore().collection("lists")
					.where("owner", "==", firebase.auth().currentUser.uid)
					.onSnapshot((querySnapshot) => {
						commit('setLists', { lists: querySnapshot });
						resolve();
					}, (err) => reject(err));
				commit('setUserListsListener', { listener: userListsListener });
			})
		},
		//Remove
		async removeQueue({ state }, payload) {
			return firebase.firestore().collection("lists").doc(payload.list).update({
				[`queues.${payload.queue.id}`] : firebase.firestore.FieldValue.delete()
			});
		},
	}
}
export default new Vuex.Store({
  modules: {
    list: list,
		user: user,
  }
})
