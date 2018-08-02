<template>
  <div class="evaluation___">
    <div class="wrap_2">
      <scroll ref="scroll" :listenScroll="true" :probeType="2" @scroll="emitScroll" >
        <div class="evaluation_read_wrap">
          <div class="overview">
            <div class="left">
              <div class="main_core">{{store.score}}</div>
              <p>综合评分</p>
              <section>高于周边商家59.6%</section>
            </div>
            <div class="right">
              <ul>
                <li>
                  <span class="title">服务态度</span>
                  <el-rate v-model="core.fw" disabled show-score text-color="#ff5339" score-template="{value}">
                  </el-rate>
                </li>
                <li>
                  <span class="title">商品评分</span>
                  <el-rate v-model="core.sp" disabled show-score text-color="#ff5339" score-template="{value}">
                  </el-rate>
                </li>
                <li>
                  <span class="title">送达时间</span>
                  <div class="time">25分钟</div>
                </li>
              </ul>
            </div>
          </div>
          <div class="eval_bottom">
            <div class="eval_bottom_wrap">
              <div class="filter">
                <span :class="{'active':filterType==1}" @click="filterType=1">全部</span>
                <span :class="{'active':filterType==2}" @click="filterType=2">最新</span>
                <span :class="{'active':filterType==3}" @click="filterType=3">好评</span>
                <span class="bad" :class="{'active':filterType==4}" @click="filterType=4">差评</span>
              </div>
            </div>
            <div class="eval_list">
              <ul>
                <li v-for="(item,index) in completeData" :key="index">
                  <div class="user_">
                    <div class="user_wrap">
                      <div class="img_box">
                        <img src="static/avatar.png" alt="">
                      </div>
                      <div class="core">
                        <h3>{{item.name}}</h3>
                        <el-rate v-model="item.core" disabled show-text text-color="#ff9900" score-template="{value}">
                        </el-rate>
                      </div>
                    </div>
                    <div class="time">
                      {{item.timeString}}
                    </div>
                  </div>
                  <p>{{item.msg}}</p>
                </li>
              </ul>
              <p class="nodata" v-show="!data.length">还没有人评论</p>
            </div>
          </div>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import scroll from "@/components/scroll";
import { CartCtrl } from "@/api/store/cart"
import { mapState } from "vuex";
import { Indicator ,Toast } from 'mint-ui'
export default {
  data() {
    return {
      core: {
        fw: 4.9,
        sp: 5.0
      },
      data: [],
      tips: [],
      filterType: 1
    };
  },
  methods: {
    emitScroll(pos) {
      this.$emit("scroll", pos);
    },   
    init_() {
      this.ctrl.getStoreEvaluation({storeId:this.store._id}).then(d => {
        d = d.data;
        d.data.forEach(item => {
          item.timeString = new Date(item.time).toLocaleString()
        })
        this.data = d.data;
        Indicator.close()
      }).catch(e => {
        console.log(e)
      })
    }
  },
  components: {
    scroll
  },
  computed: {
    completeData() {
      switch (parseInt(this.filterType)) {
        case 1:
          return this.data;
          break;
        case 2:
          var arr = [...this.data];
          arr.sort((a, b) => {
            
            return a.time < b.time;
          });
          return arr;
          break;
        case 3:
          return this.data.filter(item => {
            return item.core > 3;
          });
          break;
        case 4:
          return this.data.filter(item => {
            return item.core <= 2;
          });
          break;
      }
    },
    ...mapState({
      store: state => state.store.store_
    })
  },
  created() {
    this.ctrl = new CartCtrl;
    this.init_()
  },
  mounted() {
    this.core.fw = Math.floor((this.store.score-0.1)*10)/10;
    this.core.sp = Math.floor((this.store.score+0.1)*10)/10;
  }
}
</script>

<style lang="less">
@import "~@/style/base.less";
.evaluation___ {
  height: 100%;
  overflow: hidden;
  flex: auto;
  position: relative;
  .wrap_2 {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
  }
}
.evaluation_read_wrap {
  .overview {
    padding: 47 / @r 0;
    height: 256 / @r;
    border-bottom: 2 / @r solid #e6e6e6;
    display: flex;
    justify-content: space-between;
    .left {
      flex: none;
      width: 437 / @r;
      border-right: 1px solid #e6e6e6;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      .main_core {
        font-size: 64 / @r;
        color: #ff5339;
      }
      > p {
        font-size: 28 / @r;
        color: #666;
      }
      > section {
        font-size: 28 / @r;
        color: #999;
      }
    }
    .right {
      flex: auto;
      display: flex;
      justify-content: center;
      ul {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        li {
          font-size: 32 / @r;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          .title {
            margin-right: 60 / @r;
            color: #666;
          }
          .el-rate {
            height: auto;
            display: flex;
            align-items: center;
            .el-rate__icon {
              font-size: 24 / @r;
              margin-right: 6 / @r;
            }
            .el-rate__text {
              font-size: 32 / @r;
              margin-left: 60 / @r;
            }
          }
          .time {
            color: #999;
          }
        }
      }
    }
  }
  .eval_bottom {
    border-top: 30 / @r solid #f5f5f5;
    .eval_bottom_wrap {
      padding: 0 60 / @r;
      .filter {
        padding: 30 / @r 0;
        display: flex;
        border-bottom: 2 / @r dashed #e6e6e6;
        span {
          font-size: 34 / @r;
          color: #6d7885;
          background-color: #ebf5ff;
          border-radius: 6 / @r;
          padding: 28 / @r 42 / @r;
          margin-right: 20 / @r;
          &.active {
            background-color: @blue !important;
            color: #fff !important;
          }
          &.bad {
            background-color: #f5f5f5;
            color: #aaa;
          }
        }
      }
    }
    .eval_list {
      .nodata {
        color: @blue;
        padding-top: 200/@r;
        font-size: 60/@r;
        text-align: center;
      }
      ul {
        padding: 0 48 / @r;
        li {
          padding: 44 / @r 0;
          border-bottom: 2 / @r solid #eee;
          .user_ {
            display: flex;
            justify-content: space-between;
            height: 96 / @r;
            .user_wrap {
              display: flex;
              .img_box {
                height: 96 / @r;
                width: 96 / @r;
                border-radius: 5 / @r;
                margin-right: 20 / @r;
                img {
                  height: 100%;
                  width: 100%;
                }
              }
              .core {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding: 6 / @r 0;
                h3 {
                  padding-top: 8 / @r;
                  font-size: 32 / @r;
                  color: #333;
                }
                .el-rate {
                  height: auto;
                  display: flex;
                  align-items: center;
                  .el-rate__icon {
                    font-size: 32 / @r;
                    margin-right: 6 / @r;
                  }
                  .el-rate__text {
                    font-size: 32 / @r;
                    margin-left: 16 / @r;
                  }
                }
              }
            }
            .time {
              font-size: 32 / @r;
              color: #999;
            }
          }
          > p {
            font-size: 38 / @r;
            color: #333;
            padding: 36 / @r 0 0 116 / @r;
            line-height: 48 / @r;
          }
        }
      }
      .loading {
        text-align: center;
        font-size: 36 / @r;
        color: @blue;
        padding-top: 20 / @r;
      }
    }
  }
}
</style>