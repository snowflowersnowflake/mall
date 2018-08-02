import { BaseApi } from "../base"
import axios from 'axios'
export class UserApi extends BaseApi {
    constructor() {
        super('users/')
    }
    reg(params = { name: "", pw: "" }) {
        let { name, pw } = params
        return axios.post(`${this.apiUrl}reg`,{
            name,
            pw,
            dn: Date.now()
        })
    }
    login(params = { name: "", pw: "" }) {
        let { name, pw } = params
        return axios.post(`${this.apiUrl}login`,{
            name,
            pw,
            dn: Date.now()
        })
    }
}