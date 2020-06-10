import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
//import interceptor from './helpers/httpInterceptor.js'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './style.scss'

// fontawsome
import { faBars } from '@fortawesome/free-solid-svg-icons'
library.add(faBars)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

// install BootstrapVue
Vue.use(BootstrapVue)

// optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

// initiate the axios intercepter
//interceptor()

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
