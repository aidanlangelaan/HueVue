import axios from 'axios'

export const hueService = {
    getAllGroups,
    getById
}

function getAllGroups() {
    return axios.get(`//##internalipaddress##/api/##usertoken##/groups`)
}

function getById() {
    // return fetch(`${config.apiUrl}/users/${id}`, requestOptions.get()).then(
    //     handleResponse
    // )
}
