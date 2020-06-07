import axios from 'axios'

// initial state
const state = () => ({
    detectedBridges: [],
    validatedBridges: [],
    activeBridge: {},
    user: ''
})

// getters
const getters = {
    getActiveBridge: state => {
        return state.activeBridge
    },

    getDetectedBridges: state => {
        return state.detectedBridges
    },

    getValidatedBridges: state => {
        return state.validatedBridges
    },

    getUser: state => {
        return state.user
    }
}

// actions
const actions = {
    detectBridges({ commit }) {
        commit('setDetectedBridges', [])

        return axios
            .get('https://discovery.meethue.com/')
            .then(response => {
                if (response.status === 200 && response.data.length > 0) {
                    commit('setDetectedBridges', response.data)
                    return response.data
                } else {
                    commit('setDetectedBridges', [])
                    return []
                }
            })
            .catch(error => {
                // failed to validate bridge so ignoring it
                console.log(error)
            })
    },

    validateBridges({ commit, getters }, bridges) {
        commit('setValidatedBridges', [])
        let bridgeLinks = []

        bridges.forEach(bridge => {
            bridgeLinks.push(
                axios
                    .get(`//${bridge.internalipaddress}/api/tmp/config`)
                    .catch(error => {
                        console.log('interal ' + error)
                    })
            )
        })

        return Promise.all(bridgeLinks).then(results => {
            let validatedBridges = []

            results.forEach(result => {
                if (result) {
                    let validatedBridge = result.data

                    // get detected bridge and merge with the validated bridge object
                    let detectedBridge = getters.getDetectedBridges.find(
                        detectedBridges =>
                            detectedBridges.id ==
                            validatedBridge.bridgeid.toLowerCase()
                    )

                    validatedBridge.internalipaddress =
                        detectedBridge.internalipaddress
                    validatedBridge.bridgeid = validatedBridge.bridgeid.toLowerCase()
                    validatedBridges.push(validatedBridge)
                }
            })

            commit('setValidatedBridges', validatedBridges)
            return validatedBridges
        })
    },

    changeActiveBridge({ commit }, bridge) {
        commit('setActiveBridge', bridge)
    },

    createUser({ commit, getters }) {
        const activeBridge = getters.getActiveBridge
        const uniqueId = window.crypto
            .getRandomValues(new Uint32Array(1))[0]
            .toString(16)

        return axios
            .post(`//${activeBridge.internalipaddress}/api`, {
                devicetype: `HueVue#${uniqueId}`
            })
            .then(response => {
                if (
                    response.data[0].error &&
                    response.data[0].error.type == 101
                ) {
                    console.log('link button not pressed')
                    return false
                } else if (response.data[0].success) {
                    commit('setUser', response.data[0].success.username)

                    return true
                }
            })
            .catch(error => {
                console.log(error)

                return false
            })
    }
}

// mutations
const mutations = {
    setActiveBridge(state, bridge) {
        state.activeBridge = bridge
    },

    setDetectedBridges(state, bridges) {
        state.detectedBridges = bridges
    },

    setValidatedBridges(state, bridges) {
        state.validatedBridges = bridges
    },

    setUser(state, user) {
        state.user = user
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
