import Vue from 'vue'
import Vuex from 'vuex'

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
      for (let element of state.queuesOrder[id])
        arr.push({
	  id: element,
	  name: state.elements[element]
	});
      return arr;
    },
    getQueueWithFollow: state => id => {
      let obj = {};
      for (let queue of Object.keys(state.queuesList)) {
	const order = state.queuesOrder[queue].indexOf(id); 
	console.log(order);
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
    setOrder: (state, payload) => {
      if (state.queuesList[payload.queue] !== undefined)
	state.queuesOrder[payload.queue] = payload.order;
    }
  },
  actions: {
    async setOrder({ commit }, payload) {
    	//TODO await axios
	console.log(payload);
	commit('setOrder', payload);
    }
  },
}

export default new Vuex.Store({
  modules: {
    list: list,
  }
})
