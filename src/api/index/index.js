import { BaseApi } from "../base"
import axios from 'axios';
export class IndexCtrl extends BaseApi {
    constructor() {
        super()
    }
    getAppConfig(obj = {}) {
        return axios.all([axios.get(`${this.apiUrl}index/indexConfig`), this.getStoreList(obj)])
    }
    getStoreList(obj = {}) {
        return axios.get(`${this.apiUrl}store/getstore`, {
            params: Object.assign(obj,{'dn':Date.now()})
        })
    }
    getStoreDetail(id) {
        return axios.get(`${this.apiUrl}store/getStoreDetail`, {
            params: {
                id,
                'dn':Date.now()
            }
        })
    }
    getUserInfo() {
        return axios.get(`${this.apiUrl}users/getUserInfo`, {
            params: { 'dn': Date.now()}
        })
    }
    setUserInfo(obj = {}) {
        return axios.post(`${this.apiUrl}users/setUserInfo`, Object.assign(obj,{'dn':Date.now()}))
    }
}