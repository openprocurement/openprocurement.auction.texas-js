import Vue from 'vue';
import Vuex from 'vuex';
import english from '../translations/english.js';
import ukrainian from '../translations/ukrainian.js';
import russian from '../translations/russian.js';
import * as config from '../config.json';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

const store =  new Vuex.Store({
  strict: debug,
  state: {
    id: '',
    urls:{
      serverURL: config.serverURL,
      auctionURL: config.serverURL + config.auctionPrefix,
      pouchURL: config.pouchURL,
      couchURL: config.couchURL,
      auctionPrefix: config.auctionPrefix,
      eventSource: config.eventSource,
      databaseURL: `${config.serverURL}${config.databaseName}`
    },
    identification: {
      bidderID: '',
      clientID: ''
    },
    infoFromCouch: {
    }
  },
  mutations: {
    setAuctionId(state, data){
      state.auctionId = data
    },
    language(state, data){
      state.i18n.locale = data
    },
    setInfoFromCouch(state, data) {
      state.infoFromCouch = data
    },
    setIdentificationInfo (state, data) {
      state.identification.bidderID = data.bidder_id
      state.identification.clientID = data.client_id
    },
    setAuctionUUID (state, uuid) {
      state.id = uuid
    }
  }
});

window.onbeforeunload = function() {
  localStorage.setItem('language', store.state.i18n.locale)
};
const language = localStorage.getItem('language');

import vuexI18n from 'vuex-i18n'
Vue.use(vuexI18n.plugin, store);

Vue.i18n.add('en', english);
Vue.i18n.add('uk', ukrainian);
Vue.i18n.add('ru', russian);
Vue.i18n.fallback("English");
Vue.i18n.set(language);

export default store
