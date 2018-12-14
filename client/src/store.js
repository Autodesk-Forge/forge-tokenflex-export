/////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Forge Partner Development
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: { contracts: false, charts: false, userInfo: false },
    contractNumber: null,
    isUserLoggedIn: false,
    user: {
      fullName: null,
      picture: null
    }
  },
  mutations: {
    setContractNumber (state, contractNumber) {
      state.contractNumber = contractNumber
    },
    setUser (state, user) {
      state.user = user
    },
    setUserFullName (state, fullName) {
      state.user.fullName = fullName
    },
    setUserPicture (state, pictureUri) {
      state.user.picture = pictureUri
    },
    setLoading (state, loading) {
      Object.assign(state.loading, loading)
    }
  },
  actions: {
    setContractNumber ({ commit }, contractNumber) {
      commit('setContractNumber', contractNumber)
    },
    setUser ({ commit }, user) {
      commit('setUser', user)
    },
    setUserFullName ({ commit }, fullName) {
      commit('setUserFullName', fullName)
    },
    setUserPicture ({ commit }, pictureUri) {
      commit('setUserPicture', pictureUri)
    },
    setLoading ({ commit }, loading) {
      commit('setLoading', loading)
    }
  }
})
