<template>
  <div class="bs_wrap" ref="wrapper">
    <div>
      <div class="up" v-show="pullDownRefresh">
        <i class="fa fa-long-arrow-down" :class="{'over':pullupOver>70}"></i>
        <p>{{pullupTxt}}</p>
      </div>
      <slot></slot>
      <div class="down" v-show="pullUpLoad" :style="{'transform':`translateY(${pulldownOver*0.2}px)`}">
        <i class="el-icon-loading"></i>{{pulldownTxt}}</div>
    </div>

  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  props: {
    /**
     * 1 滚动的时候会派发scroll事件，会截流。
     * 2 滚动的时候实时派发scroll事件，不会截流。
     * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
     */
    probeType: {
      type: Number,
      default: 1
    },
    /**
     * 点击列表是否派发click事件
     */
    click: {
      type: Boolean,
      default: true
    },
    /**
     * 是否开启横向滚动
     */
    scrollX: {
      type: Boolean,
      default: false
    },
    /**
     * 是否派发滚动事件
     */
    listenScroll: {
      type: Boolean,
      default: false
    },
    /**
     * 列表的数据
     */
    data: {
      type: Array,
      default: null
    },
    /**
     * 是否派发滚动到底部的事件，用于上拉加载
     */
    pullUpLoad: {
      type: null,
      default: false
    },
    /**
     * 是否派发顶部下拉的事件，用于下拉刷新
     */
    pullDownRefresh: {
      type: null,
      default: false
    },
    /**
     * 是否派发列表滚动开始的事件
     */
    beforeScroll: {
      type: Boolean,
      default: false
    },
    /**
     * 当数据更新后，刷新scroll的延时。
     */
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {
      pulldownTxt: "上拉加载更多",
      pulldownOver: 0,
      pullupTxt: "继续下拉刷新页面",
      pullupOver: 0
    };
  },
  mounted() {
    // 保证在DOM渲染完毕后初始化better-scroll
    setTimeout(() => {
      this._initScroll();
    }, 20);
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }
      // better-scroll的初始化
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        scrollX: this.scrollX,
        pullUpLoad: this.pullUpLoad,
        pullUpLoad: this.pullUpLoad
      });

      // 是否派发滚动事件
      if (this.listenScroll) {
        this.scroll.on("scroll", pos => {
          if (this.scroll.y < this.scroll.maxScrollY) {
            this.pulldownOver = this.scroll.maxScrollY - this.scroll.y;
            if (this.pulldownOver > 50) {
              this.pulldownTxt = "松开手指开始加载";
            } else {
              this.pulldownTxt = "上拉加载更多";
            }
          } else if (this.scroll.y > 0 && this.scroll.y <= 70) {
            this.pullupOver = this.scroll.y;
            this.pullupTxt = "继续下拉刷新页面";
          } else if (this.scroll.y > 70) {
            this.pullupOver = this.scroll.y;
            this.pullupTxt = "松开手指刷新页面";
          }
          this.$emit("scroll", pos);
        });
      }

      // 是否派发滚动到底部事件，用于上拉加载
      if (this.pullUpLoad) {        
        this.scroll.on("touchEnd", this.pl);
      }

      // 是否派发顶部下拉事件，用于下拉刷新
      if (this.pullDownRefresh) {
        this.scroll.on("touchEnd", pos => {
          // 下拉动作
          if (this.scroll.y > 70) {
            this.$emit("pulldown");
          }
        });
      }

      // 是否派发列表滚动开始的事件
      if (this.beforeScroll) {
        this.scroll.on("beforeScrollStart", () => {
          this.$emit("beforeScroll");
        });
      }
    },
    disable() {
      // 代理better-scroll的disable方法
      this.scroll && this.scroll.disable();
    },
    enable() {
      // 代理better-scroll的enable方法
      this.scroll && this.scroll.enable();
    },
    refresh() {
      // 代理better-scroll的refresh方法
      this.scroll && this.scroll.refresh();
    },
    scrollTo() {
      // 代理better-scroll的scrollTo方法
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    scrollToElement() {
      // 代理better-scroll的scrollToElement方法
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    },
    finishPullDown() {
      this.scroll && this.scroll.finishPullDown();
    },
    closePullDown() {
      this.pulldownTxt = "没有更多";
      this.scroll && this.scroll.closePullUp();
    },
    openPullUp() {
      if (this.pullUpLoad) {        
        this.scroll.off("touchEnd", this.pl);
        this.scroll.on("touchEnd", this.pl);
      }
    },
    pl() {
      if (this.scroll.y <= this.scroll.maxScrollY - 50) {
        this.$emit("scrollToEnd");
      }
    }
  },
  watch: {
    // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
    data(newVal) {
      setTimeout(() => {
        this.refresh();
      }, this.refreshDelay);
    }
  }
};
</script>

<style scoped lang="less">
@import "~@/style/base.less";
.bs_wrap {
  height: 100%;
  position: relative;
  overflow: hidden;
}
.down {
  position: absolute;
  font-size: 40 / @r;
  text-align: center;
  color: @blue;
  line-height: 120 / @r;
  top: 100%;
  left: 0;
  right: 0;
  i {
    color: @blue;
  }
}
.up {
  position: absolute;
  font-size: 40 / @r;
  text-align: center;
  color: @blue;
  line-height: 120 / @r;
  bottom: 100%;
  left: 0;
  right: 0;
  padding-bottom: 20 / @r;
  i {
    color: @blue;
    font-size: 60 / @r;
    transition: 0.3s;
    &.over {
      transform: rotate(180deg);
    }
  }
}
</style>