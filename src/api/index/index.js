import { BaseApi } from "../base"
import axios from 'axios';
export class IndexCtrl extends BaseApi {
    constructor() {
        super()
    }
    getAppConfig(obj = {}) {
        return axios.all([axios.get(`${this.apiUrl}index/indexConfig`),this.getStoreList(obj)])
    }
    getStoreList(obj = {}) {
        return axios.get(`${this.apiUrl}store/getstore`, {
            params: {
                offer: obj.offer,
                page: obj.page || 0,
                sortby: obj.sortby
            }
        })
    }
    getStoreDetail(id){
        return axios.get(`${this.apiUrl}store/getStoreDetail`,{
            params:{
                id
            }
        })
    }
}