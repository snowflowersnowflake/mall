<template>
    <section class="classification">
        <swiper :options="swiperOption" ref="mySwiper">
            <!-- slides -->
            <swiper-slide>
                <ul>
                    <li v-for="(item,index) in teams.first" :key="index">
                        <img :src="`static/index/images/index-1-0${index+1}.png`" alt="">
                        <p>{{item}}</p>
                    </li>
                </ul>
                <ul>
                     <li v-for="(item,index) in teams.second" :key="index">
                        <img :src="`static/index/images/index-2-0${index+1}.png`" alt="">
                        <p>{{item}}</p>
                    </li>
                </ul>
            </swiper-slide>
            <swiper-slide>
                <ul>
                    <li v-for="(item,index) in teams.third" :key="index">
                        <img :src="`static/index/images/index-3-0${index+1}.png`" alt="">
                        <p>{{item}}</p>
                    </li>
                </ul>
                <ul>
                     <li v-for="(item,index) in teams.fourth" :key="index">
                        <img :src="`static/index/images/index-4-0${index+1}.png`" alt="">
                        <p>{{item}}</p>
                    </li>
                </ul>
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </section>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      swiperOption: {
        pagination: { el: ".swiper-pagination", clickable: false }
      },
      teams:{
          first:['美食','晚餐','商超便利','果蔬生鲜','新店特惠'],
          second:['大牌简餐','会员特惠','医药健康','甜品饮品','帮买帮送'],
          third:['浪漫鲜花','披萨意面','快餐便当','汉堡薯条','炸鸡炸串'],
          fourth:['煲仔烧腊','火锅烤鱼','准时达','地方菜系','异国料理']
      }
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
.classification {
  height: 582 / @r;
  .swiper-container {
    height: 100%;
    .swiper-wrapper {
      height: 100%;
      .swiper-slide {
        ul {
          display: flex;
          justify-content: space-around;
          padding-top:56/@r;
          li {
              img {
                  width: 133/@r;
              }
              p {
                  padding-top: 35/@r;
                  font-size: 30/@r;
                  color: #666;
                  text-align: center;
              }
          }
        }
      }
    }

    .swiper-pagination {
        bottom: 30/@r;
      span {
        width: 30 / @r;
        height: 6 / @r;
        background-color: #aaa;
        &.swiper-pagination-bullet-active {
          background-color: #aaa;
        }
      }
    }
  }
}
</style>