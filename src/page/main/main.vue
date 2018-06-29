<template>
  <div class="page">

    <router-view class="body"></router-view>

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
.page {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .body {
    flex-grow: 1;
    flex-shrink: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .footer {
    flex-shrink: 0;
  }
}
</style>