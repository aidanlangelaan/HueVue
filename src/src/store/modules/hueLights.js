import { hueService } from '@/services/HueService'

// initial state
const state = () => ({
    lights: []
})

// getters
const getters = {
    getLights: state => {
        return state.lights
    }
}

// actions
const actions = {
    fetchAllLights({ commit }) {
        hueService
            .getAllLights()
            .then(response => {
                if (response.status == 200) {
                    const lights = Object.values(response.data)

                    commit('setLights', lights)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    // editLightState ({ commit }, light) {
    //     hueService
    //         .alterLightState(light.state.on, light.state.bri)
    //         .then(response => {
    //             if (response.status == 200) {
    //                 const lights = Object.values(response.data)

    //                 commit('setLights', lights)
    //             }
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // }
}

// mutations
const mutations = {
    setLights(state, lights) {
        state.lights = lights
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
