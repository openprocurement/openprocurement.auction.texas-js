import Vue from 'vue';
import Router from 'vue-router';
import MainView from '../views/MainView';

Vue.use(Router);
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/auctions/:id',
      name: 'auctionState',
      component: MainView,
      props: true,
    },
  ],
});
