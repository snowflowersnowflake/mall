<template>
    <div class="store_list">
        <header>
            <div class="back" @click="$router.back(-1)">
                <i class="el-icon-arrow-left"></i>
            </div>
            <h3>{{title}}</h3>
            <div class="search"><i class="el-icon-search"></i></div>
        </header>
        <storelist class="head"></storelist>
        <div class="scroll_wrap">
            <scroll class="scroll">
                <list :data="storeData"></list>
            </scroll>
        </div>
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
      title:this.$route.query.title
    };
  },
  components: {
    storelist,
    list,
    scroll
  }
};
</script>

<style scoped lang="less">
@import "~@/style/base.less";

.store_list {
  height: 100%;
  display: flex;
  flex-direction: column;
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
        font-size: 60/@r;
        color: #fff;
        padding-top: 96/@r;
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
}
</style>