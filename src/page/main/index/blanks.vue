<template>
    <div>
        <ul class="h1">
            <router-link to="list?title=限量抢购" tag="li">
                <h3>限量抢购</h3>
                <p>丰盛晚餐9.9元起</p>
                <section>
                    <span>2757人</span>正在抢></section>
                <img src="static/index/blank-1.png" alt="">
            </router-link>
            <router-link to="list?title=果蔬生鲜" tag="li">
                <h3>周4水果日</h3>
                <p>大牌满立减20元</p>
                <section>新鲜抢购></section>
                <img src="static/index/blank-2.png" alt="">
            </router-link>
        </ul>
        <ul class="h2">
            <router-link to="list?title=大牌夜市" tag="li">
                <h4>大牌夜市</h4>
                <section>不止立减30</section>
                <img src="static/index/blank-2-1.png" alt="">
            </router-link>
            <router-link to="list?title=品质联盟" tag="li">
                <h4>品质联盟</h4>
                <section>品质升级 消费亲民</section>
                <img src="static/index/blank-2-2.png" alt="">
            </router-link>
            <router-link to="list?title=猜你喜欢" tag="li">
                <h4>猜你喜欢</h4>
                <section>沙拉</section>
                <img src="static/index/blank-2-3.png" alt="">
            </router-link>
        </ul>
        <section class="h3">
            <img src="static/index/blank-3.png" alt="">
        </section>
        <div class="blank">
            <div class="head">
                <div class="title">
                    <section class="left"></section>
                    品质优选
                    <section class="right"></section>
                </div>
                <router-link to="list?title=品质优选" class="more">更多 ></router-link>
            </div>
            <div class="body">
                <ul>
                    <router-link tag="li" :to="{path:'/store/product',query:{id:item._id}}" v-for="(item,index) in recommend" :key="index">
                        <div class="img_wrap">
                            <img v-lazy="item.img_url" alt="">
                        </div>
                        <h3>{{item.title}}</h3>
                        <span>大牌精选</span>
                    </router-link>
                </ul>

            </div>
        </div>
    </div>
</template>

<script>
export default {
  props:{
    recommend:{
      type:Array,
      default:[]
    }
  },
  data() {
    return {
      brands: [
        {
          title: "老乡鸡",
          tag: "大牌精选",
          imgUrl: "static/index/laoxiangji.png"
        },
        {
          title: "香他她煲仔饭",
          tag: "大牌精选",
          imgUrl: "static/index/xiangtata.png"
        },
        {
          title: "曼玲粥店",
          tag: "大牌精选",
          imgUrl: "static/index/manlingzhoudian.png"
        },
        {
          title: "大米先生",
          tag: "大牌精选",
          imgUrl: "static/index/dami.png"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
@import "~@/style/base.less";
.h1 {
  display: flex;
  justify-content: space-between;
  margin: 10 / @r 30 / @r;
  li {
    width: 50%;
    height: 468 / @r;
    padding: 50 / @r;
    background: linear-gradient(#fafafa, #f5f4f3);
    position: relative;
    margin-left: 10 / @r;
    &:nth-of-type(1) {
      margin-left: 0;
    }
    h3 {
      font-size: 47 / @r;
      color: @red;
      padding-bottom: 24 / @r;
      font-weight: bold;
    }
    p {
      font-size: 36 / @r;
      color: #6c6c6c;
      padding-bottom: 32 / @r;
    }
    section {
      font-size: 36 / @r;
      color: #333;
      padding-bottom: 32 / @r;
      span {
        color: @red;
      }
    }
    img {
      width: 50%;
      right: 5%;
      bottom: -14 / @r;
      position: absolute;
      z-index: 32;
    }
  }
}
.h2 {
  display: flex;
  justify-content: space-between;
  margin: 10 / @r 30 / @r;
  li {
    height: 447 / @r;
    padding-top: 56 / @r;
    background: linear-gradient(#fafafa, #f5f4f3);
    width: 33%;
    margin-left: 10 / @r;
    &:nth-of-type(1) {
      margin-left: 0;
    }
    text-align: center;
    font-size: 0;
    position: relative;
    h4 {
      font-size: 46 / @r;
      color: #333;
      font-weight: bold;
      text-align: center;
      padding-bottom: 23 / @r;
    }
    section {
      font-size: 30 / @r;
      color: #666;
      padding: 5 / @r;
      border-radius: 3 / @r;
      border: 1px solid #999;
      display: inline-block;
    }
    img {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
    }
  }
}
.h3 {
  display: flex;
  margin: 0 30 / @r;
  height: 276 / @r;
  img {
    height: 100%;
  }
}
.blank {
  padding-top: 44/ @r;
  .head {
    height: 48 / @r;
    position: relative;
    .title {
      height: 100%;
      width: 400 / @r;
      margin: 0 auto;
      font-size: 46 / @r;
      color: #ab7d42;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      section {
        height: 100%;
        border-bottom: 1px solid #cea570;
        transform: translateY(-50%);
        width: 62 / @r;
        position: relative;
      }
      .left:after,
      .right:before {
        display: block;
        content: "";
        border-radius: 50%;
        border: 2px solid #cea570;
        width: 0;
        height: 0;
        position: absolute;
        bottom: -2px;
      }
      .left:after {
        right: -20 / @r;
      }
      .right:before {
        left: -20 / @r;
      }
    }
    .more {
      position: absolute;
      right: 30 / @r;
      font-size: 32 / @r;
      color: #666;
      line-height: 48 / @r;
      top: 0;
    }
  }
  .body {
      padding: 50/@r 0;
      height: 400/@r;
      ul {
          display: flex;
          justify-content: space-around;
          li {
              width: 25%;
              display: flex;
              flex-direction: column;
              align-items: center;
              .img_wrap {
                  height: 180/@r;
                  width: 180/@r;
                  border: 2/@r solid rgba(0,0,0,0.1);
                  overflow: hidden;
                  border-radius: 5/@r;
                  margin-bottom: 22/@r;
                  img {
                      height: 100%;
                      width: auto;
                  }
              }
              h3 {
                  font-size: 34/@r;
                  color: #333;
                  text-align: center;
                  margin-bottom: 15/@r;
              }
              span {
                  padding: 6/@r;
                  border: 2/@r solid #76d0fd;
                  color: #00abff;
                  font-size: 28/@r;
                  border-radius: 3/@r;
              }
          }
      }
  }
}
</style>