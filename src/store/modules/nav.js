export default {
    state: {
        sortTitle:'综合排序',
        sortIndex:0,
        filter: {
            data_01:{checked:false,realCheck:false},
            data_02:{checked:false,realCheck:false},
            data_03:{checked:false,realCheck:false},
            data_04:{checked:false,realCheck:false},
            data_05:{checked:false,realCheck:false},
            data_06:{checked:false,realCheck:false},
            data_07:{checked:false,realCheck:false},
        },
        active:'',
        activeFakeIndex:0,
        activeRealIndex:0,
    },
    mutations: {
        setSort(state,obj={sortTitle:'',sortIndex:0}){
            state.sortTitle = obj.sortTitle
            state.sortIndex = obj.sortIndex
        },
        setFilter(state,obj){
            state.filter = obj
            var o = Object.assign(state.filter,obj)
            console.log(o)
        },
        setFilterData(state,attr){
            state.filter[attr].checked = !state.filter[attr].checked
        },
        setFakeActive(state,obj={title:'',index:0}){
            if(obj.title==state.active){
                state.active=''
                state.activeFakeIndex = 0
            }else {
                state.active = obj.title
                state.activeFakeIndex = obj.index
            }
            
        },
        writeRealData(state){
            state.activeRealIndex = state.activeFakeIndex;
            state.sortRealIndex = state.sortFakeIndex;
            for(var attr in state.filter){
                state.filter[attr].realCheck = state.filter[attr].checked
            }
        }
    },
    getters: {

    }
}