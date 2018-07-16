<template>
    <div class="checkout_page">
        <header>
            <div class="back" @click="$router.back(-1)">
                <i class="el-icon-arrow-left"></i>
            </div>
            <div class="title">
                <p>订单配送至</p>
                <h3>中建三局-写字楼武珞路456号8楼802</h3>
                <section>许(先生) 17607198430</section>
            </div>
        </header>
        <div class="content">
            <scroll>
                <div class="white_gradient">
                    
                </div>
            </scroll>
        </div>
    </div>
</template>

<script>
import scroll from "@/components/scroll";
export default {
  data() {
    return {
      key: "value"
    };
  },
  components: {
    scroll
  }
};
</script>

<style scoped lang='less'>
@import "~@/style/base.less";
.checkout_page {
  header {
    position: relative;
    background: linear-gradient(to right, #02aaff, #0387ff);
    height: 188 / @r;
    .back {
      position: absolute;
      top: 90 / @r;
      left: 60 / @r;
      color: #fff;
      font-size: 56 / @r;
    }
    .title {
      color: #fff;
      p {
        line-height: 56 / @r;
        font-size: 38 / @r;
        color: #ccedff;
      }
    }
  }
  .content {
    @h: 2.7246rem;
    height: calc(100% - @h);
    background: linear-gradient(to right, #02aaff, #0387ff);
    overflow: hidden;
    .white_gradient {
        height: 200%;
        background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255, 255, 255, 1));
    }
  }
}
</style>