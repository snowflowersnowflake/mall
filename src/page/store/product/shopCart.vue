<template>
  <div class="bottomCart">
    <div class="normal" @click="openShadow">
      <div class="img_box">
        <img src="static/index/cart.png" v-show="!cartToltalCount" alt="">
        <img src="static/index/cart-active.png" v-show="cartToltalCount" alt="">
        <div class="dot" v-show="cartToltalCount">
          <span>{{cartToltalCount}}</span>
        </div>

      </div>
      <div class="text">
        <section>￥{{totalPrice}}
          <span v-show="initialPrice>totalPrice">￥{{initialPrice}}</span>
        </section>
        <p>令需配送费{{store_msg.transport_price}}元</p>
      </div>
      <div :class="{'checkout':true,'active':initialPrice>=store_msg.start_price}">
        {{checkout_}}
      </div>
    </div>
    <div class="ball_wrap" ref="ball_wrap">
      <transition v-for="(item,index) in balls" :key="index" @before-enter="beforEnter" @enter="enter" @after-enter="afterEnter">
        <div class="ball" v-show="item.show">
          <div class="inner"></div>
        </div>
      </transition>
    </div>
    <div class="mj_block" ref="mj_block" v-html="mjTip" v-if="mj"></div>
    <transition name="up">
      <div class="cart_list" ref="cart_list" v-show="showShadow">
        <div class="mj_block_fake" v-if="mj" v-html="mjTip"></div>
        <div class="title">
          <div>已选商品</div>
          <section @click="cart_clear">
            <i class="el-icon-delete"></i>
            清空
          </section>
        </div>
        <scroll class="scroll" ref="scroll">
          <ul>
            <li v-for="(item,index) in foods" :key="index">
              <h3>{{item.name}}</h3>
              <operating :food="item"></operating>
            </li>
          </ul>
        </scroll>
      </div>
    </transition>
    <transition name="fade">
      <div class="shadow" @click="showShadow=!showShadow" v-show="showShadow"></div>
    </transition>

  </div>
</template>

