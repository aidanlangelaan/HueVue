import { hueService } from '@/services/HueService'

// initial state
const state = () => ({
    rooms: [],
    zones: []
})

// getters
const getters = {
    getRooms: state => {
        return state.rooms
    },

    getZones: state => {
        return state.zones
    }
}

// actions
const actions = {
    fetchAllGroups({ commit }) {
        hueService
            .getAllGroups()
            .then(response => {
                let rooms = []
                let zones = []

                if (response.status == 200) {
                    const groups = []
                    Object.keys(response.data).forEach(d => {
                        let group = response.data[d]
                        group.group_id = parseInt(d, 10)
                        groups.push(group)
                    })

                    // eslint-disable-next-line no-unused-vars
                    groups.reduce((accumulator, currentValue) => {
                        if (currentValue.type.toLowerCase() == 'room') {
                            rooms.push(currentValue)
                        } else if (currentValue.type.toLowerCase() == 'zone') {
                            zones.push(currentValue)
                        }

                        return currentValue
                    }, {})

                    commit('setRooms', rooms)
                    commit('setZones', zones)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
}

// mutations
const mutations = {
    setRooms(state, rooms) {
        state.rooms = rooms
    },

    setZones(state, zones) {
        state.zones = zones
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
