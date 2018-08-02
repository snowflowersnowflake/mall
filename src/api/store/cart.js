import { BaseApi } from "../base"
import axios from 'axios'
export class CartCtrl extends BaseApi {
    constructor() {
        super('cart/')
    }
    addCart(obj = {}) {
        return axios.post(`${this.apiUrl}addCart`, Object.assign(obj,{'dn':Date.now()}), {
            headers: {
                notIndicator: true
            }
        })
    }
    minusCart(obj = {}) {
        return axios.post(`${this.apiUrl}minusCart`, Object.assign(obj,{'dn':Date.now()}), {
            headers: {
                notIndicator: true
            }
        })
    }
    getAllCart() {
        return axios.get(`${this.apiUrl}getAllCart`,{params:{'dn':Date.now()}})
    }
    getGoods() {
        return axios.get(`${this.apiUrl}getGoods`,{params:{'dn':Date.now()}})
    }
    getCart() {
        return axios.get(`${this.apiUrl}getCart`,{params:{'dn':Date.now()}})
    }
    getGoodsAndCart() {
        return axios.all([this.getGoods(), this.getCart()])
    }
    checkout(obj = {}) {
        return axios.post(`${this.apiUrl}checkout`, Object.assign(obj,{'dn':Date.now()}))
    }
    cartClear(obj = {}) {
        return axios.post(`${this.apiUrl}cartClear`, Object.assign(obj,{'dn':Date.now()}))
    }
    createBill(obj = {}) {
        return axios.post(`${this.apiUrl}createBill`, Object.assign(obj,{'dn':Date.now()}))
    }
    getBill(obj = {}) {
        return axios.get(`${this.apiUrl}getBill`, { params: Object.assign(obj,{'dn':Date.now()}) })
    }
    getBillList(obj = {}) {
        return axios.get(`${this.apiUrl}getBillList`, { params: Object.assign(obj,{'dn':Date.now()}) })
    }
    copyBill(obj = {}) {
        return axios.post(`${this.apiUrl}copyBill`, Object.assign(obj,{'dn':Date.now()}))
    }
    subEvaluation(obj = {}) {
        return axios.post(`${this.apiUrl}subEvaluation`, Object.assign(obj,{'dn':Date.now()}))
    }
    editEvaluation(obj= {}) {
        return axios.post(`${this.apiUrl}editEvaluation`, Object.assign(obj,{'dn':Date.now()}))
    }
    cartAllClear(){
        return axios.post(`${this.apiUrl}cartAllClear`,{'dn':Date.now()})
    }
    haveCart() {
        return axios.get(`${this.apiUrl}haveCart`,{params:{'dn':Date.now()}})
    }
    getStoreEvaluation(obj) {
        return axios.get(`${this.apiUrl}getStoreEvaluation`,{ params: Object.assign(obj,{'dn':Date.now()}) })
    }
}