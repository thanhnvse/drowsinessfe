import Vue from 'vue';
import VueCookies from 'vue-cookies';
import vuescroll from 'vuescroll';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './plugins/axios';
import './plugins/element';
// import './plugins/chartist';

Vue.use(VueCookies);
Vue.use(vuescroll, {
  ops: {
    vuescroll: {},
    scrollPanel: {
      initialScrollY: false,
      initialScrollX: false,
      scrollingX: false,
      scrollingY: true,
      speed: 300,
      easing: undefined,
      verticalNativeBarPos: 'right',
    },
    rail: {},
    bar: {
      keepShow: true,
      background: '#c1c1c1',
    },
  },
});
Vue.$cookies.config('7d');
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
