<template>
  <div class="collection_page">
    <header>
      <div class="back" @click="$router.back(-1)">
        <i class="el-icon-arrow-left"></i>
      </div>
      <h3>我的收藏</h3>
    </header>
    <div class="content_wrap">
      <div class="nodata" v-if="!colData.length">
        <i class="el-icon-warning"></i>没有收藏</div>
      <div class="scroll_wrap" v-else>
        <scroll>
          <ul>
            <router-link tag="li" :to="{path:'/store/product',query:{id:item._id}}" class="shop" v-for="(item,index) in colData" :key="index">
              <div class="logo">
                <img v-lazy="item.img_url" alt="">
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
              </div>
            </router-link>
          </ul>
        </scroll>
      </div>
    </div>
  </div>
</template>

<script>
import { getStorage } from "@/script/storage";
import scroll from "@/components/scroll";
import { Indicator } from "mint-ui";
import { StoreCtrl } from "@/api/store";
import { Store } from "vuex";
export default {
  data() {
    return {
      colData:[]
    };
  },
  methods: {
    distance_format(number) {
      if (number > 1000) {
        return (number / 1000).toFixed(2) + "km";
      } else {
        return number + "m";
      }
    },
    init_() {
      this.ctrl
        .getCollections()
        .then(d => {
          console.log(d)
          var d= d.data;
          if(d.status==1){
            this.colData = d.data
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  components: {
    scroll
  },
  created() {
    this.ctrl = new StoreCtrl();
  },
  mounted(){
    this.init_()
  }
};
</script>

<style lang='less'>
@import "~@/style/base.less";
.collection_page {
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
      font-size: 60 / @r;
      color: #fff;
      padding-top: 96 / @r;
      text-align: center;
    }
  }
  .content_wrap {
    flex: auto;
    position: relative;
    .nodata {
      text-align: center;
      padding-top: 200 / @r;
      font-size: 60 / @r;
      color: @blue;
    }
    .scroll_wrap {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      overflow: hidden;
      ul {
        padding: 0 30 / @r;
      }
    }
  }
  .shop {
    display: flex;
    padding: 45 / @r 0 33 / @r;
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
    }
  }
}
</style>