<script>
import scroll from "@/components/scroll";
import operating from "./cartOperating";
export default {
  props: {
    foods: {
      type: Array,
      default: []
    },
    store_msg: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: [],
      ballIndex: 0,
      showShadow: false
    };
  },
  methods: {
    ballDown(el) {
      for (let i = 0; i < this.balls.length; i++) {
        this.ballIndex = (this.ballIndex + 1) % this.balls.length;
        let ball = this.balls[this.ballIndex];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropBalls.push(ball);
          return;
        }
      }
    },
    beforEnter(el) {
      for (let i = 0; i < this.balls.length; i++) {
        var ball = this.balls[i];
        if (ball.show) {
          var startRect = ball.el.getBoundingClientRect();
          var finRect = this.$refs.ball_wrap.getBoundingClientRect();
          var x = startRect.x - finRect.x;
          var y = startRect.y - finRect.y;
          var inner = el.querySelector(".inner");
          el.style.transform = el.style.WebkitTransform = `translate3d(${x}px,0,0)`;
          inner.style.transform = inner.style.WebkitTransform = `translate3d(0,${y}px,0)`;
        }
      }
    },
    enter(el, done) {
      /* el.offsetHeight; 完成浏览器重绘 不然动画无法实现 */
      var rf = el.offsetHeight;

      this.$nextTick(() => {
        el.style.transform = el.style.WebkitTransform = "translate3d(0,0,0)";
        var inner = el.querySelector(".inner");
        inner.style.transform = inner.style.WebkitTransform =
          "translate3d(0,0,0)";
        var timeString = window.getComputedStyle(el, null)[
          "transition-duration"
        ];
        var time = parseFloat(timeString) * 1000;
        el.addEventListener("transitionend", done);
      });
    },
    afterEnter(el) {
      var ball = this.dropBalls.shift();
      if (ball) {
        ball.show = false;
      }
    },
    cart_clear() {
      this.foods.forEach(item => {
        item.cartCount = 0;
      });
      this.showShadow = false;
    },
    openShadow() {
      if (this.foods.length) {
        this.showShadow = !this.showShadow;
      }
    },
    cartChange() {
      var obj = {
        proto: this.initialPrice,
        total: this.totalPrice
      }
      this.$emit('cartChange',obj)
    }
  },
  components: {
    scroll,
    operating
  },
  computed: {
    cartToltalCount() {
      let count = 0;
      this.foods.forEach(item => {
        count += item.cartCount;
      });
      return count;
    },
    initialPrice() {
      var price = 0;
      if (this.foods.length) {
        this.foods.forEach(item => {
          price += item.cartCount * item.price[0].price;
        });
      }
      price = Math.round(price * 100) / 100;
      return price;
    },
    totalPrice() {
      var price = this.initialPrice;
      //店铺是否有满减活动
      if (this.mj) {
        //购物车有没有折扣商品
        var has_discount = this.foods.some(item => {
          return item.is_discount;
        });

        if (!has_discount) {
          var satisfy = 0;
          var minus = 0;
          this.mj.forEach(item => {
            if (price >= item.satisfy) {
              satisfy = item.satisfy;
              minus = item.minus;
            } else {
              // 距离 满item.satisfy减item.minus
              // 还差 item.satisfy-price 元 可以减 item.minus
            }
          });
          //已满 satisfy 元 减 minus元
          price -= minus;
        }
        //有折扣商品不参与满减直接跳出
        price = Math.round(price * 100) / 100;
        return price;
      }
    },
    checkout_() {
      if (this.initialPrice == 0) {
        return `￥${this.store_msg.start_price}起送`;
      } else if (this.store_msg.start_price > this.initialPrice) {
        var price =
          Math.round((this.store_msg.start_price - this.initialPrice) * 100) /
          100;
        return `还差￥${price}起送`;
      } else {
        return "去结算";
      }
    },
    mj() {
      if (
        this.store_msg.offer &&
        this.store_msg.offer.mj &&
        this.store_msg.offer.mj.status
      ) {
        var arr = [];
        var text = this.store_msg.offer.mj.text;
        if (text.indexOf("，") > -1) {
          arr = text.split("，");
        } else if (text.indexOf(",") > -1) {
          arr = text.split(",");
        } else {
          arr.push(text);
        }
        var mj_arr = arr.map(item => {
          let obj = {};
          var b = item.split("减");
          obj.minus = b[1];
          obj.satisfy = b[0].split("满")[1];
          return obj;
        });
        return mj_arr;
      } else {
        return false;
      }
    },
    mjTip() {
      var has_discount = this.foods.some(item => {
        return item.is_discount;
      });
      if (!has_discount) {
        var price = this.initialPrice;
        if (this.foods.length && this.mj) {
          var satisfy = 0;
          var minus = 0;
          var next_satisfy = 0;
          var next_minus = 0;
          var arr = this.mj;
          for (let i = 0; i < arr.length; i++) {
            let item = arr[i];
            if (price >= item.satisfy) {
              satisfy = item.satisfy;
              minus = item.minus;
            } else {
              // 距离 满item.satisfy减item.minus
              // 还差 item.satisfy-price 元 可以减 item.minus
              next_minus = arr[i].minus;
              next_satisfy = arr[i].satisfy;
              break;
            }
          }
          if (price >= arr[arr.length - 1].satisfy) {
            return `已减￥${minus}`;
          } else {
            var x = Math.round((next_satisfy - price) * 100) / 100;
            return `已减￥${minus},再买<span style="color:#ff5339">￥${x}</span>可减￥${next_minus}`;
          }
        } else {
          return this.store_msg.offer && this.store_msg.offer.mj.text;
        }
      } else {
        return "购物车内有折扣商品,不能参与满减活动";
      }
    }
  },
  watch: {
    foods:function(newVal){
      this.cartChange()
    }
  }
};
</script>

