import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiUrl:"https://jsonplaceholder.typicode.com/todos",
    userInfo: {
      todos: [],
    }
  },
  mutations: {
     setUserInfo (state, data) {
      state.userInfo.todos = data.todos
     }
    },
  actions: {
    getUserInfo (context) {
      axios.get(context.state.apiUrl)
      .then(response => {
          context.commit('setUserInfo', response.data)
      })
      .catch( error => {
        console.log(error.response.statusText)
      })
    }
  },
});
