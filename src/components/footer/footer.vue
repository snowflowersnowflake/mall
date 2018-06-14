<template>
    <div class="footer">
        <router-link to="/index" class="footer-1">首页</router-link>
        <router-link to="/found" class="footer-2">发现</router-link>
        <router-link to="/bills" class="footer-3">订单</router-link>
        <router-link to="/center" class="footer-4">我的</router-link>
    </div>
</template>

<script>
export default {
  data() {
    return {
      key: "value"
    };
  }
};
</script>

<style lang="less" scoped>
@import "~@/style/base.less";
.loop(@n,@i:1) when (@i<=@n) {
  &.footer-@{i} {
    background-image: url("~@/assets/footer/footer-@{i}.png");
    &.router-link-active {
      background-image: url("~@/assets/footer/footer-@{i}-active.png");
    }
  }
  .loop(@n,(@i+1));
}
.footer {
  display: flex;
  height: 147 / @r;
  padding-top: 20 / @r;
  align-items: center;
  background-color: #fafafa;
  > a {
    flex-grow: 1;
    font-size: 29 / @r;
    color: #666;
    height: 105 / @r;
    padding-top: 76 / @r;
    text-align: center;
    background: no-repeat center top;
    background-size: 62 / @r !important;
    .loop(4)
  }
  .router-link-active {
    color: @blue;
  }
}
</style>