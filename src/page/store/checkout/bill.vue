<template>
    <div class="bill">
        <header ref="head">
            <div class="back" @click="$router.back(-1)">
                <i class="el-icon-arrow-left"></i>
            </div>
            <div class="title" :style="{'transform':`scale(${scale}) translate3d(${translateX}rem,${translateY}rem,0)`}">
                <h3>
                    <span ref="textWrap">
                        订单已经送达
                    </span>
                    <i :style="{'opacity':opacity}" class="el-icon-arrow-right"></i>
                </h3>
            </div>
        </header>
        <div class="content">
            <div class="white_gradient"></div>
            <scroll class="scroll" :listenScroll="true" :probeType="3" @scroll="scroll_">
                <div class="real_content">
                    <div class="white_bg service">
                        <h4>感谢您对饿了么的信任，期待再次光临</h4>
                        <p>
                            <span>准时达服务：</span>订单已准时送达，感谢您使用准时达服务</p>
                    </div>
                    <div class="white_bg">
                        <ul class="list">
                            <li class="oneMore">
                                <div class="left">
                                    <span>{{bill.storeName}}
                                        <i class="el-icon-arrow-right"></i>
                                    </span>
                                </div>
                                <div class="right" @click="copyBill(bill)">
                                    <span>再来一单</span>
                                </div>
                            </li>
                            <li class="pd8">
                                <ul class="goods">
                                    <li v-for="(item,index) in bill.cart" :key="index">
                                        <div class="left">
                                            <div class="img_wrap">
                                                <img :src="item.imgUrl" alt="">
                                            </div>
                                            <span>{{item.name}}</span>
                                        </div>
                                        <div class="right">
                                            <section>x{{item.count}}</section>
                                            <div class="ori" v-if="idDirty">{{ item.is_discount ? '￥'+item.price[0].price : ""}}</div>
                                            <p>￥{{ item.is_discount ? item.real_price : item.price[0].price}}</p>
                                        </div>
                                    </li>
                                    <li v-if="bill.minus>0">
                                        <div class="left">
                                            <div class="text_box mj">满减</div>
                                            <span>在线支付立减优惠</span>
                                        </div>
                                        <div class="right">
                                            <p class="orange">-￥{{bill.minus}}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="left">
                                            <div class="text_box blue">配送费</div>
                                            <span>蜂鸟专送</span>
                                        </div>
                                        <div class="right">
                                            <p>￥{{bill.transportPrice}}</p>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li class="totalPrice">
                                <section>小计</section>
                                <p>￥{{bill.totalPrice}} </p>
                            </li>
                        </ul>
                    </div>
                    <div class="white_bg">
                        <ul class="list">
                            <router-link tag="li" :to="{path:'rate',query:{billId:bill._id}}">
                                <div class="left">
                                    <span class="bold">我的评价</span>
                                </div>
                                <div class="right">
                                    <span>
                                        <i class="el-icon-arrow-right"></i>
                                    </span>
                                </div>
                            </router-link>
                        </ul>
                    </div>
                    <div class="white_bg">
                        <ul class="list">
                            <li>
                                <div class="left">
                                    <span class="bold">配送信息</span>
                                </div>
                            </li>
                            <li>
                                <div class="left">
                                    <span>送达时间</span>
                                </div>
                                <div class="right">
                                    <span>尽快送达</span>
                                </div>
                            </li>
                            <li class="address">
                                <div class="left">
                                    <span>收货地址</span>
                                </div>
                                <div class="right" v-if="bill.address">
                                    <p>{{bill.address.address.name + bill.address.address.detail}}</p>
                                    <p class="pt20">{{getUser(bill.address)}}</p>
                                </div>
                            </li>
                            <li>
                                <div class="left">
                                    <span>配送方式</span>
                                </div>
                                <div class="right">
                                    <span>蜂鸟专送</span>
                                </div>
                            </li>
                            <li>
                                <div class="left">
                                    <span>配送骑手</span>
                                </div>
                                <div class="right">
                                    <span>黄翔</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="white_bg">
                        <ul class="list">
                            <li>
                                <div class="left">
                                    <span class="bold">订单信息</span>
                                </div>
                            </li>
                            <li>
                                <div class="left">
                                    <span>订单号</span>
                                </div>
                                <div class="right">
                                    <span>{{bill._id}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="left">
                                    <span>支付方式</span>
                                </div>
                                <div class="right">
                                    <span>并没有支付</span>
                                </div>
                            </li>
                            <li>
                                <div class="left">
                                    <span>下单时间</span>
                                </div>
                                <div class="right">
                                    <span>{{bill.timeString}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </scroll>
        </div>
    </div>
</template>

<script>
import scroll from "@/components/scroll";
import { CartCtrl } from "@/api/store/cart";
import { Toast, Indicator, MessageBox } from "mint-ui";
export default {
  data() {
    return {
      mult: 1,
      scale: 1,
      translateY: 0,
      translateX: 0,
      headHeight: 0,
      opacity: 1,
      bill: {}
    };
  },
  methods: {
    scroll_(pos) {
      if (pos.y > 0) {
        this.scale = 1;
        this.translateY = 0;
        this.translateX = 0;
        this.mult = 1;
        this.opacity = 1;
        return;
      }
      if (-pos.y < this.headHeight + 100) {
        pos.y = -pos.y < this.headHeight ? pos.y : -this.headHeight;
        this.mult = -pos.y / this.headHeight;
        this.scale = 1 - (1 - 0.5326) * this.mult;
        this.translateY = this.mult * -0.7;
        this.translateX = this.mult * 4;
        this.opacity = 1 - this.mult;
        //scale 1 -> 0.5326
        //translate3d(0,0,0) -> translate3d(4rem,-0.7rem,0);
      }
    },
    copyBill(item) {
      this.ctrl
        .copyBill({ billId: item._id })
        .then(d => {
          d = d.data;
          if (d.status == 1) {
            this.$router.push({ path: "store", query: { id: item.storeId } });
          }
          Indicator.close();
        })
        .catch(e => {
          console.log(e);
        });
    },
    getUser(address) {
      if (address && address._id) {
        var { name, sex, tel } = address;

        if (sex) {
          return `${name}(先生) ${tel}`;
        } else {
          return `${name}(女士) ${tel}`;
        }
      }
    },
    init_() {
      var billId = this.$route.query.billId;
      this.ctrl
        .getBill({ billId })
        .then(d => {
          d = d.data;
          if (d.status == 1) {
            this.bill = d.data;
          } else {
            Toast({
              message: d.msg,
              position: "bottom"
            });
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  components: {
    scroll
  },
  computed: {
    idDirty() {
      return (
        this.bill.cart &&
        this.bill.cart.some(item => {
          return item.is_discount;
        })
      );
    }
  },
  created() {
    this.ctrl = new CartCtrl();
    this.init_();
  },
  mounted() {
    this.headHeight = this.$refs.head.offsetHeight;
  },
  watch: {}
};
</script>

<style scoped lang='less'>
@import "~@/style/base.less";
.bill {
  display: flex;
  flex-direction: column;
  header {
    position: relative;
    background: linear-gradient(to right, #02aaff, #0387ff);
    height: 188 / @r;
    z-index: 20;
    flex: none;
    .back {
      position: absolute;
      top: 50 / @r;
      left: 20 / @r;
      padding: 40 / @r;
      color: #fff;
      font-size: 56 / @r;
      z-index: 20;
    }
    .title {
      color: #fff;
      padding: 188 / @r 48 / @r 0;
      transform-origin: center top;
      //transform: scale(0.733) translateY(-140/@r);
      h3 {
        font-size: 92 / @r;
        font-weight: bold;
        letter-spacing: 4 / @r;
        display: flex;
        span {
          line-height: 176 / @r;
          overflow: hidden;
          em {
            display: inline-block;
            white-space: nowrap;
            text-align: right;
            transition: 1.5s;
            transform: translateX(0);
          }
        }
        i {
          flex: none;
          font-size: 50 / @r;
          line-height: 176 / @r;
          margin-left: 24 / @r;
        }
      }
    }
  }
  .content {
    flex: auto;
    background: linear-gradient(to right, #02aaff, #0387ff);
    overflow: hidden;
    position: relative;
    z-index: 10;
    .white_gradient {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      background: linear-gradient(
        to top,
        #f5f5f5,
        rgba(245, 245, 245, 1) 70%,
        rgba(245, 245, 245, 0) 90%
      );
    }
    .scroll {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      .real_content {
        padding: 188 / @r 24 / @r 24/@r;
        .white_bg {
          background-color: #fff;
          margin-bottom: 24 / @r;
          box-shadow: 0 0 20 / @r rgba(0, 0, 0, 0.2);

          .list {
            padding: 0 48 / @r;
            > li {
              padding: 50 / @r 0;
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 1px solid #efefef;
              font-size: 44 / @r;
              .left {
                flex: none;
                width: 300/@r;
                span {
                  display: block;
                  color: #333;
                  &.bold {
                      font-weight: bold;
                  }
                  &.pb20 {
                    padding-bottom: 20 / @r;
                  }
                }
              }
              .right {
                i {
                  color: #d1d1d6;
                }
                color: #666;
                font-size: 39 / @r;
                span {
                  &.dis {
                    color: #bbb;
                  }
                  &.spe {
                    color: #bbb;
                    text-align: right;
                    max-width: 700 / @r;
                    display: inline-block;
                    &.c3 {
                      color: #333;
                    }
                    .text_one_line;
                    em {
                      color: #00b773;
                      background: url("/static/leaf.png") no-repeat left center;
                      background-size: 46 / @r;
                      padding-left: 58 / @r;
                      padding-right: 22 / @r;
                    }
                  }
                }
                p {
                  text-align: right;
                  line-height: 42 / @r;
                }
                .pt20 {
                    padding-top: 20/@r;
                }
              }
              &.address {
                  align-items: flex-start;
              }
              &.oneMore {
                padding: 36 / @r 0;
                .left {
                  font-size: 44 / @r;
                  width: 123/@r;
                  flex:1;
                  span {
                      font-weight: bold;
                      .text_one_line;
                  }
                  i {
                    font-size: 40 / @r;
                    color: #c7c7c7;
                    margin-left: 30 / @r;
                  }
                }
                .right {
                    flex: none;
                    margin-left: 40/@r;
                  span {
                    display: block;
                    padding: 22 / @r;
                    color: @blue;
                    border: 1px solid @blue;
                    border-radius: 6 / @r;
                    font-size: 39 / @r;
                  }
                }
              }
              .goods {
                width: 100%;
                li {
                  padding: 28 / @r 0;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  .left {
                    display: flex;
                    align-items: center;
                    width: 0;
                    flex: 1;
                    .img_wrap {
                      flex: none;
                      height: 108 / @r;
                      width: 108 / @r;
                      margin-right: 26 / @r;
                      img {
                        width: 100%;
                        height: 100%;
                      }
                    }
                    .text_box {
                      height: 46 / @r;
                      border-radius: 3 / @r;
                      width: 108 / @r;
                      line-height: 46 / @r;
                      color: #fff;
                      font-size: 29 / @r;
                      text-align: center;
                      margin-right: 26 / @r;
                      &.blue {
                        background-color: @blue;
                      }
                      &.mj {
                        background-color: #fff4f2;
                        color: #ce7b77;
                        border: 2 / @r solid #ce7b77;
                        line-height: 42 / @r;
                      }
                    }
                    span {
                      font-size: 40 / @r;
                      color: #333;
                    }
                  }
                  .right {
                    display: flex;
                    margin-left: 30 / @r;
                    align-items: center;
                    section {
                      font-size: 34 / @r;
                      color: #333;
                    }
                    .ori {
                      width: 168 / @r;
                      text-align: right;
                      font-size: 40 / @r;
                      color: #bbb;
                      text-decoration: line-through;
                    }
                    p {
                      width: 168 / @r;
                      text-align: right;
                      font-size: 40 / @r;
                      color: #333;
                      &.orange {
                        color: @orange;
                      }
                    }
                    &.total {
                      padding: 20 / @r;
                      section {
                        font-size: 40 / @r;
                        color: #333;
                      }
                      p {
                        font-size: 50 / @r;
                      }
                    }
                  }
                }
              }
              &.totalPrice {
                justify-content: flex-end;
                color: #333;
                section {
                  font-size: 40 / @r;
                }
                p {
                  font-size: 50 / @r;
                }
              }
              &.pd8 {
                padding: 8 / @r 0;
              }
              &:nth-last-of-type(1) {
                border-bottom: none;
              }
            }
          }
        }
        .service {
          padding: 50 / @r;
          h4 {
            font-size: 52 / @r;
            color: #333;
            padding-bottom: 25 / @r;
            font-weight: bold;
          }
          p {
            font-size: 36 / @r;
            color: #666;
            span {
              color: @blue;
            }
          }
        }
      }
    }
  }
}
</style>