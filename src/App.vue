<template>
  <div id="app">
      <transition :name="transitionName">
        <router-view class="h100" />
      </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      transitionName: "slide-left"
    };
  },
  watch: {
    $route: function(to, from) {
      if (to.meta.index > from.meta.index) {
        this.transitionName = "slide-left";
      } else {
        this.transitionName = "slide-right";
      }
    }
  }
};
</script>

<style lang='less'>
@import "~@/style/reset.less";
@import "~@/style/base.less";
#app {
  height: 100%;
  background-color: #000;
  .h100 {
    height: 100%;
    background-color: #fff;
  }
  .z100 {
    z-index: 999;
  }

  .slide-left-enter {
    transform: translate3d(100%, 0, 0);
    position: absolute;
    z-index: 999;
  }
  .slide-left-leave {
    position: absolute;
    z-index: 1;
  }
  .slide-left-enter-active,
  .slide-left-leave-active {
    position: absolute;
    transition: 0.5s;
    width: 100%;
    z-index: 1;
  }
  .slide-left-enter-active {
    z-index: 999;
  }
  .slide-left-leave-to {
    opacity: 0.7;
    transform: translate3d(-20%, 0, 0);
  }


  .slide-right-enter {
    position: absolute;
    opacity: 0;
    transform: translate3d(-20%, 0, 0);
    z-index: 1;
  }
  .slide-right-leave {
    position: absolute;
    z-index: 999;
  }
  .slide-right-enter-active,
  .slide-right-leave-active {
    position: absolute;
    transition: 0.5s;
    width: 100%;
    z-index: 1;
  }
  .slide-right-leave-active {
    z-index: 999;
  }

  .slide-right-leave-to {
    transform: translate3d(100%, 0, 0);
  }
}
</style>
