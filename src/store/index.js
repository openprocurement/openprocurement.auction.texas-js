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
    terminatedStates: ['completed', 'canceled', 'redefined'],
    id: '',
    urls:{
      serverURL: debug ? config.serverURL : location.protocol + '//' + location.host + "/",
      auctionURL: debug ? config.serverURL + config.auctionPrefix: location.protocol + '//' + location.host + "/" + config.auctionPrefix,
      couchURL: config.couchURL,
      auctionPrefix: config.auctionPrefix,
      eventSource: config.eventSource,
      databaseURL: debug ? config.serverURL + config.databaseName : `${location.protocol + '//' + location.host + "/"}${config.databaseName}`
    },
    identification: {
      bidderID: '',
      clientID: '',
      returnURL: ''
    },
    infoFromCouch: {
    },
    clients: {}
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
      state.identification.returnURL = data.return_url
    },
    setAuctionUUID (state, uuid) {
      state.id = uuid
    },
    setClientsInfo (state, data) {
      state.clients = data;
    },
  }
});

window.onbeforeunload = function() {
  // save locale to localStorage before refreshing or closing of page 
  localStorage.setItem('language', (((store.state.i18n.locale === 'null') || (store.state.i18n.locale === null))? ('uk'): (store.state.i18n.locale)))
};
const language = localStorage.getItem('language');

import vuexI18n from 'vuex-i18n'
Vue.use(vuexI18n.plugin, store);

Vue.i18n.add('en', english);
Vue.i18n.add('uk', ukrainian);
Vue.i18n.add('ru', russian);

// set default language to 'uk'
Vue.i18n.set(language || 'uk');

export default store
