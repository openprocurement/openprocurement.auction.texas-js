// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import './plugins/plugins'

import AppStartRate from "./components/StartRate"
import AppTimer from "./components/Timer"
import AppStatusInfoLabel from "./components/StatusInfoLabel"
import AppIncreasingAndApproval from "./components/IncreasingAndApproval"
import AppListOfRoundsActive from "./components/ListOfRoundsActive"
import AppListOfRoundsCompleted from "./components/ListOfRoundsCompleted"
import AppStatusTimerLine from "./components/StatusTimerLine"
import AppHongAudioTrack from "./components/HongAudioTrack"

Vue.component('AppStartRate', AppStartRate)
Vue.component('AppTimer', AppTimer)
Vue.component('AppStatusInfoLabel', AppStatusInfoLabel)
Vue.component('AppListOfRoundsActive', AppListOfRoundsActive)
Vue.component('AppListOfRoundsCompleted', AppListOfRoundsCompleted)
Vue.component('AppIncreasingAndApproval', AppIncreasingAndApproval)
Vue.component('AppStatusTimerLine', AppStatusTimerLine)
Vue.component('AppHongAudioTrack', AppHongAudioTrack)

Vue.config.productionTip = false;

/* eslint-disable no-new */

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
