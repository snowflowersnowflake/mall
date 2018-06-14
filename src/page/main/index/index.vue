<template>
  <div class="page">
    <header id="fake_head">
      <div class="search_wrap" v-show="showHead">
        <label class="search-box">
          <i class="el-icon-search"></i>
          <input type="text" placeholder="请输入商家、商品名称" v-model="searchKey">
        </label>
      </div>
      <storelist class="store_nav" @srollTotop="srollTotop" @openshadow="openshadow" v-show="showFakeNav" />
    </header>

    <div class="scroll_wrap">
      <scroll class="scroll" :probeType="3" :listenScroll="true" @scroll="_scroll" ref="parentScroll">

        <div class="wrap__">
          <div class="shadow" v-show="showShadow"></div>
          <div ref="index_wrap" class="index_wrap">
            <header>
              <div ref="hideable" class="hideable" :style="{opacity:headOpacity}">
                <section class="hidewrap">
                  <section>
                    <i class="el-icon-location"></i>
                    <span>{{address}}</span>
                  </section>
                  <section>
                    <p>抓龙虾<br>拿红包</p>
                    <img src="/static/index/shrimp.png" alt="">
                  </section>
                </section>
              </div>
              <div class="search_wrap" ref="searchBox">
                <label class="search-box">
                  <i class="el-icon-search"></i>
                  <input type="text" placeholder="请输入商家、商品名称" v-model="searchKey">
                </label>
              </div>
              <ul>
                <li v-for="(item,index) in tags" :key="index">{{item}}</li>
              </ul>
            </header>
            <section class="banner">
              <img src="/static/index/banner.png" alt="">
            </section>
            <classification />
            <blank />
            <advertising />
          </div>
          <div class="storelist_wrap" ref="storelist">
            <storelist class="store_nav" ref="storeNav" @srollTotop="srollTotop" @openshadow="openshadow" />
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
import BScroll from "better-scroll";
import storeData from '@/mock/shop'
export default {
  data() {
    return {
      address: "中建三局-写字楼",
      searchKey: "",
      tags: [
        "麻辣香锅",
        "良品铺子",
        "麦当劳",
        "工作餐减25",
        "虾",
        "沙拉",
        "一点点"
      ],
      showHead: false,
      headOpacity: 1,
      showShadow: false,
      showFakeNav: false,
      storeData
    };
  },
  methods: {
    _scroll(pos) {
      this.showHead = pos.y <= -searchTop;
      if (pos.y < 0) {
        this.headOpacity = 1 - Math.abs(pos.y / searchTop * 1.5);
      }
      if (pos.y < 0 && -pos.y > indexWrapHeight - searchBoxHeight) {
        this.showFakeNav = true;
      } else {
        this.showFakeNav = false;
      }
    },
    srollTotop() {
      if (!this.showFakeNav) {
        setTimeout(() => {
          this.$refs.parentScroll.scrollTo(
            0,
            -(indexWrapHeight - searchBoxHeight),
            500
          );
        }, 33);
      }
    },
    openshadow(isShow) {
      this.showShadow = isShow;
      if (isShow) {
        this.$refs.parentScroll.disable();
      } else {
        this.$refs.parentScroll.enable();
      }
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
    background: linear-gradient(left, #02aaff, #0286ff);

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
        input {
          background-color: transparent;
          border: none;
          font-size: 42 / @r;
          color: #666;
          margin-left: 16 / @r;
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