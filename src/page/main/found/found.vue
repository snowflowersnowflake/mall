<template>
  <div class="found">
    <header>
      <h3>发现(纯静态没有跳转)</h3>
    </header>
    <section class="banner">
      <img src="static/index/banner.png" alt="">
    </section>
    <ul class="ad">
      <li>
        <div class="text">
          <h4>百元红包</h4>
          <p>xx银行联名卡</p>
        </div>
        <div class="img_wrap">
          <img src="static/found/fx_01.png" alt="">
        </div>
      </li><li>
        <div class="text">
          <h4>超级会员</h4>
          <p>每月领大额红包</p>
        </div>
        <div class="img_wrap">
          <img src="static/found/fx_02.png" alt="">
        </div>
      </li><li>
        <div class="text">
          <h4>金币商城</h4>
          <p>0元好物在这里</p>
        </div>
        <div class="img_wrap">
          <img src="static/found/fx_03.png" alt="">
        </div>
      </li><li>
        <div class="text">
          <h4>推荐有奖</h4>
          <p>5元现金不停拿</p>
        </div>
        <div class="img_wrap">
          <img src="static/found/fx_04.png" alt="">
        </div>
      </li><li>
        <div class="text">
          <h4>周边优惠</h4>
          <p>领取口碑好券</p>
        </div>
        <div class="img_wrap">
          <img src="static/found/fx_05.png" alt="">
        </div>
      </li><li>
        <div class="text">
          <h4>免费流量</h4>
          <p>每月最高500M</p>
        </div>
        <div class="img_wrap">
          <img src="static/found/fx_06.png" alt="">
        </div>
      </li>
    </ul>
    <div class="ad_wrap">
      <img src="static/found/ad.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>

<style scoped lang='less'>
@import "~@/style/base.less";
.found {
  background-color: #f5f5f5;
}
header {
  position: relative;
  background: linear-gradient(to right, #02aaff, #0387ff);
  height: 188 / @r;
  h3 {
    font-size: 60 / @r;
    color: #fff;
    padding-top: 96 / @r;
    text-align: center;
  }
}
.banner {
  height: 342/@r;
  img {
    height: 100%;
  }
}
.ad {
  display: flex;
  background-color: #fff;
  flex-wrap: wrap;
  border-top: 1px solid #eee;
  li {
    width:50%;
    padding: 55/@r;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    .text {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      h4 {
        font-size: 50/@r;
        color: #e88f28;
      }
      p {
        font-size: 38/@r;
        color: #999;
      }
    }
    .img_wrap {
      height: 150/@r;
      width: 150/@r;
      img {
        height: 100%;
        width: 100%;
      }
    }
    &:nth-child(2) .text h4 {color: #f5785d;}
    &:nth-child(3) .text h4 {color: #ff9900;}
    &:nth-child(4) .text h4 {color: #1ba9e1;}
    &:nth-child(5) .text h4 {color: #ed6660;}
    &:nth-child(6) .text h4 {color: #ff8585;}
    &:nth-child(odd) {
      border-right: 1px solid #eee;
    }
  }
}
.ad_wrap {
  padding: 37/@r 0;
  img {
    height: 356/@r;
  }
}
</style>