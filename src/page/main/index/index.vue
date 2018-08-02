<template>
  <div class="page">
    <header id="fake_head" style="position:absolute">
      <el-collapse-transition>
        <div class="search_wrap" v-show="showHead">
          <div class="search-box">
            <i class="el-icon-search"></i>
            <router-link class="input" tag="div" to="search">请输入商家、商品名称</router-link>
          </div>
        </div>
      </el-collapse-transition>
      <storelist ref="fakeNav" class="store_nav" @srollTotop="srollTotop" v-show="showFakeNav" />
    </header>
    <div class="scroll_wrap">
      <scroll class="scroll" @scrollToEnd="loadBottom" :pullUpLoad="true" :pullDownRefresh="true" @pulldown="loadTop" :probeType="3" :listenScroll="true" @scroll="_scroll" ref="parentScroll">
        <div class="wrap__">
          <transition name="el-fade-in-linear">
            <div class="shadow" @click="closeShadow" v-show="showShadow"></div>
          </transition>
          <div ref="index_wrap" class="index_wrap">
            <header>
              <div ref="hideable" class="hideable" :style="{opacity:headOpacity}">
                <section class="hidewrap">
                  <router-link tag="section" to="/chooseaddress">
                    <i class="el-icon-location"></i>
                    <span>{{address}}</span>
                  </router-link>
                  <section>
                    <p>抓龙虾<br>拿红包</p>
                    <img src="static/index/shrimp.png" alt="">
                  </section>
                </section>
              </div>
              <div class="search_wrap" ref="searchBox">
                <label class="search-box">
                  <i class="el-icon-search"></i>
                  <router-link class="input" tag="div" to="search">请输入商家、商品名称</router-link>
                </label>
              </div>
              <ul>
                <router-link tag="li" :to="{path:'/search',query:{key:item}}" v-for="(item,index) in tags" :key="index">{{item}}</router-link>
              </ul>
            </header>
            <section class="banner">
              <img v-lazy="bannerUrl" alt="">
            </section>
            <classification :category="category" />
            <blank :recommend="recommend" />
            <advertising />
          </div>
          <div class="storelist_wrap" ref="storelist">
            <storelist class="store_nav real store_nav_hook" ref="storeNav" @srollTotop="srollTotop" />
            <lisss class="store_list" :data="storeData" />
          </div>

        </div>
      </scroll>
      <transition name="cartin">
        <cart-btn v-show="showCart"></cart-btn>
      </transition>
    </div>

  </div>
</template>

