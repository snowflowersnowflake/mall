<template>
  <div class="store_list">
    <header>
      <div class="back" @click="$router.back(-1)">
        <i class="el-icon-arrow-left"></i>
      </div>
      <h3>{{title}}</h3>
      <router-link tag="div" to="/search" class="search">
        <i class="el-icon-search"></i>
      </router-link>
    </header>
    <store-head ref="storeHead" class="head" @srollTotop="ctrlShadow"></store-head>
    <div class="scroll_wrap">
      <scroll :listenScroll="true" :probeType="3" :pullUpLoad="true" @scrollToEnd="getList" ref="scroll" class="scroll">
        <list :data="storeData"></list>
      </scroll>
    </div>
    <transition name="el-fade-in-linear">
      <div class="shadow" @click="closeShadow" v-show="showShadow"></div>
    </transition>
  </div>
</template>

<script>
import { Toast, Indicator } from "mint-ui";
import { mapState, mapMutations } from "vuex";
import { IndexCtrl } from "@/api/index";
import storeHead from "@/components/storelist/head";
import list from "@/components/storelist/store";
import scroll from "@/components/scroll";
export default {
  data() {
    return {
      storeData: [],
      title: this.$route.query.title,
      showShadow: false,
      page: 0
    };
  },
  components: {
    storeHead,
    list,
    scroll
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
  methods: {
    ctrlShadow(bo) {
      this.showShadow = bo;
    },
    getList() {
      Indicator.open("加载中");
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
              this.$refs.scroll.refresh();
              this.$refs.scroll.finishPullDown();
            }, 100);
          } else {
            let instance = Toast({
              message: "没有更多数据",
              position: "bottom",
              duration: 2000
            });
            this.$refs.scroll.closePullDown();
          }
          Indicator.close();
        })
        .catch(e => {
          Indicator.close();
          console.log(e);
        });
    },
    closeShadow() {
      this.showShadow = false;
      this.$refs.scroll.enable();
      this.$refs.storeHead.controller_show = 0;
    }
  },
  created() {
    this.indexCtrl = new IndexCtrl();
    this.getList();
  },
  watch: {
    sortKey: function(newVal) {
      this.storeData = [];
      this.page = 0;
      this.getList();
      this.$refs.scroll.scrollTo(0, 0, 300);
    },
    filterKey: function(newVal) {
      this.storeData = [];
      this.page = 0;
      this.getList();
      this.$refs.scroll.scrollTo(0, 0, 300);
    }
  }
};
</script>

<style scoped lang="less">
@import "~@/style/base.less";

.store_list {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  header {
    position: relative;
    background: linear-gradient(to right, #02aaff, #0387ff);
    height: 188 / @r;
    .back {
      position: absolute;
      top: 90 / @r;
      left: 60 / @r;
      color: #fff;
      font-size: 56 / @r;
    }
    .search {
      position: absolute;
      top: 90 / @r;
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
  .head {
    flex: none;
  }
  .scroll_wrap {
    flex: auto;
    position: relative;
    .scroll {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      overflow: hidden;
    }
  }
  .shadow {
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    left: 0;
    right: 0;
    top: 188 / @r;
    bottom: 0;
    z-index: 10;
  }
}
</style>