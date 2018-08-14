<template>
  <div class="all_cart">
    <header>
      <div class="back" @click="$router.back(-1)">
        <i class="el-icon-arrow-left"></i>
      </div>
      <h3>购物车</h3>
      <div class="add" @click="cartAllClear">
        清空
      </div>
    </header>
    <div class="nodata" v-if="!carts.length">
      没有数据
    </div>
    <div class="body">
      <scroll class="scroll" ref="scroll">
        <div class="blank" v-for="(cart,index) in carts" :key="cart.store_id">
          <ul>
            <router-link tag="li" :to="{path:'store',query:{id:cart.store_id}}">
              <div class="left">
                <span>{{cart.storeName}}
                  <i class="el-icon-arrow-right"></i>
                </span>
              </div>

              <div class="right">
                <i class="el-icon-delete" @click.stop="cartClear(cart.store_id,index)"></i>
              </div>
            </router-link>
            <li class="food" v-for="food in cart.cart" :key="food.name">
              <div class="left">
                <div class="img_box">
                  <img :src="food.imgUrl" alt="">
                </div>
                <div class="text">
                  <p>{{food.name}}</p>
                  <em>x{{food.count}}</em>
                </div>
              </div>
              <div class="right">
                <em v-show="food.is_discount">￥{{food.price[0].price}}</em>
                <span>￥{{food.is_discount?food.real_price:food.price[0].price}}</span>
              </div>
            </li>

            <li class="checkout">
              <div class="left">
                <span v-show="cart.mj">已享受满减，优惠
                  <em>{{cart.mj}}</em>元</span>
              </div>
              <div class="right">
                <span>合计￥
                  <em>{{cart.totalPrice}}</em>
                </span>
                <button type="button" @click="checkout(cart)">去结算</button>
              </div>
            </li>
          </ul>
        </div>
      </scroll>
    </div>

  </div>
</template>

<script>
import { CartCtrl } from "@/api/store/cart";
import { Indicator, Toast, MessageBox } from "mint-ui";
import scroll from "@/components/scroll";
export default {
  data() {
    return {
      carts: []
    };
  },
  components: {
    scroll
  },
  methods: {
    cartClear(store_id, index) {
      MessageBox.confirm("确定执行此操作?")
        .then(() => {
          this.ctrl
            .cartClear({ store_id })
            .then(d => {
              d = d.data;
              if (d.status == 1) {
                this.carts.splice(index, 1);
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
        })
        .catch(e => {});
    },
    cartAllClear() {
      MessageBox.confirm("确定执行此操作?")
        .then(() => {
          this.ctrl.cartAllClear().then(d => {
            d = d.data;
            if (d.status == 1) {
              this.carts = [];
            } else {
              Toast({
                message: d.msg,
                position: "bottom"
              });
            }
            Indicator.close();
          });
        })
        .catch(e => {});
    },
    checkout(cart) {
      //console.log(cart)
      this.ctrl
        .checkout({
          store_id: cart.store_id,
          initPrice: cart.initialPrice,
          totalPrice: cart.totalPrice
        })
        .then(d => {
          d = d.data;
          if (d.status == 1) {
            this.$router.push({
              path: "/checkout",
              query: { billId: d.data.billId }
            });
          }
          Indicator.close();
        });
    }
  },
  created() {
    this.ctrl = new CartCtrl();
    this.ctrl
      .getAllCart()
      .then(d => {
        d = d.data;
        if (d.status == 1) {
          if (d.data.length) {
            this.carts = d.data;
          } else {
            Toast({
              message: "购物车内有没有物品",
              position: "bottom"
            });
          }
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
  }
};
</script>

<style scoped lang="less">
@import "~@/style/base.less";
.all_cart {
  background-color: #f5f5f5 !important;
  display: flex;
  flex-direction: column;
  header {
    position: relative;
    background: linear-gradient(to right, #02aaff, #0387ff);
    height: 188 / @r;
    flex: none;
    .back {
      position: absolute;
      top: 90 / @r;
      left: 60 / @r;
      color: #fff;
      font-size: 56 / @r;
    }
    .add {
      position: absolute;
      top: 100 / @r;
      right: 60 / @r;
      color: #fff;
      font-size: 56 / @r;
    }
    h3 {
      font-size: 60 / @r;
      color: #fff;
      padding-top: 96 / @r;
      text-align: center;
    }
  }
  .scroll {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .nodata {
    padding-top: 200 / @r;
    font-size: 60 / @r;
    color: @blue;
    text-align: center;
  }
  .body {
    flex: 1;
    position: relative;
    .blank {
      background-color: #fff;
      margin-bottom: 30 / @r;
      border-bottom: 1px solid #eee;
      border-top: 1px solid #eee;
      ul {
        padding-left: 60 / @r;
        li {
          padding: 30 / @r 60 / @r 30 / @r 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 44 / @r;
          color: #333;
          border-bottom: 1px solid #eee;
          &:last-child {
            border-bottom: none;
          }
          .left {
            flex: 1;
            width: 0;
          }
          .right {
            flex: none;
            i {
              display: block;
              padding: 20 / @r;
              transform: translateX(20 / @r);
              color: #bbbbbb;
            }
          }
          &.food {
            padding: 40 / @r 60 / @r 40 / @r 0;
            align-items: flex-end;
            .left {
              display: flex;
              .img_box {
                height: 135 / @r;
                width: 135 / @r;
                border-radius: 6 / @r;
                border: 2 / @r solid #eee;
                overflow: hidden;
                margin-right: 34 / @r;
                img {
                  height: 100%;
                  width: 100%;
                }
              }
              .text {
                height: 135 / @r;
                flex: 1;
                width: 0;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding: 10 / @r 0;
                p {
                  line-height: 65 / @r;
                  font-weight: bold;
                  .text_one_line;
                }
                em {
                  font-size: 30 / @r;
                  color: #999;
                }
              }
            }
            .right {
              height: 100%;
              display: flex;
              align-items: flex-end;
              margin-left: 40 / @r;
              padding-bottom: 10 / @r;
              em {
                font-size: 30 / @r;
                color: #999;
                text-decoration: line-through;
              }
              span {
                font-size: 36 / @r;
                color: @orange;
                margin-left: 26 / @r;
                font-weight: bold;
              }
            }
          }
          &.checkout {
            padding: 50 / @r 60 / @r 50 / @r 0;
            font-size: 0;
            .left {
              span {
                font-size: 38 / @r;
                color: #666;
                em {
                  color: @orange;
                }
              }
            }
            .right {
              span {
                font-size: 46 / @r;
                color: #666;
                em {
                  color: @orange;
                }
              }
              button {
                border: none;
                background-color: #00d762;
                border-radius: 6 / @r;
                padding: 28 / @r 34 / @r;
                color: #fff;
                font-size: 40 / @r;
                margin-left: 34 / @r;
              }
            }
          }
        }
      }
    }
  }
}
</style>