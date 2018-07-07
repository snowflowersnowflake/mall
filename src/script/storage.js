var ls = window.localStorage;

export function setStorage(k,v){
    if(arguments.length==2){
        if(typeof v =='object'){
            v = 'obj-' + JSON.stringify(v);
        }else {
            v = 'str-' + v
        }
        ls.setItem(k,v)
    }
}
export function getStorage(k){
    var v = ls.getItem(k);
    if(!v) {return;}
    if(v.indexOf('obj-')===0){
        v = JSON.parse(v.slice(4))
    }else if (v.indexOf('str-')===0){
        v = v.slice(4)
    }
    return v
}
export function rmStorage(k){
    if(k){
        ls.removeItem(k)
    }
}
export function clearStorage(){
    ls.clear()
}