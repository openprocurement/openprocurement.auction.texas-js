import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiUrl: 'https://jsonplaceholder.typicode.com/todos',
    userInfo: {
      todos: [],
    },
  },
  mutations: {
    setUserInfo(state, data) {
      state.userInfo.todos = data;
    },
  },
  actions: {
    getUserInfo(context) {
      axios.get(context.state.apiUrl)
        .then((response) => {
          context.commit('setUserInfo', response);
        })
        .catch((error) => {
          // console.log(error.response.statusText);
        });
    },
  },
});