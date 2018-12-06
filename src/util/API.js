import axios from 'axios';
import { ACCESS_TOKEN } from '../constant';
import { API_BASE_URL } from './../constant/index';
const request = (options) => {
    const headers = {
        'Content-Type': 'application/json'
    }

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers['Authorization'] = 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
    }

    const defaults = {headers: headers}
    options = Object.assign({}, defaults, options)
    return axios(options)
}

export function getUserInfoFromPrivateLinkId(privateLinkId) {
    return request({
        url: API_BASE_URL + '/user/talent/' + privateLinkId,
        method: 'GET'
    })
}

export function getUserInfoFromPhoneNumber(groupName, phoneNumber) {
    return request({
        url: API_BASE_URL + '/user/' + groupName + '/' + phoneNumber,
        method: 'GET'
    })
}

export function submitTalentOfUser(categoryIds, privateLinkId) {
    return request({
        url: API_BASE_URL + '/user/talent/' + privateLinkId,
        method: 'POST',
        data: {
            'categoryIds': categoryIds
        }
    })
}