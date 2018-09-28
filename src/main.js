import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import './plugins/plugins';

let dataLayer = dataLayer || [];
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
