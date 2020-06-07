import axios from 'axios'
import store from '@/store/index.js'

export const hueService = {
    getAllGroups,
    getById
}

function getAllGroups() {
    const bridge = store.getters['hue/getActiveBridge']
    const userToken = store.getters['hue/user']

    return axios.get(`//${bridge.internalipaddress}/api/${userToken}/groups`)
}

function getById() {
    // return fetch(`${config.apiUrl}/users/${id}`, requestOptions.get()).then(
    //     handleResponse
    // )
}
