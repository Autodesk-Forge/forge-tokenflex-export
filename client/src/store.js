import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isUserLoggedIn: false,
    user: {
      fullName: null,
      picture: null
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    setUserFullName (state, fullName) {
      state.user.fullName = fullName
    },
    setUserPicture (state, pictureUri) {
      state.user.picture = pictureUri
    }
  },
  actions: {
    setUser ({ commit }, user) {
      commit('setUser', user)
    },
    setUserFullName ({ commit }, fullName) {
      commit('setUserFullName', fullName)
    },
    setUserPicture ({ commit }, pictureUri) {
      commit('setUserPicture', pictureUri)
    }
  }
})
