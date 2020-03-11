import Vue from 'vue';
import App from './App.vue';
import store from './store';
import vuetify from './plugins/vuetify';
import axios from '../node_modules/axios';
import moment from '../node_modules/moment';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$moment = moment;

new Vue({
  store,
  vuetify,
  axios,
  moment,
  render: (h) => h(App),
}).$mount('#app');
