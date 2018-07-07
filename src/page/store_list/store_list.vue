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
    <storelist class="head" @srollTotop="ctrlShadow"></storelist>
    <div class="scroll_wrap">
      <scroll class="scroll">
        <list :data="storeData"></list>
      </scroll>
    </div>
    <transition name="el-fade-in-linear">
      <div class="shadow" v-show="showShadow"></div>
    </transition>
  </div>
</template>

<script>
import storelist from "@/components/storelist/head";
import list from "@/components/storelist/store";
import scroll from "@/components/scroll";
import storeData from "@/mock/shop";
export default {
  data() {
    return {
      storeData,
      title: this.$route.query.title,
      showShadow:false
    };
  },
  components: {
    storelist,
    list,
    scroll
  },
  methods: {
    ctrlShadow(bo) {
      this.showShadow = bo;
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
    top: 188/@r;
    bottom: 0;
    z-index: 10;
  }
}
</style>