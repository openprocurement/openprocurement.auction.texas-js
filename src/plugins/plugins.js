import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import VueMoment from 'vue-moment';;
import VueScrollTo from 'vue-scrollto';
import ToggleSwitch from 'vuejs-toggle-switch';
import VueSSE from 'vue-sse';
import Notifications from 'vue-notification';

Vue.use(VueSSE);
Vue.use(ToggleSwitch);
Vue.use(VueScrollTo);
Vue.use(VueMoment);
Vue.use(Notifications);
Vue.use(Vuetify, {
});