<script>
import { Toast, Indicator } from "mint-ui";
import scroll from "@/components/scroll";
import classification from "./classification";
import blank from "./blanks";
import advertising from "./advertising";
import storelist from "@/components/storelist/head";
import lisss from "@/components/storelist/store";
import { setStorage, getStorage } from "@/script/storage";
import { mapState, mapMutations } from "vuex";
import { IndexCtrl } from "@/api/index";
import cartBtn from "@/components/storelist/cart";
export default {
  data() {
    return {
      address: "定位中",
      searchKey: "",
      tags: ["华莱士", "肉夹馍", "汤包", "港饮", "沙拉", "螺蛳粉", "麦当劳"],
      showHead: false,
      headOpacity: 1,
      showShadow: false,
      showFakeNav: false,
      storeData: [],
      appconfig: {
        category: [],
        banner: ""
      },
      bannerUrl: "",
      category: [],
      recommend: [],
      page: 0,
      posy: "",
      showCart: true,
      timeout: null
    };
  },
  methods: {
    _scroll(pos) {
      this.hideCart()
      var bo = pos.y <= -searchTop;
      this.posy = pos.y;
      if (this.showHead != bo) {
        this.showHead = bo;
      }
      if (pos.y < 0) {
        this.headOpacity = 1 - Math.abs(pos.y / searchTop * 1.5);
      }
      if (pos.y < 0 && -pos.y > indexWrapHeight - searchBoxHeight) {
        this.showFakeNav = true;
      } else {
        this.showFakeNav = false;
      }
    },
    hideCart() {
      this.showCart = false;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.showCart = true;
      }, 500);
    },
    srollTotop(isShow) {
      if (!this.showFakeNav) {
        if (isShow) {
          this.$refs.parentScroll.scrollToElement(
            ".storelist_wrap",
            300,
            0,
            -searchBoxHeight
          );
        }
      }
      this.openshadow(isShow);
    },
    openshadow(isShow) {
      this.showShadow = isShow;
      if (isShow) {
        this.$refs.parentScroll.disable();
      } else {
        this.$refs.parentScroll.enable();
      }
    },
    closeShadow() {
      this.showShadow = false;
      this.$refs.parentScroll.enable();
      this.$refs.storeNav.controller_show = 0;
      this.$refs.fakeNav.controller_show = 0;
      //controller_show
    },
    init_() {
      this.storeData = [];
      this.page = 0;
      this.position();
      this.indexCtrl
        .getAppConfig()
        .then(
          this.$http.spread((d, l) => {
            var d = d.data;
            this.bannerUrl = d.data.banner.imgUrl;
            this.category = d.data.category;
            this.recommend = d.data.recommend;
            var d = l.data;
            if (d.length) {
              this.page++;
              var arr = d.data.map(i => {
                i.show_offer = false;
                return i;
              });
              this.storeData = arr;
            }
            Indicator.close();
          })
        )
        .catch(e => {
          alert(e);
        });
    },
    loadTop() {
      this.$route.query.pos = ''
      this.init_();
    },
    loadBottom() {
      this.getList();
    },
    getList() {
      this.indexCtrl
        .getStoreList({
          page: this.page,
          sortby: this.sortKey,
          offer: this.filterKey
        })
        .then(d => {
          var d = d.data;
          if (d.length) {
            this.page++;
            var arr = d.data.map(i => {
              i.show_offer = false;
              return i;
            });
            this.storeData.push(...arr);
            setTimeout(() => {
              this.$refs.parentScroll.refresh();
              this.$refs.parentScroll.finishPullDown();
            }, 100);
          } else {
            let instance = Toast({
              message: "没有更多数据",
              position: "bottom",
              duration: 2000
            });
            this.$refs.parentScroll.closePullDown();
          }
          Indicator.close();
        })
        .catch(e => {
          Indicator.close();
          console.log(e);
        });
    },
    position() {
      var ads = this.$route.query.pos;
      if (ads) {
        this.address = ads;
      } else {
        var citySearch = "";
        AMap.plugin("AMap.CitySearch", () => {
          citySearch = new AMap.CitySearch();
        });
        AMap.plugin("AMap.Geolocation", () => {
          var geolocation = new AMap.Geolocation({
            // 是否使用高精度定位，默认：true
            enableHighAccuracy: false,
            // 设置定位超时时间，默认：无穷大
            timeout: 3000
          });
          geolocation.getCurrentPosition();
          AMap.event.addListener(geolocation, "complete", data => {
            this.address = data.addressComponent.building;
          });
          AMap.event.addListener(geolocation, "error", err => {
            //console.error(err);
            citySearch.getLocalCity((status, result) => {
              if (status === "complete" && result.info === "OK") {
                // 查询成功，result即为当前所在城市信息
                //console.log(result);
                this.address = result.city;
              }
            });
          });
        });
      }
    }
  },
  computed: {
    ...mapState({
      sortKey: state => {
        return state.nav.sortIndex;
      },
      filterKey: state => {
        return state.nav.activeRealIndex;
      }
    })
  },
  components: {
    classification,
    blank,
    advertising,
    scroll,
    storelist,
    lisss,
    cartBtn
  },
  mounted() {
    window.searchTop = this.$refs.hideable.clientHeight;
    window.indexWrapHeight = this.$refs.index_wrap.offsetHeight;
    window.searchBoxHeight = this.$refs.searchBox.offsetHeight;
  },
  created() {
    this.indexCtrl = new IndexCtrl();
    this.init_();
  },
  watch: {
    sortKey: function(newVal) {
      this.storeData = [];
      this.page = 0;
      this.getList();
      this.$refs.parentScroll.scrollToElement(
        ".storelist_wrap",
        300,
        0,
        -searchBoxHeight
      );
    },
    filterKey: function(newVal) {
      this.storeData = [];
      this.page = 0;
      this.getList();
      this.$refs.parentScroll.scrollToElement(
        ".storelist_wrap",
        300,
        0,
        -searchBoxHeight
      );
    }
  }
};
</script>

<style scoped lang='less'>
@import "~@/style/base.less";

.page {
  display: flex;
  flex-direction: column;
  position: relative;
  #fake_head {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
  }
  header {
    flex-shrink: 0;
    background: linear-gradient(to right, #02aaff, #0387ff);

    .hideable {
      padding-top: 135 / @r;
      opacity: 1;
      overflow: hidden;
      height: 225 / @r;
      .hidewrap {
        display: flex;
        justify-content: space-between;
        padding: 0 42 / @r;
        section {
          font-size: 52 / @r;
          color: #fff;
          line-height: 90 / @r;
          display: flex;
          flex:none;
          align-items: center;
           max-width: 70%;
           .text_one_line;
          span {
            margin-left: 28 / @r;
            position: relative;
            &:after {
              display: block;
              content: "";
              position: absolute;
              width: 0;
              height: 0;
              border: 12 / @r solid transparent;
              border-top-color: #fff;
              right: -52 / @r;
              top: 50%;
            }
          }
          p {
            font-size: 29 / @r;
            line-height: 34 / @r;
            margin-right: 8 / @r;
          }
          img {
            height: 90 / @r;
          }
        }
      }
    }
    .search_wrap {
      padding: 26 / @r 30 / @r;
      .search-box {
        display: flex;
        background-color: #fff;
        border-radius: 3 / @r;
        font-size: 42 / @r;
        height: 108 / @r;
        justify-content: center;
        align-items: center;
        color: #9e9e9e;
        .input {
          background-color: transparent;
          border: none;
          font-size: 42 / @r;
          color: #9e9e9e;
          margin-left: 16 / @r;
          width: 12em;
        }
      }
    }
    ul {
      display: flex;
      justify-content: space-around;
      padding: 0 30 / @r 14 / @r;

      li {
        font-size: 36 / @r;
        color: #fff;
        overflow: hidden;
        line-height: 60 / @r;
      }
    }
  }
  .banner {
    height: 342 / @r;
    img {
      height: 100%;
    }
  }
  .scroll_wrap {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 147 / @r;
    right: 0;
  }
  .scroll {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .shadow {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.3);
      z-index: 90;
    }
  }
  .real {
    z-index: 110;
  }
}
.cartin-enter-active,
.cartin-leave-active {
  transition: 0.5s;
}
.cartin-enter,
.cartin-leave-to {
  transform: translateX(200%);
}
</style>