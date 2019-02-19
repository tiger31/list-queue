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
			for (let queue of payload.data.queues) {
				queues[queue.id] = queue.name;
				orders[queue.id] = queue.order;
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
    async addList({ dispatch, commit }, payload) {
      if (firebase.auth().currentUser) {
      	return firebase.firestore().collection("lists").add({
	  			owner: firebase.auth().currentUser.uid,
				  name: payload.name,
				  elements: [],
				  editors: [],
				  queues: {},
				});
      }
      return false;
    }
  },
}

export default new Vuex.Store({
  modules: {
    list: list,
  }
})
