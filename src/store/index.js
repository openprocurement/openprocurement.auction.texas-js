import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiUrl: 'http://127.0.0.1:8000/',
    auctionURL: 'http://127.0.0.1:8090/',
    loginInfo: {
      isLogged: false,
      accessToken: '',
      refreshToken: ''
    },
    userInfo: {
      auctions: [],
      bids: []
    }
  },
  mutations: {
     setUserInfo (state, data) {
      state.userInfo.auctions = data.auctions
      state.userInfo.bids = data.bids
    },
    login (state, data) {
      state.loginInfo.isLogged = true
      state.loginInfo.accessToken = data.access
      state.loginInfo.refreshToken = data.refresh
    },
    logout (state) {
      state.loginInfo.isLogged = false
      state.loginInfo.accessToken = ''
      state.loginInfo.refreshToken = '' 
      state.userInfo.auctions.splice(
        0,
        state.userInfo.auctions.length
      )
      state.userInfo.bids.splice(
        0,
        state.userInfo.bids.length
      )      
    }
  },
  actions: {
    getUserInfo (context) {
      axios.get(context.state.apiUrl + 'authoriz/my-items/', utils.getAuthorizeAxiosConfig(context.state.loginInfo.accessToken))
      .then(response => {
          context.commit('setUserInfo', response.data)
      })
      .catch( error => {
        console.log(error.response.statusText)
      })
    }
  },
});
