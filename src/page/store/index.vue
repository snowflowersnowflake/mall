<template>
  <div class="store_page">
    <header>
      <div class="header_wrap">
        <div @click="$router.back()" class="back">
          <i></i>
        </div>
        <div class="search-box">
          <!-- search hook -->
          <transition name="el-fade-in-linear">
            <router-link tag="div" to="/search" v-show="!down" class="search_wrap">
              <i class="el-icon-search"></i>
              <input disabled type="text" placeholder="请输入商家、商品名称">
            </router-link>
          </transition>
        </div>
        <!-- hide_el hook -->
        <el-collapse-transition>
          <div v-show="down" class="hide_el"></div>
        </el-collapse-transition>
      </div>

      <div class="shadow_img" :style="{'background-image':`url(${store_msg.img_url})`}"></div>
    </header>
    <div class="store_msg_wrap">
      <!-- logo hook -->
      <transition name="scale">
        <div v-show="down" class="logo_wrap">
          <img v-lazy="store_msg.img_url" alt="">
        </div>
      </transition>
      <!-- collection hook -->
      <transition name="scale">
        <div class="collection_wrap" v-show="down" @click="collect">
          <div class="collection">
            <i :class="{'el-icon-star-off':!iscollect,'el-icon-star-on':iscollect}"></i>
          </div>
        </div>
      </transition>
      <!-- store_msg hook -->
      <el-collapse-transition>
        <div v-show="down" class="store_msg">
          <h3>{{store_msg.title}}</h3>
          <div class="base_info">
            <span>评价{{store_msg.score}}</span>|
            <span>月售{{store_msg.sales}}</span>|
            <span>蜂鸟快送约{{store_msg.average_time}}分钟</span>
          </div>
          <div class="unfold" :style="{'opacity':outerOpacity}" @click="showDtail=!showDtail">
            <div class="offer_flex_wrap">
              <ul class="offer_list">
                <li>
                  <span :class="first_offer.class">{{first_offer.obj&&first_offer.obj.title}}</span>
                  <p>{{first_offer.obj&&first_offer.obj.text}}</p>
                </li>
              </ul>
              <div class="text">{{first_offer.len}}个优惠
                <i class="el-icon-arrow-down"></i>
              </div>
            </div>
            <p>{{store_msg.notice}}</p>
          </div>
        </div>
      </el-collapse-transition>
    </div>
    <div class="hide_able" :style="{'bottom':detailBottom,'opacity':1-outerOpacity}">
      <div class="title">优惠</div>
      <ul class="offer_list">
        <li v-if="item.status" v-for="(item,key) in store_msg.offer" :key="key">
          <span :class="key">{{item.title}}</span>
          <p>{{item.text}}</p>
        </li>
      </ul>
      <div class="title">服务</div>
      <ul class="offer_list">
        <li>
          <span>拒单赔</span>
          <p>商家拒绝接单赔付3元</p>
        </li>
        <li>
          <span>开发票</span>
          <p>超过40元可以开发票</p>
        </li>
      </ul>
      <div class="title">公告</div>
      <p>{{store_msg.notice}}</p>
      <div class="shrink" @click="showDtail=!showDtail">
        <section></section>
        <i class="el-icon-arrow-up"></i>
      </div>
    </div>
    <div class="store_nav">
      <router-link class="nav_title" replace tag="div" :to="{path:'product',query:{id:$route.query.id}}">
        <span>商品</span>
      </router-link>
      <router-link class="nav_title" replace tag="div" :to="{path:'evaluation',query:{id:$route.query.id}}">
        <span>评价</span>
      </router-link>
      <router-link class="nav_title" replace tag="div" :to="{path:'seller',query:{id:$route.query.id}}">
        <span>商家</span>
      </router-link>
      <div class="hook" :style="{'transform':nav_hook_translate.pos,'width':nav_hook_translate.wid}"></div>
    </div>
    <div class="show_content">
      <keep-alive>
        <transition name="fade" mode="out-in">
          <router-view @scroll="productScroll" ref="child"></router-view>
        </transition>
      </keep-alive>

    </div>

  </div>
</template>

