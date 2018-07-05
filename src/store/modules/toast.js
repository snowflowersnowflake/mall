export default {
  state: {
    toastText: '',
    showToast: false,
    time: 2000
  },
  mutations: {
    openToast: (state, str, time) => {
      state.toastText = str
      if (time) {
        state.time = time
      }
      state.showToast = true
    },
    hideToast: (state) => {
      state.showToast = false
    }
  }
}