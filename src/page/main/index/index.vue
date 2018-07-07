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
      <scroll class="scroll" :probeType="3" :listenScroll="true" @scroll="_scroll" ref="parentScroll">

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
              <img src="static/index/banner.png" alt="">
            </section>
            <classification />
            <blank />
            <advertising />
          </div>
          <div class="storelist_wrap" ref="storelist">
            <storelist class="store_nav" ref="storeNav" @srollTotop="srollTotop" />
            <lisss class="store_list" :data="storeData" />
          </div>

        </div>
      </scroll>
    </div>

  </div>
</template>

<script>
import scroll from "@/components/scroll";
import classification from "./classification";
import blank from "./blanks";
import advertising from "./advertising";
import storelist from "@/components/storelist/head";
import lisss from "@/components/storelist/store";
import storeData from "@/mock/shop";
import { setStorage, getStorage } from "@/script/storage";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      address: "定位中",
      searchKey: "",
      tags: ["华莱士", "肉夹馍", "汤包", "港饮", "沙拉", "螺蛳粉","麦当劳"],
      showHead: false,
      headOpacity: 1,
      showShadow: false,
      showFakeNav: false,
      storeData
    };
  },
  methods: {
    _scroll(pos) {
      var bo = pos.y <= -searchTop;
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
    srollTotop(isShow) {
      if (!this.showFakeNav) {
        if (isShow) {
          this.$refs.parentScroll.scrollTo(
            0,
            -(indexWrapHeight - searchBoxHeight),
            200
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
    }
  },
  computed: {},
  components: {
    classification,
    blank,
    advertising,
    scroll,
    storelist,
    lisss
  },
  mounted() {
    window.searchTop = this.$refs.hideable.clientHeight;
    window.indexWrapHeight = this.$refs.index_wrap.offsetHeight;
    window.searchBoxHeight = this.$refs.searchBox.offsetHeight;
    window.storreNavHeight = this.$refs.storeNav.offsetHeight;
    window.indexWrapHeight = this.$refs.index_wrap.offsetHeight;
    window.storeNavNote = document.querySelector(".store_nav");
    AMap.plugin("AMap.Geolocation", () => {
      var geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: false,
        // 设置定位超时时间，默认：无穷大
        timeout: 10000
      });
      geolocation.getCurrentPosition();
      AMap.event.addListener(geolocation, "complete", data => {
        this.address = data.addressComponent.building;
        console.log(data);
        setStorage("curLocalPos");
      });
      AMap.event.addListener(geolocation, "error", err => {
        //console.error(err);
        var data = getStorage("curLocalPos");
        if (data) {
          this.address = data.addressComponent.building;
        }
      });
    });
  },
  
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
          align-items: center;
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
    flex-shrink: 1;
    flex-grow: 1;
    overflow: hidden;
    position: relative;
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
}
</style>