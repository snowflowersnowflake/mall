<template>
  <div class="store_wrap">
    <router-link v-if="refeash" tag="div" :to="{path:'/store/product',query:{id:item._id}}" class="shop" v-for="(item,index) in dd" :key="index">
      <div class="logo">
        <img v-lazy="item.img_url" :key="item.img_url" alt="">
      </div>
      <div class="shop-info">
        <div class="title-line">
          <h3>{{item.title}}</h3>
        </div>
        <div class="score-line">
          <div class="score">
            <el-rate v-model="item.score" disabled show-score text-color="#ff9900z" score-template="{value}">
            </el-rate>
            <span class="sale">月售{{item.sales}}</span>
          </div>

          <div class="transport-tags">
            <span>准时达</span>
            <span class="gradient">蜂鸟专送</span>
          </div>
        </div>
        <div class="price-line">
          <span>
            <em>起送￥{{item.start_price}}</em> |
            <em>配送 ￥{{item.transport_price}}</em>
          </span>
          <span>
            <em>{{item.average_time}}分钟</em> |
            <em>{{distance_format(item.distance)}}</em>
          </span>
        </div>
        <div class="shop-tag">
          <span>{{item.tag}}</span>
        </div>
        <div class="offer">
          <div v-show="offer_fillter(item.offer).length_>2" class="show" @click.prevent="offer_switch(item)">
            <i :class="{'el-icon-arrow-down':!item.show_offer,'el-icon-arrow-up':item.show_offer}"></i>
          </div>
          <ul :class="{'close':!item.show_offer}">
            <li v-for="(item_offer,key) in offer_fillter(item.offer).data" :key="key">
              <span :class="key">{{item_offer.title}}</span>
              <p>{{item_offer.text}}</p>
            </li>
          </ul>
        </div>

      </div>
    </router-link>
    
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      refeash: true,
      dd:[]
    };
  },
  methods: {
    offer_switch(item) {
      item.show_offer = !item.show_offer;
    },
    distance_format(number) {
      if (number > 1000) {
        return (number / 1000).toFixed(2) + "km";
      } else {
        return number + "m";
      }
    },
    offer_fillter(obj) {
      var o = {};
      for (var attr in obj) {
        if (obj[attr].status) {
          o[attr] = obj[attr];
        }
      }
      var len = Object.keys(o).length;
      return {
        data: o,
        length_: len
      };
    }
  },
  computed: {
    completeData() {
      //先筛选
      
      var arr = this.data.filter((item,i) => {
        switch (Number(this.activeRealIndex)) {
          case 1:
            return item.offer.sd;
          case 2:
            return item.offer.tj;
          case 3:
            return item.offer.mj;
          case 4:
            return item.offer.zp;
          case 5:
            return item.offer.hb;
          case 6:
            return item.offer.vip;
          default:
            return true;
        }
      });

      //再排序
      //return this.data;
      if(this.sortIndex){
      arr.sort((a, b) => {
        var attr;
        switch (Number(this.sortIndex)) {
          case 1:
            attr = "score";
            break;
          case 2:
            attr = "sales";
            break;
          case 3:
            attr = "start_price";
            return a[attr] > b[attr];
            break;
          case 4:
            attr = "average_time";
            return a[attr] > b[attr];
            break;
          case 5:
            attr = "transport_price";
            return a[attr] > b[attr];
            break;
          case 6:
            attr = "average_price";
            break;
          case 7:
            attr = (-average_price).toString;
            break;
          case 8:
            attr = "distance";
            return a[attr] > b[attr];
            break;
          default:
            return false
        }
        return a[attr] < b[attr];
      });
      }
      return arr || [];
    },
    ...mapState({
      activeRealIndex: state => {
        return state.nav.activeRealIndex;
      },
      sortIndex: state => {
        return state.nav.sortIndex;
      }
    })
  },
  watch: {
    data: function(newVal) {
      this.dd = newVal
    }
  }
};
</script>

<style lang="less">
@import "~@/style/base.less";
.pb1000 {
  padding-bottom: 1400 / @r !important;
}
.store_wrap {
  padding: 0 30 / @r;
  min-height: 100%;
  position: relative;
}
.shop {
  display: flex;
  padding: 40 / @r 0;
  border-bottom: 2 / @r solid #eeeeee;
  .logo {
    width: 180 / @r;
    height: 180 / @r;
    display: flex;
    justify-content: center;
    overflow: hidden;
    border-radius: 4 / @r;
    margin-right: 30 / @r;
    flex-shrink: 0;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .shop-info {
    flex: 1;
    flex-shrink: 0;
    .title-line {
      padding-bottom: 25 / @r;
      h3 {
        font-size: 50 / @r;
        color: #333;
        font-weight: bold;
      }
    }
    .score-line {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 25 / @r;
      .score {
        display: flex;
        align-items: center;
        color: #666;
        .el-rate {
          height: auto;
          display: flex;
          height: 33 / @r;
          align-items: center;
          > span {
            height: 100%;
            line-height: 33 / @r;
            i {
              line-height: 33 / @r;
            }
          }
          .el-rate__icon {
            font-size: 22 / @r;
            margin-right: 6 / @r;
          }
          .el-rate__text {
            font-size: 25 / @r;
          }
        }
        .sale {
          font-size: 32 / @r;
          margin-left: 22 / @r;
        }
      }
      .transport-tags {
        font-size: 25 / @r;
        display: flex;
        span {
          padding: 0 6 / @r;
          margin-left: 6 / @r;
          border: 2 / @r solid #91caff;
          border-radius: 4 / @r;
          color: #2395ff;
          font-size: 25 / @r;
          line-height: 36 / @r;
          height: 40 / @r;
          &.gradient {
            border: none;
            color: #fff;
            line-height: 40 / @r;
            background: linear-gradient(to right, #02aaff, #0387ff);
          }
        }
      }
    }
    .price-line {
      display: flex;
      justify-content: space-between;
      padding-bottom: 25 / @r;
      span {
        font-size: 30 / @r;
        color: #dedede;
        em {
          color: #666;
        }
      }
    }
    .shop-tag {
      height: 45 / @r;
      display: flex;
      margin-bottom: 25 / @r;
      span {
        height: 45 / @r;
        padding: 0 14 / @r;
        border: 2 / @r solid #ddd;
        border-radius: 4 / @r;
        font-size: 28 / @r;
        color: #666;
        line-height: 36 / @r;
      }
    }
    .offer {
      position: relative;
      .show {
        position: absolute;
        right: 0;
        top: -20 / @r;
        font-size: 30 / @r;
        padding: 20 / @r;
      }
      ul {
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
            text-align: center;
            height: 40 / @r;
            border-width: 2 / @r;
            border-style: solid;
            line-height: 36 / @r;
            font-size: 28 / @r;
            border-radius: 4 / @r;
            margin-right: 10 / @r;
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
          }
        }
      }
    }
  }
}

</style>