<script>
import arr from "@/mock/shop";
import { mapMutations } from "vuex";
import { setStorage, getStorage } from "@/script/storage";
import { IndexCtrl } from "@/api/index";
import { StoreCtrl } from "@/api/store";
import { Toast, Indicator } from "mint-ui";
export default {
  data() {
    return {
      showDtail: false,
      activeName: "active",
      navIndex: null,
      mult: 1,
      store_msg: {},
      iscollect: false,
      down: true
    };
  },
  methods: {
    productScroll(pos) {
      if (pos.y < 0) {
        if (this.down) {
          this.down = false;
        }
      } else {
        if (!this.donw) {
          this.down = true;
        }
      }
    },
    init__() {
      var id = this.$route.query.id || 1;
      this.$http
        .all([
          this.indexCtrl.getStoreDetail(id),
          this.storeCtrl.getCollections()
        ])
        .then(
          this.$http.spread((d, collection) => {
            var d = d.data;
            if (d.status == 1) {
              this.store_msg = d.data;
              this.setStore_(this.store_msg);
            } else {
              this.$router.back(-1);
            }
            var collection = collection.data;
            if (collection.status == 1) {
              collection.data.forEach(item => {
                if (item._id == id) {
                  this.iscollect = true;
                }
              });
            }
            //this.iscollect = collection.data[this.store_msg._id];
            Indicator.close();
          })
        )
        .catch(e => {
          Indicator.close();
          console.log(e);
        });
    },
    collect() {
      this.storeCtrl
        .editCollections({ store_id: this.store_msg._id })
        .then(d => {
          var d = d.data;
          this.iscollect = d.data[this.store_msg._id];
          Indicator.close();
        })
        .catch(e => {
          console.log(e);
        });
    },
    ...mapMutations(["setStore_"])
  },
  computed: {
    detailBottom() {
      return this.showDtail ? 0 : "100vh";
    },
    outerOpacity() {
      return this.showDtail ? 0 : 1;
    },
    nav_hook_translate() {
      let el = document.querySelectorAll(".store_nav .nav_title");
      if (el[this.navIndex]) {
        let oSpan = el[this.navIndex].getElementsByTagName("span")[0];
        let posLeft = oSpan.offsetLeft;
        let wid = oSpan.offsetWidth + "px";
        return { pos: `translateX(${posLeft}px)`, wid };
      } else {
        return "inherit";
      }
    },
    first_offer() {
      var offer = this.store_msg.offer;
      var re_obj = {
        obj: null,
        len: 0,
        class: ""
      };
      if (offer) {
        for (var attr in offer) {
          if (offer[attr].status) {
            if (re_obj.len === 0) {
              re_obj.obj = offer[attr];
              re_obj.class = attr;
            }
            re_obj.len++;
          }
        }
      }
      return re_obj;
    }
  },
  created() {
    this.indexCtrl = new IndexCtrl();
    this.storeCtrl = new StoreCtrl();
  },
  mounted() {
    switch (this.$route.name) {
      case "product":
        this.navIndex = 0;
        break;
      case "evaluation":
        this.navIndex = 1;
        break;
      case "seller":
        this.navIndex = 2;
        break;
      default:
        this.navIndex = 0;
        break;
    }
    this.init__();
  },
  watch: {
    $route(to, from) {
      switch (to.name) {
        case "Product":
          this.navIndex = 0;
          break;
        case "Evaluation":
          this.navIndex = 1;
          break;
        case "Seller":
          this.navIndex = 2;
          break;
        default:
          this.navIndex = 0;
          break;
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    if (to.query.id) {
      next();
    } else {
      Toast({
        message: "没有传入商店id",
        position: "bottom",
        duration: 2000
      });
      next(vm => {
        vm.$router.replace("/index");
      });
    }
  }
};
</script>

<style scoped lang="less">
@import "~@/style/base.less";
.store_page {
  height: 100%;
  display: flex;
  background-color: #fff;
  flex-direction: column;
  ul.offer_list {
    overflow: hidden;
    transition: 0.5s;
    &.close {
      height: 120 / @r;
    }
    li {
      height: 40 / @r;
      display: flex;
      align-content: center;
      font-size: 28 / @r;
      color: #666;
      overflow: hidden;
      margin-bottom: 25 / @r;
      span {
        width: 72 / @r;
        padding: 0 6 / @r;
        text-align: center;
        height: 40 / @r;
        border-width: 2 / @r;
        border-style: solid;
        line-height: 36 / @r;
        font-size: 28 / @r;
        border-radius: 4 / @r;
        margin-right: 10 / @r;
        border-color: #ececec;
        &.sd {
          color: #768663;
          border-color: #cadebd;
          background-color: #ebfae7;
        }
        &.mj,
        &.hb,
        &.tj,
        &.zp {
          color: #ce7b77;
          border-color: #f4cfcc;
          background-color: #fff4f2;
        }
        &.vip {
          color: #b66d30;
          border-color: #e3d4ae;
          background-color: #fffef7;
        }
      }
      p {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 40 / @r;
        max-width: 800 / @r;
        font-size: 32 / @r;
      }
    }
  }
  header {
    flex: none;
    background-color: #ddd;
    padding-top: 84 / @r;
    position: relative;
    overflow: hidden;
    z-index: 10;
    .header_wrap {
      position: relative;
      height: 100%;
      z-index: 20;
    }
    .shadow_img {
      filter: blur(10px);
      background: url("/static/shops/logo_01.png") no-repeat center center;
      background-size: cover;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 10;
    }
    .back {
      position: absolute;
      width: 60 / @r;
      height: 60 / @r;
      padding: 10 / @r;
      top: 10 / @r;
      left: 50 / @r;
      display: block;
      i {
        display: block;
        width: 100%;
        height: 100%;
        transform: rotate(-45deg);
        border-top: 3 / @r solid #fff;
        border-left: 3 / @r solid #fff;
      }
    }
    .search-box {
      width: 60%;
      margin: 0 auto 20 / @r;
      height: 84 / @r;
      .search_wrap {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #9e9e9e;
        font-size: 42 / @r;
        background-color: #fff;
        border-radius: 3 / @r;
      }
      input {
        background-color: transparent;
        border: none;
        font-size: 42 / @r;
        color: #666;
        margin-left: 16 / @r;
        width: 12em;
      }
    }
    .hide_el {
      height: 140 / @r;
    }
  }
  .store_msg_wrap {
    flex: none;
    position: relative;
    z-index: 10;
    .logo_wrap {
      position: absolute;
      width: 228 / @r;
      height: 228 / @r;
      left: 50%;
      top: -160 / @r;
      margin-left: -114 / @r;
      transform-origin: 50% 80% 0;
      border-radius: 6 / @r;
      transform: scale(1);
      transition: 0.3s;
      &.scale-enter,
      &.scale-leave-to {
        transform: scale(0);
      }
      img {
        height: 100%;
        width: 100%;
      }
    }
    .collection_wrap {
      width: 142 / @r;
      height: 142 / @r;
      padding: 20 / @r;
      position: absolute;
      top: -71 / @r;
      right: 30 / @r;
      transform: scale(1);
      transition: 0.3s;
      .collection {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        box-shadow: 0 0 10 / @r rgba(0, 0, 0, 0.4);
        background-color: #fff;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 60 / @r;
        i {
          font-size: 100%;
          color: #ff4c62;
        }
      }
      &.scale-enter,
      &.scale-leave-to {
        transform: scale(0);
      }
    }

    .store_msg {
      height: 440 / @r;
      overflow: hidden;
      h3 {
        padding-top: 92 / @r;
        font-size: 58 / @r;
        text-align: center;
        color: #333;
        padding-bottom: 46 / @r;
        font-weight: bold;
      }
      .base_info {
        font-size: 32 / @r;
        color: #999;
        text-align: center;
        line-height: 32 / @r;
        flex: none;
        span {
          font-size: 32 / @r;
          color: #666;
          margin: 0 18 / @r;
        }
      }
      .unfold {
        transition: 1s;
        padding: 50 / @r 110 / @r;
        .offer_flex_wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .text {
            width: 140 / @r;
            text-align: right;
            color: #9b9b9b;
            font-size: 26 / @r;
          }
          .offer_list {
            li {
              margin-bottom: 0;
              font-size: 24 / @r;
            }
          }
        }
        > p {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 30 / @r;
          color: #9b9b9b;
          padding: 24 / @r 0;
        }
      }
    }
  }
  .hide_able {
    padding: 0 45 / @r;
    position: absolute;
    background-color: #fff;
    top: 670 / @r;
    width: 100%;
    bottom: 0 / @r;
    left: 0;
    overflow: hidden;
    transition: 1s;
    z-index: 50;
    .title {
      font-size: 42 / @r;
      color: #333;
      padding: 30 / @r 0 35 / @r;
      font-weight: bold;
      margin-left: 0;
    }

    > p {
      font-size: 32 / @r;
      color: #666;
      line-height: 42 / @r;
    }
    .shrink {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 200 / @r;
      > section {
        height: 100%;
        background: linear-gradient(to bottom, #fff 30%, #fff6f5 50%, #fde9e3);
        filter: blur(10px);
      }
      i {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 100 / @r;
        color: #ccc;
      }
    }
  }
  .store_nav {
    flex: none;
    height: 100 / @r;
    padding: 0 48 / @r;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: flex-start;
    position: relative;
    .nav_title {
      height: 100%;
      flex: auto;
      line-height: 90 / @r;
      text-align: center;
      font-size: 44 / @r;
      color: #666;
      font-weight: bold;
      &.router-link-active {
        color: #333;
      }
    }
    .hook {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 4 / @r;
      background-color: @blue;
      width: 60 / @r;
      transition: 0.5s;
    }
  }
  .show_content {
    flex: auto;
    display: flex;
    flex-direction: column;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>