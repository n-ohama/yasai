import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    msg: 'This is an about page',
    resultData: {
      name: '',
      first: '',
      end: '',
      creatYear: ''
    }
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user
    },
    setResultData: (state, {seaName, seaFirst, seaEnd, seaCreYear}) => {
      // const { name, first, end, creatYear } = state.resultData
      state.resultData.name = seaName
      state.resultData.first = seaFirst
      state.resultData.end = seaEnd
      state.resultData.creatYear = seaCreYear
    }
  },
  actions: {
  },
  getters: {
  }
})