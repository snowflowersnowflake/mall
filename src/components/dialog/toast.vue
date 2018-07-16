<!--  -->
<template>
  <transition name="el-fade-in">
    <div class="toast">
        <div class="rua">{{toastText}}</div>
    </div>
   </transition>    
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {};
  },
  props: {
    showKey: {
      default: false
    }
  },
  computed: {
    ...mapState({
      toastText: state => {
        return state.toast.toastText
      },
      time: state => {
        return state.toast.time
      }
    })
  },
};
</script>
<style lang='less' scoped>
@import "~@/style/base.less";
.toast {
  position: fixed;
  bottom: 15%;
  left: 20%;
  right: 20%;
  text-align: center;
  .rua {
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
    font-size: 30 / @r;
    line-height: 50 / @r;
    border-radius: 14 / @r;
    padding: 30 / @r;
    display: inline-block;
  }
}
</style>