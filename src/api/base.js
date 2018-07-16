export class BaseApi {
    constructor(str="") {
        this.apiUrl = `http://192.168.5.111:3000/${str}`
    }
}