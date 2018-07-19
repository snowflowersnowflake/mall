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
            offer: obj.offer
        })
    }
    editCollections(obj = {}) {
        return axios.post(`${this.apiUrl}editCollections`, obj)
    }
    getCollections(obj = {}) {
        return axios.get(`${this.apiUrl}getCollections`, { params: obj })
    }
}