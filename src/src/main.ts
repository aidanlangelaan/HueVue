import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import './style.scss';

Vue.config.productionTip = false;

// install BootstrapVue
Vue.use(BootstrapVue);

// optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
});
