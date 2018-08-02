<template>
  <div class="checkout_page">
    <header ref="head">
      <div class="back" @click="$router.back(-1)">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div @click="openAddressList" class="title" :style="{'transform':`scale(${scale}) translateY(${translateY}rem)`}">
        <p :style="{'opacity':opacity}">订单配送至</p>
        <h3 v-if="address.address">
          <span ref="textWrap">
            <em ref="addressText" :style="{'transform':`translateX(${addressScroll}px)`,'background-image':`linear-gradient(to right,rgba(255, 255, 255, 0) ${opacityScroll-10}%,#fff ${opacityScroll}%)`}">{{address.address.name + address.address.detail}}</em>
          </span>
          <i :style="{'opacity':opacity}" class="el-icon-arrow-right"></i>
        </h3>
        <h3 v-else>
          <span>
            <em>前往添加地址</em>
          </span>
        </h3>
        <section :style="{'opacity':opacity}">{{getUser(address)}}</section>
      </div>
    </header>
    <div class="content">
      <div class="white_gradient"></div>
      <scroll class="scroll" :listenScroll="true" :probeType="3" @scroll="scroll_">
        <div class="real_content">
          <div class="white_bg">
            <ul class="list">
              <li @click="prohibited">
                <div class="left">
                  <span>送达时间</span>
                </div>
                <div class="right">
                  <span>尽快送达({{endTime}})</span>
                </div>
              </li>
              <li @click="prohibited">
                <div class="left">
                  <span class="pb20">支付方式</span>
                  <p>并没有支付功能
                    <em>不会扣款</em>
                  </p>
                </div>
                <div class="right">
                  <span>支付宝
                    <i class="el-icon-arrow-right"></i>
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div class="white_bg">
            <ul class="list">
              <li>
                <div class="left">
                  <span>{{bill.storeName}}</span>
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
              <li @click="prohibited">
                <div class="left">
                  <span>红包</span>
                </div>
                <div class="right">
                  <span class="dis">无可用红包
                    <i class="el-icon-arrow-right"></i>
                  </span>
                </div>
              </li>
              <li class="totalPrice">
                <section>小计</section>
                <p>￥{{bill.totalPrice}} </p>
              </li>
            </ul>
          </div>
          <div class="white_bg">
            <ul class="list">
              <li @click="openMark">
                <div class="left">
                  <span>订单备注</span>
                </div>
                <div class="right">
                  <span class="spe" :class="{'c3':markText.length}">{{markText||'口味、偏好'}}</span>
                  <i class="el-icon-arrow-right"></i>
                </div>
              </li>
              <li @click="openTableware">
                <div class="left">
                  <span>餐具份数</span>
                </div>
                <div class="right">
                  <span class="spe" :class="{'c3':tablewareText!='未选择'}">
                    <em v-show="tablewareText=='未选择'||tablewareText==tablewareTextCalc(0)">{{tablewareText=='未选择'?'马上助力环保':'&nbsp;'}}</em>{{tablewareText}}
                    <i class="el-icon-arrow-right"></i>
                  </span>
                </div>
              </li>
              <li>
                <div class="left">
                  <span>号码保护</span>
                </div>
                <div class="right" @click="onoff">
                  <div class="switch" :class="{'open':protection}">
                    <div class="ball"></div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </scroll>
    </div>
    <footer>
      <span>￥{{bill.totalPrice}}
        <i v-show="bill.totalPrice!=bill.initPrice"> 已优惠￥{{Math.round((bill.initPrice - bill.totalPrice)*100)/100}}</i>
      </span>
      <em @click="sub">确认支付</em>
    </footer>
    <mt-popup style="height:100%;width:100%" v-model="showAddress" position="right">
      <address-choose @address-back="closeAddressList" :select="true" @select="addressSelect" class="address_list" />
    </mt-popup>
    <mt-popup style="height:100%;width:100%" v-model="remarksSwitch" position="right">
      <remarks ref="mark" @back="closeMark" @writeMark="writeMark"></remarks>
    </mt-popup>
    <mt-popup style="width:100%" v-model="tablewareSwitch" position="bottom">
      <div class="tableware">
        <div class="tableware-head">
          餐具份数
          <i class="el-icon-close" @click="closeTableware"></i>
        </div>
        <ul>
          <li v-for="(item,index) in tablewareArr" :class="{'select':tablewareTextCalc(index)==tablewareText}" :key="index" @click="selectTableware(tablewareTextCalc(index))">
            <img v-if="index==0" src="static/leaf.png" alt="">{{tablewareTextCalc(index)}}
          </li>
        </ul>
      </div>
    </mt-popup>

  </div>
