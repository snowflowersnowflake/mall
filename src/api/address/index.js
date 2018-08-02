import { BaseApi } from "../base"
import axios from "axios";
export class AddressCtrl extends BaseApi {
    constructor() {
        super("address/")
    }
    editAddress(obj = {}) {
        return axios.post(`${this.apiUrl}editAddress`, Object.assign(obj,{'dn':Date.now()}))
    }
    getAddressList(obj = {}) {
        return axios.get(`${this.apiUrl}getAddressList`, { params: Object.assign(obj,{'dn':Date.now()}) })
    }
    getAddressById(obj = {}) {
        return axios.get(`${this.apiUrl}getAddressById`, { params: Object.assign(obj,{'dn':Date.now()}) })
    }
    rmAddressById(obj = {}) {
        return axios.post(`${this.apiUrl}rmAddressById`, Object.assign(obj,{'dn':Date.now()}))
    }
    getCitys() {
        return  axios.get(`${this.apiUrl}getCitys`)
    }
}