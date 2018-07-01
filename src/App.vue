<template>
  <div id="app">
    <toast class="z100" v-if="showToast"></toast> 
    <router-view class="h100"/>
  </div>
</template>

<script>
import toast from "@/components/dialog/toast";
import {mapState} from 'vuex';
export default {
  name: "App",
  data() {
    return {
     
    };
  },
  components: {
    toast
  },
  computed: {
    ...mapState({
      showToast:(state)=> {
        return state.toast.showToast
      }
    })
  }
};
</script>

<style lang='less'>
@import "~@/style/reset.less";
#app {
  height: 100%;
  .h100 {
    height: 100%;
  }
  .z100 {
    z-index: 999;
  }
}
</style>
