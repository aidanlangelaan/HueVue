import Vue from 'vue'
import Vuex from 'vuex'
import appstate from './modules/appstate'
import hue from './modules/hue'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        appstate,
        hue
    }
})
