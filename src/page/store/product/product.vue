<template>
  <div class="store_list_page">
    <div class="store_list_wrap">
      <div class="list_left">
        <scroll class="scroll">
          <ul>
            <li :class="{'active':clacIndex==index}" v-for="(item,index) in data" :key="index" @click="scrollToClass(index)">{{item.title}}</li>
          </ul>
        </scroll>
      </div>
      <div class="list_right">
        <scroll class="scroll" ref="rightScroll" :listenScroll="true" :probeType="3" @scroll="rightScroll">
          <ul class="outer_list" ref="productList">
            <li class="height_hook" v-for="(item,index) in data" :key="index">
              <div class="title">{{item.title}}
                <span>{{item.introduction}}</span>
              </div>
              <ul>
                <li v-for="(product,index2) in item.products" :key="index2">
                  <div class="img_wrap">
                    <img :src="product.imgUrl" alt="">
                    <div v-if="product.is_new" class="new">新品</div>
                    <div v-if="product.is_sign" class="sign">招牌</div>
                  </div>
                  <div class="product_info">
                    <h4>{{product.name}}</h4>
                    <p class="introduction">{{product.introduction}}</p>
                    <div class="sales">
                      月售{{product.sale_month}} {{product.like_?'好评 '+product.like_*100+'%':''}}
                    </div>
                    <div class="discount" v-if="product.is_discount">
                      <span>{{product.discount}}折</span>
                      限量抢购
                    </div>
                    <div class="recommend" v-if="product.is_recommend">老板推荐</div>
                    <div class="price">
                      ￥
                      <strong>{{product.is_discount?product.real_price:product.price[0].price}}</strong>
                      <span v-if="product.is_discount">￥{{product.price[0].price}}</span>
                      <em v-if="product.price.length>1">起</em>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </scroll>
      </div>
    </div>
    <div class="shopCart_wrap">

    </div>

  </div>
</template>

<script>
import json from "@/mock/products";
import scroll from "@/components/scroll";
export default {
  data() {
    return {
      data: json.products_class,
      active_index: 0,
      scrollY: 0,
      height_arr: []
    };
  },
  methods: {
    rightScroll(pos) {
      this.scrollY = Math.abs(Math.round(pos.y));
      this.$emit('scroll',pos)
    },
    scrollToClass(index){
      var el = this.$refs.productList.querySelectorAll('li.height_hook')[index];
      this.$refs.rightScroll.scrollToElement(el,500)
    }
  },
  computed: {
    clacIndex() {
      var arr = this.height_arr,
        scrollY = this.scrollY;
      for (var i = 0; i < arr.length; i++) {
        if (scrollY >= arr[i] && scrollY < arr[i + 1]) {
          return i;
        }
      }
    }
  },
  mounted() {
    var Ali = this.$refs.productList.querySelectorAll("li.height_hook");
    var h = 0;
    this.height_arr.push(h);
    for (let i = 0; i < Ali.length; i++) {
      h += Ali[i].offsetHeight;
      this.height_arr.push(h);
    }
  },
  components: {
    scroll
  }
};
</script>

<style scoped lang='less'>
@import "~@/style/base.less";
.store_list_page {
  height: 100%;
  flex: auto;
  position: relative;
  .scroll {
    height: 100%;
    overflow: hidden;
  }
  .store_list_wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    bottom: 143 / @r;
    display: flex;
    .list_left {
      flex: none;
      height: 100%;
      background-color: #f8f8f8;
      width: 300 / @r;
      ul {
        li {
          height: 145 / @r;
          background-color: #f8f8f8;
          font-size: #666;
          font-size: 38 / @r;
          line-height: 140 / @r;
          text-align: center;
          &.active {
            background-color: #fff;
            color: #333;
          }
        }
      }
    }
    .list_right {
      height: 100%;
      background-color: #fff;
      flex: auto;
      padding: 0 37 / @r;
      .outer_list {
        width: 100%;
        > li {
          &:nth-last-of-type(1) {
            padding-bottom: 88 / @r;
          }
          .title {
            height: 140 / @r;
            font-size: 38 / @r;
            color: #666;
            line-height: 140 / @r;
            span {
              color: #999;
              font-size: 30 / @r;
            }
          }
          ul {
            > li {
              padding-bottom: 88 / @r;
              display: flex;
              &:nth-last-of-type(1) {
                padding-bottom: 0;
              }
              .img_wrap {
                flex: none;
                width: 283 / @r;
                height: 283 / @r;
                border: 1px solid #eee;
                margin-right: 36 / @r;
                position: relative;
                .new,
                .sign {
                  width: 72 / @r;
                  height: 40 / @r;
                  background: linear-gradient(to right, #78d654, #50cb48);
                  color: #fff;
                  line-height: 40 / @r;
                  font-size: 25 / @r;
                  position: absolute;
                  top: -1px;
                  left: -1px;
                  text-align: center;
                }
                .sign {
                  background: linear-gradient(to right, #ff9d6c, #ff6445);
                }
                img {
                  height: 100%;
                  width: 100%;
                }
              }
              .product_info {
                h4 {
                  font-size: 44 / @r;
                  line-height: 54 / @r;
                  color: #333;
                  padding: 6 / @r 0 36 / @r;
                }
                .introduction {
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  font-size: 28 / @r;
                  max-width: 19em;
                  color: #999;
                  padding-bottom: 34 / @r;
                }
                .sales {
                  font-size: 28 / @r;
                  color: #999;
                  padding-bottom: 34 / @r;
                }
                .discount {
                  font-size: 28 / @r;
                  color: #eb6551;
                  padding-bottom: 26 / @r;
                  span {
                    padding: 6 / @r 10 / @r;
                    border: 1px solid #f9d0ca;
                    font-size: 28 / @r;
                    color: #eb6551;
                    border-radius: 4 / @r;
                    margin-right: 10 / @r;
                  }
                }
                .recommend {
                  padding: 6 / @r;
                  border: 1px solid #f9d8ba;
                  color: #ed7e1b;
                  font-size: 28 / @r;
                  margin-bottom: 24 / @r;
                  width: 5em;
                  text-align: center;
                  border-radius: 4 / @r;
                }
                .price {
                  font-size: 28 / @r;
                  color: #ff5339;
                  font-weight: bold;
                  strong {
                    font-size: 40 / @r;
                  }
                  span {
                    color: #999;
                    text-decoration: solid line-through #999;
                  }
                  em {
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .shopCart_wrap {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 143 / @r;
    background-color: #000;
  }
}
</style>