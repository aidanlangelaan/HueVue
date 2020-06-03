import axios from 'axios'

// initial state
const state = () => ({
    bridges: [],
    activeBridge: {}
})

// getters
const getters = {
    getActiveBridge: state => {
        return state.activeBridge
    },

    getBridges: state => {
        return state.brdiges
    }
}

// actions
const actions = {
    detectBridges() {
        axios
            .get('https://discovery.meethue.com/')
            .then(response => {
                if (response.status === 200 && response.data.length > 0) {
                    //commit('setBridges', response.data)

                    return response.data
                }
            })
            .catch(error => {
                // failed to validate bridge so ignoring it
                console.log(error)
            })
    },

    changeActiveBridge({ commit }, bridge) {
        commit('setActiveBridge', bridge)
    }
}

// mutations
const mutations = {
    setActiveBridge(state, bridge) {
        state.activeBridge = bridge
    },

    setBridges(state, bridges) {
        state.bridges = bridges
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
