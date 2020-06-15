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
                    const lights = []
                    Object.keys(response.data).forEach(d => {
                        let light = response.data[d]
                        light.light_id = parseInt(d, 10)
                        lights.push(light)
                    })

                    commit('setLights', lights)
                }
            })
            .catch(error => {
                console.log(error)
            })
    },

    setLightState({ commit }, light) {
        hueService
            .alterLightState(light.light_id, light.state.on, light.state.bri)
            .then(response => {
                if (response.status == 200) {
                    commit('setLight', light)
                    return true
                }

                return false
            })
            .catch(error => {
                console.log(error)
                return false
            })
    }
}

// mutations
const mutations = {
    setLights(state, lights) {
        state.lights = lights
    },

    setLight(state, light) {
        const index = state.lights.findIndex(l => l.light_id === light.light_id)
        state.lights[index] = light
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
