import { BaseApi } from "../base"
import axios from 'axios'
export class CartCtrl extends BaseApi {
    constructor(){
        super('cart/')
    }
    addCart( obj = {} ){
        return axios.post(`${this.apiUrl}addCart`,obj)
    }
    minusCart( obj = {} ){
        return axios.post(`${this.apiUrl}minusCart`,obj)
    }
    getGoods(){
        return axios.get(`${this.apiUrl}getGoods`)
    }
    getCart(){
        return axios.get(`${this.apiUrl}getCart`)
    }
    getGoodsAndCart(){
        return axios.all([this.getGoods(),this.getCart()])
    }
}