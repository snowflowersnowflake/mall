<template>
  <div class="bill_list">
    <header>
      <h3>订单</h3>
    </header>
    <div class="scroll_wrap" ref="wrapper">
      <scroll ref="scroll" class="scroll" @scrollToEnd="load" :pullUpLoad="list.length>=6" :pullDownRefresh="true" :probeType="3" :listenScroll="true" @pulldown="init_">
        <div class="body" ref="body">
          <h4>历史订单</h4>
          <ul>
            <router-link tag="li" :to="{path:'billDetail',query:{billId:item._id}}" v-for="(item,index) in list" :key="index">
              <section @click.stop="toStore(item)" class="logo">
                <img v-lazy="item.imgUrl" alt="">
              </section>
              <section class="text">
                <div @click.stop="toStore(item)" class="title same">
                  <div class="front">
                    <span>{{item.storeName}}</span>
                    <i class="el-icon-arrow-right"></i>
                  </div>
                  <em>订单已送达</em>
                </div>
                <p class="time">{{item.timeString}}</p>
                <div class="prices same">
                  <div class="front">
                    <span>{{item.cart[0].name}}</span>
                    <i v-show="item.cart.length>1">&emsp;等{{item.cart.length}}件物品</i>
                  </div>
                  <strong>￥{{item.totalPrice}}</strong>
                </div>
                <div class="btns">
                  <strong @click.stop="copyBill(item)">再来一单</strong>
                  <strong v-if="item.status==1" class="orange" @click.stop="toRate(item)">评价得{{Math.ceil(item.totalPrice/2)}}金币</strong>
                </div>
              </section>
            </router-link>
          </ul>
          <div class="nodata" v-show="list.length==0">
            没有订单 <br>
            <router-link to="index" tag="p">前往下单</router-link>
          </div>
        </div>
      </scroll>
    </div>

  </div>
</template>

<script>
import scroll from "@/components/scroll";
import { Indicator, Toast } from "mint-ui";
import { CartCtrl } from "@/api/store/cart";
export default {
  data() {
    return {
      list: [],
      page: 0
    };
  },
  methods: {
    load() {
      this.ctrl
        .getBillList({ page: this.page })
        .then(d => {
          d = d.data;
          if (d.status == 1) {
            this.page++;
            this.list.push(...d.data);
            setTimeout(() => {
              this.$refs.scroll.refresh();
              this.$refs.scroll.finishPullDown();
              if (this.list.length >= 6) {
                this.$refs.scroll.openPullUp();
              }
            }, 200);
          } else {
            Toast({
              message: d.msg,
              position: "bottom"
            });
          }
          Indicator.close();
        })
        .catch(e => {
          console.log(e);
        });
    },
    copyBill(item) {
      this.ctrl
        .copyBill({ billId: item._id })
        .then(d => {
          d = d.data;
          if (d.status == 1) {
            this.$router.push({ path: "store/product", query: { id: item.storeId } });
          }
          Indicator.close();
        })
        .catch(e => {
          console.log(e);
        });
    },
    toStore(item) {
      this.$router.push({ path: "store", query: { id: item.storeId } });
    },
    toRate(item) {
      this.$router.push({ path: "rate", query: { billId: item._id } });
    },
    init_() {
      this.list = [];
      this.page = 0;
      this.load();
    }
  },
  components: {
    scroll
  },
  created() {
    this.ctrl = new CartCtrl();
    this.init_();
  }
};
</script>

<style scoped lang="less">
@import "~@/style/base.less";
.bill_list {
  display: flex;
  header {
    position: relative;
    background: linear-gradient(to right, #02aaff, #0387ff);
    height: 188 / @r;
    flex: none;
    h3 {
      font-size: 60 / @r;
      color: #fff;
      padding-top: 96 / @r;
      text-align: center;
    }
  }
  .scroll_wrap {
    flex: 1;
    position: relative;
    .scroll {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      .body {
        padding: 45 / @r;
        h4 {
          font-size: 58 / @r;
          color: #333;
          font-weight: bold;
          padding-bottom: 8 / @r;
        }
        .nodata {
          font-size: 80 / @r;
          text-align: center;
          color: @blue;
          padding-top: 200 / @r;
          p {
            margin: 120 / @r auto;
            display: inline-block;
            padding: 30 / @r 40 / @r;
            border-radius: 8 / @r;
            color: #fff;
            font-size: 50 / @r;
            background-color: #00d762;
          }
        }
        ul {
          li {
            display: flex;
            padding-top: 46 / @r;
            .logo {
              width: 108 / @r;
              height: 108 / @r;
              margin-right: 32 / @r;
              flex: none;
              img {
                height: 100%;
                width: 100%;
                border-radius: 6 / @r;
              }
            }
            .text {
              flex: 1;
              border-bottom: 1px solid #eee;
              .same {
                height: 72 / @r;
                padding-bottom: 6 / @r;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .front {
                  flex: 1;
                  width: 0;
                  display: flex;
                  align-items: center;
                  span {
                    font-size: 46 / @r;
                    color: #333;
                    .text_one_line;
                  }
                  i {
                    flex: none;
                    font-size: 40 / @r;
                    color: #333;
                  }
                }
                em,
                strong {
                  width: 244 / @r;
                  color: #333;
                  font-size: 36 / @r;
                  flex: none;
                  text-align: right;
                }
              }
              .prices {
                .front {
                  span,
                  i {
                    font-size: 40 / @r;
                  }
                }
              }
              .time {
                font-size: 32 / @r;
                color: #999;
                padding-bottom: 40 / @r;
              }
              .btns {
                padding: 20 / @r 0 50 / @r;
                display: flex;
                justify-content: flex-end;
                strong {
                  font-size: 40 / @r;
                  color: #333;
                  padding: 27 / @r 35 / @r;
                  border-radius: 8 / @r;
                  border: 1px solid #e0e0e0;
                  margin-left: 30 / @r;
                  &.orange {
                    border-color: #ffb8ae;
                    color: #ff5339;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>