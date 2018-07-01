export default {
  state: {
    toastText: '',
    showToast: false,
    time: 2000
  },
  mutations: {
    setToast: (state, str, time) => {
      state.toastText = str
      if (time) {
        state.time = time
      }
    },
    showToast: (state) => {
      state.showToast = true
    },
    hideToast: (state) => {
      state.showToast = false
    }
  }
}