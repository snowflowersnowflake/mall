<template>
    <div class="advertising">
        <swiper :options="swiperOption" ref="mySwiper">
            <!-- slides -->
            <swiper-slide v-for="(item,index) in banners" :key="index">
                <img :src="item.imgUrl" alt="">
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      swiperOption: {
        pagination: { el: ".swiper-pagination", clickable: false },
        autoplay:true,
        loop:true
      },
      banners: [
        {
          imgUrl: "/static/index/ad1.png",
          link: ""
        },
        {
          imgUrl: "/static/index/ad2.png",
          link: ""
        },
        {
          imgUrl: "/static/index/ad1.png",
          link: ""
        },
        {
          imgUrl: "/static/index/ad2.png",
          link: ""
        },
        {
          imgUrl: "/static/index/ad1.png",
          link: ""
        },
        {
          imgUrl: "/static/index/ad2.png",
          link: ""
        },
        {
          imgUrl: "/static/index/ad1.png",
          link: ""
        },
        {
          imgUrl: "/static/index/ad2.png",
          link: ""
        }
      ]
    };
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>

<style lang="less">
@import "~@/style/base.less";
.advertising {
  height: 400 / @r;
  border-top: 20 / @r solid #f3f3f3;
  border-bottom: 20 / @r solid #f3f3f3;
  padding: 30 / @r;
  .swiper-container {
    height: 100%;
    .swiper-wrapper {
      height: 100%;
      .swiper-slide {
        height: 100%;
        img {
          height: 100%;
        }
      }
    }
  }
  .swiper-pagination {
    bottom: 12 / @r;
    span {
      width: 30 / @r;
      height: 6 / @r;
      background-color: #fff;
      border-radius: 0;
      &.swiper-pagination-bullet-active {
        background-color: rgba(255,255,255,1);
      }
    }
  }
}
</style>