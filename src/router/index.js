import Vue from 'vue';
import Router from 'vue-router';
import MainView from '../views/MainView';
import ErrorAuctionId from '../views/ErrorAuctionId'
import ErrorAuctionType from '../views/ErrorAuctionType'
import * as config from '../config.json';


Vue.use(Router);
const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: `/${config.auctionPrefix}/:id`,
      name: 'MainView',
      component: MainView,
      props: true
    },
    {
      path: `/${config.auctionPrefix}/:id `,
      name: 'errorId',
      component: ErrorAuctionId,
    },
    {
      path: `/${config.auctionPrefix}/:id `,
      name: 'errorAuctiontType',
      component: ErrorAuctionType,
    },
  ],
});
export default router