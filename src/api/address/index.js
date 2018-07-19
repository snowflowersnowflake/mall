import { BaseApi } from "../base"
import axios from "axios";
export class AddressCtrl extends BaseApi {
    constructor() {
        super("address/")
    }
    editAddress(obj = {}) {
        return axios.post(`${this.apiUrl}editAddress`, obj)
    }
    getAddressList(obj = {}) {
        return axios.get(`${this.apiUrl}getAddressList`, { params: obj })
    }
    getAddressById(obj = {}) {
        return axios.get(`${this.apiUrl}getAddressById`, { params: obj })
    }
    rmAddressById(obj = {}) {
        return axios.post(`${this.apiUrl}rmAddressById`, obj)
    }
    getCitys() {
        return  axios.get(`${this.apiUrl}getCitys`)
    }
}