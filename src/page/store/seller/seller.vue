<template>
    <div class="seller">
        <div class="seller_wrap">
            <scroll>
                <div class="scroll">
                    <div class="seller_img">
                        <h3>商家信息</h3>
                        <div class="img_wrap">
                            <img v-lazy="store.img_url" alt="">
                        </div>
                    </div>
                    <ul class="seller_info">
                        <li>
                            <span>商家名称</span>
                            <em>{{store.title}}</em>
                        </li>
                        <li>
                            <span>商品分类</span>
                            <em>{{store.tag}}</em>
                        </li>
                        <li>
                            <span>商家地址</span>
                            <em>商家地址商家地址商家地址商家地址商家地址</em>
                        </li>
                        <li>
                            <span>商家电话</span>
                            <em>12345678901</em>
                        </li>
                        <li>
                            <span>营业时间</span>
                            <em>10:00-21:00</em>
                        </li>
                    </ul>
                </div>
            </scroll>
        </div>
    </div>
</template>

<script>
import scroll from "@/components/scroll";
import { mapState } from "vuex";
export default {
  components: {
    scroll
  },
  computed: {
    ...mapState({
      store: state => state.store.store_
    })
  }
};
</script>

<style scoped lang="less">
@import "~@/style/base.less";
.seller {
  flex: auto;
  height: 100%;
  position: relative;
  .seller_wrap {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    .scroll {
      .seller_img {
        padding: 0 46 / @r 36 / @r;
        border-bottom: 24 / @r solid #eee;
        h3 {
          font-size: 42 / @r;
          padding: 52 / @r 0 40 / @r;
          color: #000;
        }
        .img_wrap {
          width: 282 / @r;
          height: 282 / @r;
          img {
            height: 100%;
            width: 100%;
          }
        }
      }
      .seller_info {
        padding: 0 46 / @r;
        li {
          padding: 45 / @r 0;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #eee;
          span {
            font-size: 42 / @r;
            color: #000;
            line-height: 48 / @r;
          }
          em {
            font-size: 34 / @r;
            line-height: 48 / @r;
            color: #666;
            max-width: 463 / @r;
          }
        }
      }
    }
  }
}
</style>