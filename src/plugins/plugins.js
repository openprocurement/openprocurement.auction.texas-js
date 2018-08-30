import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import BootstrapVue from 'bootstrap-vue';
import VueMoment from 'vue-moment';
import VueChatScroll from 'vue-chat-scroll';
import VueScrollTo from 'vue-scrollto';
import ToggleSwitch from 'vuejs-toggle-switch';

Vue.use(ToggleSwitch)
Vue.use(VueScrollTo);
Vue.use(VueMoment);
Vue.use(BootstrapVue);
Vue.use(VueChatScroll);
Vue.use(Vuetify, {
});