</template>

<script>
import scroll from "@/components/scroll";
import { CartCtrl } from "@/api/store/cart";
import { Toast, Indicator, MessageBox } from "mint-ui";
import addressChoose from "@/page/address/address_list";
import remarks from "@/page/store/checkout/remarks";
export default {
  data() {
    return {
      addressScroll: 0,
      opacityScroll: 0,
      mult: 1,
      scale: 1,
      translateY: 0,
      headHeight: 0,
      opacity: 1,
      protection: false,
      bill: {},
      showAddress: false,
      address: {},
      tablewareSwitch: false,
      tablewareArr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      tablewareText: "未选择",
      remarksSwitch: false,
      markText: "",
      endTime: ""
    };
  },
  methods: {
    scroll_(pos) {
      //console.log(pos);
      if (pos.y > 0) {
        this.scale = 1;
        this.translateY = 0;
        this.opacity = 1;
        this.mult = 1;
        return;
      }
      if (-pos.y < this.headHeight + 100) {
        pos.y = -pos.y < this.headHeight ? pos.y : -this.headHeight;
        this.mult = -pos.y / this.headHeight;
        this.scale = 1 - (1 - 0.733) * this.mult;
        this.translateY = this.mult * -2.023;
        this.opacity = 1 - this.mult;
        //scale 1 -> 0.733
        //translateY 0 -> -2.023
      }
    },
    onoff() {
      this.protection = !this.protection;
    },
    openAddressList() {
      this.showAddress = true;
    },
    closeAddressList() {
      this.showAddress = false;
    },
    addressSelect(item) {
      this.showAddress = false;
      this.address = item;
    },
    openTableware() {
      this.tablewareSwitch = true;
    },
    closeTableware() {
      this.tablewareSwitch = false;
    },
    selectTableware(str) {
      this.tablewareText = str;
      this.closeTableware();
    },
    closeMark() {
      this.remarksSwitch = false;
    },
    openMark() {
      this.remarksSwitch = true;
      this.$nextTick(() => {
        this.$refs.mark.focus_();
        this.$refs.mark.text = this.markText;
      });
    },
    writeMark(str) {
      this.markText = str;
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
    tablewareTextCalc(index) {
      if (index == 0) {
        return "无需餐具";
      } else if (index == this.tablewareArr.length - 1) {
        return index + "份以上";
      } else {
        return index + "份";
      }
    },
    prohibited() {
      Toast({
        message: "没有制作该功能",
        position: "bottom"
      });
    },
    sub() {
      var billId = this.$route.query.billId;
      this.ctrl
        .createBill({
          billId,
          markStr: this.markText,
          tablewareStr:
            this.tablewareText == "未选择" ? "" : this.tablewareText,
          addressId: this.address._id || ""
        })
        .then(d => {
          d = d.data;
          if (d.status == 1) {
            MessageBox.alert(
              "由于没有配送功能,订单将直接成为已完成状态,后续可以走评论功能",
              "提示"
            ).then(() => {
              this.$router.replace("/bills");
            });
          }
          Indicator.close();
        })
        .catch(e => {
          console.log(e);
        });
    },
    init_() {
      var d = new Date();
      d.setMinutes(d.getMinutes() + 5);
      var str = d.getHours() + ":" + (d.getMinutes() <10 ? '0'+d.getMinutes() : d.getMinutes()) ;
      this.endTime = str;
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
    scroll,
    addressChoose,
    remarks
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
  watch: {
    address(newVal) {
      this.$nextTick(() => {
        this.headHeight = this.$refs.head.offsetHeight;
        if (this.address) {
          this.addressScroll =
            this.$refs.textWrap.offsetWidth -
            this.$refs.addressText.offsetWidth;

          if (this.addressScroll > 0) {
            this.addressScroll = 0;
            this.opacityScroll = -10;
          } else {
            var o =
              -(this.addressScroll / this.$refs.addressText.offsetWidth) + 0.1;
            this.opacityScroll = Math.round(o * 10000 / 100);
          }
        }
      });
    }
  }
};
</script>

<style scoped lang='less'>
@import "~@/style/base.less";
.checkout_page {
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
      p {
        line-height: 60 / @r;
        font-size: 40 / @r;
        color: #ccedff;
      }
      h3 {
        font-size: 60 / @r;
        font-weight: bold;
        letter-spacing: 4 / @r;
        display: flex;
        span {
          flex: 1;
          width: 0;
          line-height: 109 / @r;
          overflow: hidden;
          em {
            display: inline-block;
            white-space: nowrap;
            text-align: right;
            transition: 1.5s;
            transform: translateX(0);
            background-image: linear-gradient(
              to right,
              rgba(255, 255, 255, 0),
              #fff 10%
            );
            -webkit-text-fill-color: transparent;
            -webkit-background-clip: text;
          }
        }
        i {
          flex: none;
          font-size: 31 / @r;
          color: rgba(255, 255, 255, 0.7);
          line-height: 109 / @r;
          margin-left: 30 / @r;
        }
      }
      section {
        line-height: 60 / @r;
        font-size: 40 / @r;
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
    }
    .real_content {
      padding: 255 / @r 24 / @r 34 / @r;
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
              span {
                display: block;
                color: #333;
                &.pb20 {
                  padding-bottom: 20 / @r;
                }
              }
              p {
                font-size: 28 / @r;
                color: #999;
                em {
                  color: @orange;
                }
              }
            }
            .right {
              i {
                color: #d1d1d6;
              }
              span {
                color: @blue;

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
                    background: url("~@/assets/leaf.png") no-repeat left center;
                    background-size: 46 / @r;
                    padding-left: 58 / @r;
                    padding-right: 22 / @r;
                  }
                }
              }
              .switch {
                height: 94 / @r;
                width: 154 / @r;
                border: 5 / @r solid #e3e3e3;
                border-radius: 47 / @r;
                display: flex;
                position: relative;
                background-color: #fff;
                transition: 0.3s;
                &.open {
                  background-color: #00d762;
                  .ball {
                    transform: translateX(64 / @r);
                  }
                }
                .ball {
                  position: absolute;
                  top: 0 / @r;
                  left: 0 / @r;
                  height: 84 / @r;
                  width: 84 / @r;
                  background-color: #fff;
                  border-radius: 47 / @r;
                  box-shadow: 0 4 / @r 4 / @r rgba(0, 0, 0, 0.4);
                  transition: 0.3s;
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
    }
  }
  footer {
    flex: none;
    height: 144 / @r;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: space-between;
    color: #fff;
    span {
      line-height: 144 / @r;
      padding-left: 60 / @r;
      font-size: 50 / @r;
      i {
        font-size: 36 / @r;
        color: #bbb;
        display: inline-block;
        line-height: 50 / @r;
        border-left: 1px solid #bbb;
        padding-left: 20 / @r;
      }
    }
    em {
      width: 315 / @r;
      line-height: 144 / @r;
      font-size: 50 / @r;
      text-align: center;
      background-color: #00d762;
    }
  }
  .address_list {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 30;
    transition: 0.5s;
    transform: translate3d(0, 0, 0);
  }
  .tableware {
    height: 1188 / @r;
    background-color: #fff;
    width: 100%;
    display: flex;
    flex-direction: column;
    .tableware-head {
      flex: none;
      height: 168 / @r;
      line-height: 168 / @r;
      border-bottom: 1px solid #eee;
      text-emphasis: center;
      font-size: 48 / @r;
      color: #333;
      text-align: center;
      font-weight: bold;
      position: relative;
      i {
        padding: 20 / @r;
        position: absolute;
        right: 28 / @r;
        top: 40 / @r;
        font-size: 50 / @r;
        color: #9e9e9e;
      }
    }
    ul {
      flex: 1;
      overflow: scroll;
      li {
        height: 150 / @r;
        line-height: 150 / @r;
        text-align: center;
        color: #333;
        font-size: 46 / @r;
        &.select {
          color: @blue;
        }
        img {
          height: 50 / @r;
          margin-top: 50 / @r;
          margin-right: 20 / @r;
        }
      }
    }
  }
}
</style>