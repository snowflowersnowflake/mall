import { BaseApi } from "../base"
import axios from 'axios'
export class StoreCtrl extends BaseApi {
    constructor() {
        super('store/')
    }
    searchStore(obj = {}) {
        return axios.post(`${this.apiUrl}searchStore`, {
            searchKey: obj.searchKey,
            page: obj.page,
            sortby: obj.sortby,
            offer: obj.offer,
            "dn": Date.now()
        })
    }
    editCollections(obj = {}) {
        return axios.post(`${this.apiUrl}editCollections`, Object.assign(obj,{'dn':Date.now()}))
    }
    getCollections(obj = {}) {
        return axios.get(`${this.apiUrl}getCollections`, { params: Object.assign(obj,{'dn':Date.now()}) })
    }
}