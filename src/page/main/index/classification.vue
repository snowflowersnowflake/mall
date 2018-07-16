<template>
  <section class="classification">
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide v-for="(item1,index1) in teams" :key="index1">
        <ul v-for="(item2,index2) in item1" :key="index2">
          <router-link tag="li" :to="{path:'/list',query:{title:item3.name}}" v-for="(item3,index3) in item2" :key="index3">
            <img v-lazy="item3.imgUrl" alt="">
            <p>{{item3.name}}</p>
          </router-link>
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
  props: ["category"],
  data() {
    return {
      swiperOption: {
        pagination: { el: ".swiper-pagination", clickable: false }
      },
      /* teams: {
        first: ["美食", "晚餐", "商超便利", "果蔬生鲜", "新店特惠"],
        second: ["大牌简餐", "会员特惠", "医药健康", "甜品饮品", "帮买帮送"],
        third: ["浪漫鲜花", "披萨意面", "快餐便当", "汉堡薯条", "炸鸡炸串"],
        fourth: ["煲仔烧腊", "火锅烤鱼", "准时达", "地方菜系", "异国料理"]
      } */
    };
  },
  components: {
    swiper,
    swiperSlide
  },
  computed: {
    teams() {
      let num = Math.ceil(this.category.length / 5);
      var arr = [];
      for (let i = 0; i < Math.ceil(num / 2); i++) {
        if (i < (Math.ceil(num / 2) - 1)) {
          arr.push(this.category.slice(i * 10, (i + 1) * 10));
        }else {
          arr.push(this.category.slice(i * 10))
        }
      }
      arr.forEach((item,index)=>{
        var newArr = [];
        newArr[0] = item.slice(0,5);
        newArr[1] = item.slice(5);
        arr[index] = newArr
      });
      return arr;
    }
  },
  methods: {},
  mounted() {
    //this.teams1()
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
          padding-top: 56 / @r;
          li {
            img {
              width: 133 / @r;
            }
            p {
              padding-top: 35 / @r;
              font-size: 30 / @r;
              color: #666;
              text-align: center;
            }
          }
        }
      }
    }

    .swiper-pagination {
      bottom: 30 / @r;
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