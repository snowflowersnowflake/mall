<template>
    <router-link tag="div" to="allCart" class="box">
        <div class="icon_wrap">
            <i class="fa fa-cart-plus"></i>
            <div v-show="haveCart" class="ball"></div>
        </div>

    </router-link>
</template>

<script>
import { Indicator } from "mint-ui"
import {CartCtrl} from '@/api/store/cart'
export default {
  data() {
    return {
      haveCart: false,
    }
  },
  created() {
    this.ctrl = new CartCtrl();
    this.ctrl.haveCart().then(d => {
      d = d.data;
      if(d.status==1) {
        this.haveCart = d.data
        Indicator.close()
      }
    }).catch(e => {
      console.log(e)
    })
  }
};
</script>

<style scoped lang="less">
@import "~@/style/base.less";
.box {
  height: 135 / @r;
  width: 135 / @r;
  border-radius: 50%;
  box-shadow: 0 4 / @r 10 / @r 0 rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.9);
  position: fixed;
  right: 35 / @r;
  bottom: 206 / @r;
  display: flex;
  align-items: center;
  justify-content: center;
  .icon_wrap {
    position: relative;
    i {
      font-size: 78 / @r;
      color: #818181;
      transform: translateX(-10%);
    }
    .ball {
      height: 22 / @r;
      width: 22 / @r;
      border-radius: 50%;
      background-color: #ff0000;
      position:absolute;
      top: -6/@r;
      right: -6/@r;
    }
  }
}
</style>