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
    },
    updateYasai: {
      id: '',
      name: '',
      first: '',
      end: ''
    }
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user
    },
    setResultData: (state, {seaName, seaFirst, seaEnd, seaCreYear}) => {
      state.resultData.name = seaName
      state.resultData.first = seaFirst
      state.resultData.end = seaEnd
      state.resultData.creatYear = seaCreYear
    },
    setUpdateYasai: (state, {upName, upFirst, upEnd, docId}) => {
      state.updateYasai.name = upName
      state.updateYasai.first = upFirst
      state.updateYasai.end = upEnd
      state.updateYasai.id = docId
    }
  },
  actions: {
  },
  getters: {
  }
})