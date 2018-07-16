export default {
  state: {
    toastText: '',
    showToast: false,
    time: 2000,
    timer:null
  },
  mutations: {
    openToast: (state, str, time) => {
      clearTimeout(state.timer)
      state.toastText = str
      state.time = time ? time :2000
      state.showToast = true
      state.timer = setTimeout(()=>{
        state.showToast = false
      },state.time)
    }
  }
}