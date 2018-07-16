<template>
    <div>
        订单
        <div class="aa"></div>
        <div class="scroll" ref="wrapper">
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
                <li>8</li>
                <li>9</li>
                <li>10</li>
            </ul>
        </div>

    </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      key: "value"
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper);
    });
  }
};
</script>

<style scoped lang="less">
@import "~@/style/base.less";
.aa {
  height: 200 / @r;
}
.scroll {
  height: 100px;
  overflow: hidden;
  position: relative;
  /* ul {
      position: absolute;
      
      left: 0;
      right: 0;
  } */
}
</style>