<style scoped lang="less">
@import "~@/style/base.less";
.bottomCart {
  height: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  .normal {
    background-color: #595959;
    height: 100%;
    position: relative;
    z-index: 40;
    .img_box {
      position: absolute;
      left: 46 / @r;
      bottom: 16 / @r;
      width: 174 / @r;
      .dot {
        position: absolute;
        top: -12 / @r;
        right: -30 / @r;
        width: 52 / @r;
        height: 52 / @r;
        background: linear-gradient(to right, #fe9b6b, #ff553b);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        span {
          font-size: 28 / @r;
          color: #fff;
        }
      }
      img {
        width: 100%;
      }
    }
    .text {
      padding-left: 249 / @r;
      section {
        font-size: 41 / @r;
        padding: 34 / @r 0 14 / @r;
        color: #fff;
        span {
          color: #999;
          text-decoration: line-through;
        }
      }
      p {
        font-size: 28 / @r;
        color: #919190;
      }
    }
    .checkout {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 330 / @r;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #6a6a6a;
      color: #b4b4b4;
      font-size: 44 / @r;
      &.active {
        background-color: #00d762;
        color: #fff;
      }
    }
  }
  .ball_wrap {
    position: absolute;
    bottom: 120 / @r;
    left: 110 / @r;
    height: 30 / @r;
    width: 30 / @r;
    //background-color: red;
    z-index: 10;
    .ball {
      position: fixed;
      transition: all 0.3s linear;
      .inner {
        transition: all 0.3s cubic-bezier(0.26, -0.62, 0.92, 0.04);
        height: 30 / @r;
        width: 30 / @r;
        border-radius: 50%;
        background-color: @blue;
      }
    }
  }

  .mj_block {
    background-color: #fffad8;
    position: absolute;
    bottom: 100%;
    left: 0;
    right: 0;
    z-index: 30;
    line-height: 80 / @r;
    color: #333;
    font-size: 34 / @r;
    text-align: center;
    border-top: 2 / @r solid #f9e8a3;
    border-bottom: 2 / @r solid #f9e8a3;
  }
  .cart_list {
    @a: 1.217391rem;
    position: absolute;
    bottom: 100%;
    left: 0;
    right: 0;
    background-color: #ececee;
    z-index: 30;
    padding-bottom: 85 / @r;
    transform: translate3d(0, 0, 0);
    transition: 0.3s linear;
    &.up-enter, &.up-leave-to /* .fade-leave-active below version 2.1.8 */ {
      bottom: calc(100% + @a);
      transform: translate3d(0, 100%, 0);
    }
    .mj_block_fake {
      background-color: #fffad8;
      line-height: 80 / @r;
      color: #333;
      font-size: 34 / @r;
      text-align: center;
      border-top: 2 / @r solid #f9e8a3;
      border-bottom: 2 / @r solid #f9e8a3;
    }
    .title {
      padding: 60 / @r;
      display: flex;
      justify-content: space-between;
      height: 120 / @r;
      align-items: center;
      div {
        color: #666;
        font-size: 46 / @r;
      }
      section {
        font-size: 38 / @r;
        line-height: 100 / @r;
        color: #666;
        i {
          color: #bbb;
        }
      }
    }
    .scroll_wrap {
      max-height: 1120 / @r;
    }
    .scroll {
      max-height: 1120 / @r;
      overflow: hidden;
    }
    ul {
      background-color: #fff;
      padding: 0 60 / @r;

      li {
        height: 160 / @r;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &:nth-last-of-type(1) {
          border-bottom: none;
        }
        h3 {
          font-size: 45 / @r;
          color: #000;
        }
        .operating {
          display: flex;
          justify-content: space-between;
          width: 216 / @r;
          .cut,
          .add {
            height: 66 / @r;
            width: 66 / @r;
            border: 2 / @r solid @blue;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 36 / @r;
            color: @blue;
            font-weight: bold;
            background-color: #fff;
          }
          .add {
            color: #fff;
            background-color: @blue;
          }
          span {
            font-size: 32 / @r;
            color: #666;
            line-height: 66 / @r;
          }
        }
      }
    }
  }

  .shadow {
    position: relative;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    bottom: 100%;
    left: 0;
    right: 0;
    z-index: 20;
    transition: 0.3s;
    opacity: 1;
    &.fade-enter, &.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
  }
}
</style>