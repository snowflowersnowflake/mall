<template>
  <div class="page">
    <transition name="fade-out">
      <router-view class="body"></router-view>
    </transition>
    <cus-footer class="footer"></cus-footer>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import cusFooter from "@/components/footer/footer";
export default {
  data() {
    return {
      key: "value"
    };
  },
  components: {
    cusFooter
  },
  mounted() {
    /* this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.scroll, {});
    }); */
  }
};
</script>

<style lang="less" scoped>
@import "~@/style/base.less";
.page {
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  .body {
    height: 100%;
    padding-bottom: 147/@r;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: 0.5s;
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
  }
  .fade-out-enter,
  .fade-out-leave-to {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 147/@r;
    width: 100%;
    overflow: hidden;
  }
  .fade-out-enter-active {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 147/@r;
    width: 100%;
    z-index: 999;
    overflow: hidden;
  }
  .fade-out-leave {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    bottom: 147/@r;
    z-index: 0;
    overflow: hidden;
  }
}
</style>