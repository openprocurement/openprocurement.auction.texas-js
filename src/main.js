import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import './plugins/plugins';

let dataLayer = dataLayer || [];
Vue.config.productionTip = false;
// create and mount the root instance
new Vue({
// this will inject the router with the router option to make the whole app router-aware
  router,
  // this will inject the store instance to all child components.
  // provide the store using the "store" option.
  store,
  render: h => h(App),
}).$mount('#app');
