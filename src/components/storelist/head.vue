<template>
  <div class="wrap">
    <nav>
      <section @click="view_change(1)" :class="{'blue':showSort}">
        <span>{{sortTitle_}}</span>
        <i :class="{'el-icon-arrow-down':!showSort,'el-icon-arrow-up':showSort}"></i>
      </section>
      <section @click="sortByDistance">
        <span>距离最近</span>
      </section>
      <section @click="view_change(3)">
        <div class="vip"></div>
        <span>会员领红包</span>
      </section>
      <section @click="view_change(4)" :class="{'blue':showFilter}">
        <span class="border_left">筛选</span>
        <div :class="{'filter_':true,'active':showFilter}"></div>
      </section>
    </nav>
    <section class="shadow">
      <el-collapse-transition>
        <ul class="sort" v-show="showSort">
          <li v-for="(item,index) in sortKey" :key="index" @click="sortBy(index)" :class="{'blue':item==sortTitle_}">{{item}}</li>
        </ul>
      </el-collapse-transition>
      <el-collapse-transition>
        <div class="filter" v-show="showFilter">
          <div class="filter_title">
            商家服务
            <span>(可多选)</span>
          </div>
          <div class="block_1">
            <ul>
              <li v-for="(item,key) in filter.fw" :key="key" :class="{'active':filterData[key].checked}" @click="setFilterData(key)">
                <img v-lazy="'static/filter/'+key+'.png'" alt="">
                <span>{{item.title}}</span>
              </li>
            </ul>
          </div>
          <div class="filter_title">
            优惠活动
            <span>(单选)</span>
          </div>
          <div class="block_2">
            <ul>
              <li v-for="(item,index) in filter.hd.list" :key="index" :class="{'active':active==item}" @click="setFakeActive({title:item,index:index+1})">
                <span>{{item}}</span>
              </li>
            </ul>
          </div>
          <div class="btn_group">
            <div class="btn" @click="filterClear">清空</div>
            <div class="btn" @click="filterEnter">查看12345个商家</div>
          </div>
        </div>
      </el-collapse-transition>
    </section>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      sortKey: [
        "综合排序",
        "好评优先",
        "销量最高",
        "起送价最低",
        "配送最快",
        "配送费最低",
        "人均从低到高",
        "人均从高到低",
        "距离最近"
      ],
      filter: {
        fw: {
          data_01: {
            title: "蜂鸟专送",
            fakeStatus: false,
            realStatus: false
          },
          data_02: {
            title: "准时达",
            fakeStatus: false,
            realStatus: false
          },
          data_03: {
            title: "品牌商家",
            fakeStatus: false,
            realStatus: false
          },
          data_04: {
            title: "食安保",
            fakeStatus: false,
            realStatus: false
          },
          data_05: {
            title: "新店",
            fakeStatus: false,
            realStatus: false
          },
          data_06: {
            title: "开发票",
            fakeStatus: false,
            realStatus: false
          },
          data_07: {
            title: "接受预定",
            fakeStatus: false,
            realStatus: false
          }
        },
        hd: {
          list: [
            "新用户优惠",
            "特价商品",
            "下单立减",
            "赠品优惠",
            "下单返红包",
            "进店领红包"
          ]
        }
      },
      controller_show: 0
    };
  },
  methods: {
    sortBy(index) {
      this.setSort({ sortTitle: this.sortKey[index], sortIndex: index });
      this.view_change(1);
    },
    sortByDistance() {
      this.setSort({ sortTitle: "距离最近", sortIndex: 8 });
      this.view_change(2);
    },
    view_change(index) {
      this.controller_show = this.controller_show == index ? 0 : index;
      this.$nextTick(() => {
        if (this.controller_show == 1 || this.controller_show == 4) {
          this.$emit("srollTotop", true);
        } else {
          this.$emit("srollTotop", false);
        }
      });
    },
    filterClear() {
      var obj = {};
      for (var attr in this.filter.fw) {
        obj[attr] = {};
        obj[attr].checked = false;
      }
      this.setFilter(obj);
      this.setFakeActive();
    },
    filterEnter() {
      this.writeRealData();
      this.view_change(4);
    },
    ...mapMutations([
      "setSort",
      "setFilter",
      "setFilterData",
      "setFakeActive",
      "writeRealData"
    ])
  },
  computed: {
    showSort() {
      return Boolean(this.controller_show == 1);
    },
    showFilter() {
      return Boolean(this.controller_show == 4);
    },
    ...mapState({
      sortTitle_: state => {
        return state.nav.sortTitle;
      },
      filterData: state => {
        return state.nav.filter;
      },
      active: state => {
        return state.nav.active;
      }
    })
  },
  mounted() {}
};
</script>

<style lang='less' scoped>
@import "~@/style/base.less";
.wrap {
  display: flex;
  flex-direction: column;
  height: 120 / @r;
  position: relative;
  z-index: 99;
}
.blue {
  color: @blue;
}
nav {
  background-color: #fff;
  height: 100%;
  display: flex;
  padding: 0 60 / @r;
  border-bottom: 2 / @r solid #eeeeee;
  justify-content: space-between;
  > section {
    padding: 40 / @r 0;
    text-align: center;
    color: #333333;
    display: flex;
    justify-content: center;
    span {
      font-size: 40 / @r;
      &.border_left {
        border-left: 3 / @r solid #eeeeee;
        padding-left: 50 / @r;
      }
    }
    i {
      font-size: 20 / @r;
      line-height: 40 / @r;
      margin-left: 24 / @r;
    }
    .vip {
      width: 42 / @r;
      height: 40 / @r;
      background: url("~@/assets/index/vip.png") center center no-repeat /
        contain;
    }
    .filter_ {
      width: 44 / @r;
      height: 40 / @r;
      background: url("~@/assets/index/filter.png") center center no-repeat /
        contain;
      &.active {
        background-image: url("~@/assets/index/filter_active.png");
      }
    }
  }
}
.shadow {
  background-color: #fff;
  z-index: 99;
  position: absolute;
  top: 120 / @r;
  left: 0;
  right: 0;
}
.sort {
  background-color: #fff;
  box-shadow: 0 20/@r 20/@r 0 rgba(0,0,0,0.3);
  li {
    line-height: 132 / @r;
    font-size: 40 / @r;
    color: #333;
    padding-left: 60 / @r;
    &.blue {
      color: @blue;
    }
  }
}
.filter {
  background-color: #fff;
  box-shadow: 0 20/@r 20/@r 0 rgba(0,0,0,0.3);
  .filter_title {
    padding: 0 45 / @r;
    line-height: 130 / @r;
    font-size: 40 / @r;
    color: #666;
    span {
      color: #999;
      margin-left: 20 / @r;
    }
  }
  .block_1,
  .block_2 {
    padding: 0 45 / @r;
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        width: 32%;
        background-color: #f9f9f9;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 132 / @r;
        flex-shrink: 0;
        margin: 0.6667%;
        &.active {
          background-color: #addcff;
          color: @blue;
        }
        img {
          width: 42 / @r;
          height: 42 / @r;
          margin-right: 10 / @r;
        }
        span {
          font-size: 40 / @r;
          line-height: 42 / @r;
        }
      }
    }
  }
  .btn_group {
    display: flex;
    padding-top: 80 / @r;
    .btn {
      width: 50%;
      height: 150 / @r;
      border: 2 / @r solid #eeeeee;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 44 / @r;
      color: #ccc;
      &:nth-last-of-type(1) {
        background-color: #2396ff;
        border: none;
        color: #fff;
      }
    }
  }
}
</style>