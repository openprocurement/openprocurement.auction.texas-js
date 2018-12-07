import Vue from 'vue';
import Router from 'vue-router';
import MainView from '../views/MainView';
import ErrorAuctionId from '../views/ErrorAuctionId'
import ErrorAuctionType from '../views/ErrorAuctionType'
import UnsupportedBrowser from '../views/UnsupportedBrowser';
import * as config from '../config.json';

import VueGtm from 'vue-gtm';

Vue.use(Router);

// creating  the router instance and pass the `routes` option
const router =  new Router({
  mode: 'history',
  // defining routes
  routes: [
    // each route mapes to a component
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
    {
      path: `/${config.auctionPrefix}/:id `,
      name: 'unsupportedBrowserPage',
      component: UnsupportedBrowser,
    },
  ],
});

Vue.use(VueGtm, {
  id: 'GTM-5QJXWB', // Your GTM ID
  enabled: true, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
  debug: true, // Whether or not display console logs debugs (optional)
  vueRouter: router, // Pass the router instance to automatically sync with router (optional)
  ignoredViews: ['route'] // If router, you can exclude some routes name (case insensitive) (optional)
});

export default router