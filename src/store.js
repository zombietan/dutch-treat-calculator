import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selected: 100,
    items: [
      { text: '10円単位', value: 10 },
      { text: '100円単位', value: 100 },
      { text: '1000円単位', value: 1000 }
    ],
    price: '',
    num: '',
    result: 'ここに結果を表示します',
    hidden: true
  },

  getters: {
    getSelected: state => state.selected,

    getItems: state => state.items,

    getPrice: state => state.price,

    getNum: state => state.num,

    getResult: state => state.result,

    isHidden: state => state.hidden,

    initialState: state => {
      return {
        selected: 100,
        price: '',
        num: '',
        result: 'ここに結果を表示します',
        hidden: true
      }
    }
  },
  
  mutations: {
    setSelected(state, selected) {
      state.selected = selected
    },

    setPrice(state, price) {
      state.price = price
    },

    setNum(state, num) {
      state.num = num
    },

    setResult(state, string) {
      state.result = string
    },

    setHidden(state, boolean) {
      state.hidden = boolean
    },

    initializeState(state, initialState) {
      Object.assign(state, initialState)
    }
  },
  
  actions: {
    initializedState({ commit, getters }) {
      commit('initializeState', getters.initialState)
    }
  }
})
