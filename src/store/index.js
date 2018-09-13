import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import utils from '../utils/utils.js';
import english from '../translations/english.js';
import ukrainian from '../translations/ukrainian.js';
import russian from '../translations/russian.js';
import * as config from '../config.json';
import { db, remoteDB, fetch } from '../utils/CouchPouch.js'

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

const store =  new Vuex.Store({
  strict: debug,
  plugins: [createPersistedState()],
  state: {
    urls:{
      apiUrl: config.apiUrl,
      auctionURL: config.auctionURL,
      pouchURL: config.pouchURL,
      couchURL: config.couchURL,
    },
    loginInfo: {
      isLogged: false,
      accessToken: '',
    },
    userInfo: {
      auctions: [],
      bids: []
    },

    infoFromCouch: {
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
    language(state, data){
      state.i18n.locale = data
    },
    setInfoFromCouch(state, data) {
      state.infoFromCouch = data
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
    makeBidOfRound (context, jsonToSubmit) {
      axios.post(
        context.state.apiUrl,
        jsonToSubmit,
        utils.getAuthorizeAxiosConfig(context.state.loginInfo.accessToken))
        .then(response => {
          context.commit('setInfoFromCouch', response)
        })
        .catch(error => {
          console.log(context.state.apiUrl, jsonToSubmit, utils.getAuthorizeAxiosConfig(context.state.loginInfo.accessToken))
        })
    },
  }
});

// sync db - couch-pouch
db.sync(remoteDB, {
  live: true,
  retry: true
}).on('change', change => {
  store.commit('setInfoFromCouch', change);
  fetch()
}).on('error', function (err) {
  console.log('sync error', err)
});
// fetch initial
fetch() 

window.onbeforeunload = function() {
  return localStorage.setItem('language', store.state.i18n.locale);
};
const language = localStorage.getItem('language');

import vuexI18n from 'vuex-i18n'
Vue.use(vuexI18n.plugin, store);

Vue.i18n.add('English', english);
Vue.i18n.add('Українська', ukrainian);
Vue.i18n.add('Русский', russian);
Vue.i18n.fallback("English");
Vue.i18n.set(language);

export default store
