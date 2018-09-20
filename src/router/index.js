import Vue from 'vue';
import Router from 'vue-router';
import MainView from '../views/MainView';
import * as config from '../config.json';


Vue.use(Router);
export default new Router({
  mode: 'history',
  routes: [
    {
      path: `/${config.auctionPrefix}/:id`,
      name: 'MainView',
      component: MainView,
      props: true
    },
  ],
});
