<template>
  <div class="search_page">
    <div class="search_head">
      <div class="back" v-show="search_complete" @click="$router.back(-1)">
        <i class="el-icon-arrow-left"></i>
      </div>
      <label class="search_box">
        <i class="el-icon-search"></i>
        <input type="search" mozactionhint="搜索" placeholder="输入商家、商品名称" v-model="search_key" @keydown.enter="search" ref="inp">
      </label>
      <div v-show="!search_complete" class="cancel" @click="$router.back(-1)">取消</div>
    </div>
    <div class="search_complete" v-show="search_complete">
      <storelist @srollTotop="ctrlShadow"></storelist>
      <div class="scroll_wrap">
        <div v-show="!filterData.length" class="nodata">
          <i class="el-icon-warning"></i>没有结果</div>
        <scroll ref="scroll" :probeType="1" :pullUpLoad="filterData>4" @scrollToEnd="search">
          <lisss :data="filterData"></lisss>
        </scroll>
      </div>
      <transition name="el-fade-in-linear">
        <div class="shadow" v-show="showShadow"></div>
      </transition>

    </div>
    <div v-show="!search_complete" class="tag_area">
      <div class="history block" v-show="tag.local.length">
        <div class="title">
          <h3>历史搜索</h3>
          <i class="el-icon-delete" @click="rmLocalSearch"></i>
        </div>
        <div class="tags">
          <section v-for="(item,index) in tag.local" :key="index" @click="fastSearch(item)">
            {{item}}
          </section>
        </div>
      </div>
      <div class="hot block">
        <div class="title">
          <h3>热门搜索</h3>
        </div>
        <div class="tags">
          <section v-for="(item,index) in tag.hot" :key="index" @click="fastSearch(item)">
            {{item}}
          </section>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { setStorage, getStorage, rmStorage } from "@/script/storage";
import storelist from "@/components/storelist/head";
import lisss from "@/components/storelist/store";
import scroll from "@/components/scroll";
import { StoreCtrl } from "@/api/store";
import { mapState, mapMutations } from "vuex";
import { Toast, MessageBox, Indicator } from "mint-ui";
export default {
  data() {
    return {
      tag: {
        local: Array.from(new Set(getStorage("localSearch"))) || [],
        hot: ["华莱士", "肉夹馍", "汤包", "港饮", "沙拉", "螺蛳粉"]
      },
      search_key: "",
      search_complete: false,
      filterData: [],
      showShadow: false,
      ctrl: null,
      page: 0
    };
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
    search() {
      this.$refs.inp.blur();
      //先发送请求
      this.ctrl
        .searchStore({
          searchKey: this.search_key,
          page: this.page,
          sortby: this.sortKey,
          offer: this.filterKey
        })
        .then(d => {
          var d = d.data;
          if (d.status == 1) {
            this.search_complete = true;
            if (d.data.length) {
              this.filterData.push(...d.data);
              this.page++;
              setTimeout(() => {
                this.$refs.scroll.refresh();
              }, 100);
            } else {
              Toast({
                message: "没有数据",
                position: "bottom",
                duration: 2000
              });
            }
            var arr = Array.from(new Set(this.tag.local));
            for (let i = 0; i < arr.length; i++) {
              if (arr[i] == this.search_key) {
                arr.splice(i, 1);
                i--;
              }
            }
            arr.unshift(this.search_key);
            this.tag.local = arr;
            setStorage("localSearch", this.tag.local);
          } else if (d.status == 0) {
            Toast({
              message: "请输入关键字",
              position: "bottom",
              duration: 2000
            });
          }
          Indicator.close();
        })
        .catch(e => {
          console.log(e);
          Indicator.close();
        });
    },
    rmLocalSearch() {
      MessageBox.confirm("确认删除全部历史记录?", "确认")
        .then(d => {
          rmStorage("localSearch");
          this.tag.local = [];
        })
        .catch(e => {
          console.log("取消");
        });
    },
    fastSearch(key) {
      this.search_key = key;
      this.search();
    },
    ctrlShadow(bo) {
      this.showShadow = bo;
    },
    ...mapMutations(["resetFilterIndex"])
  },
  components: {
    storelist,
    lisss,
    scroll
  },
  created() {
    this.ctrl = new StoreCtrl();
  },
  mounted() {
    if (this.$route.query && this.$route.query.key) {
      this.search_key = this.$route.query.key;
      this.search();
    }
  },
  watch: {
    sortKey(newVal) {
      this.filterData = [];
      this.page = 0;
      this.search();
      this.$refs.scroll.scrollTo(0, 0, 300);
    },
    filterKey(newVal) {
      this.filterData = [];
      this.page = 0;
      this.search();
      this.$refs.scroll.scrollTo(0, 0, 300);
    },
    search_key(newVal) {
      //alert(123)
      this.page = 0;
      this.resetFilterIndex();
    }
  }
};
</script>

<style lang='less' scoped>
@import "~@/style/base.less";
.search_page {
  background-color: #fff;
}
.search_head {
  height: 194 / @r;
  padding: 84 / @r 30 / @r 20 / @r;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .back {
    font-size: 60 / @r;
    color: #666;
    margin-right: 60 / @r;
  }
  .search_box {
    height: 100%;
    width: 80%;
    flex: 1;
    background-color: #f5f5f5;
    border-radius: 3 / @r;
    font-size: 42 / @r;
    display: flex;
    align-items: center;
    transition: 0.5s;
    i {
      color: #989898;
      margin: 0 34 / @r;
      flex: none;
    }
    input {
      background-color: initial;
      border: none;
      color: #333;
      flex: 1;
    }
    input::-webkit-input-placeholder {
      font-size: 42 / @r;
    }
  }

  .cancel {
    font-size: 42 / @r;
    color: #333;
    padding: 18 / @r 28 / @r;
    flex: none;
    margin-left: 30 / @r;
  }
}
.search_complete {
  //@a: 194 / @r;
  @a: 2.812rem;
  height: calc(100% - @a);
  position: relative;
  .scroll_wrap {
    @h: 1.74rem;
    height: calc(100% - @h);
    overflow: hidden;
    .nodata {
      padding-top: 200 / @r;
      text-align: center;
      color: @blue;
      font-size: 60 / @r;
      font-weight: bold;
    }
  }
  .shadow {
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 10;
  }
}
.tag_area {
  padding: 0 45 / @r;
  .block {
    .title {
      padding: 26 / @r 0 15 / @r;
      display: flex;
      height: 130 / @r;
      justify-content: space-between;
      align-items: center;
      h3 {
        padding: 0 16 / @r;
        font-size: 40 / @r;
        font-weight: bold;
        color: #333;
      }
      i {
        font-size: 38 / @r;
        padding: 5 / @r;
        color: #999;
      }
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      section {
        margin: 0 30 / @r 30 / @r 0;
        font-size: 34 / @r;
        color: #666;
        padding: 32 / @r 50 / @r;
        background-color: #f5f5f5;
        border-radius: 10 / @r;
      }
    }
  }
}
</style>