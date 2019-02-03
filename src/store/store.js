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
      elements: [
	{ id: 0, name: "Графов Денис" },
	{ id: 1, name: "Сидорина Елена" },
	{ id: 2, name: "Хираев Малик" },
	{ id: 3, name: "Сергеев Илья" },
	{ id: 4, name: "Судакова Алена" },
	{ id: 5, name: "Чуприна Анастасия" },
	{ id: 6, name: "Косенков Михаил" },
	{ id: 7, name: "Дмитрий Арихиерев" },
      ],
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
      for (element of state.queuesOrder[id])
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
  }
}

export default new Vuex.Store({
  modules: {
    list: list,
  }
})
