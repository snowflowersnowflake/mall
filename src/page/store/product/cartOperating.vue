<template>
  <div class="operating">
    <transition name="in">
      <div class="cut" @click="productMinus" v-show="food.cartCount>0">
        <transition name="rotate">
          <i v-show="food.cartCount>0" class="el-icon-minus"></i>
        </transition>
      </div>
    </transition>

    <span v-show="food.cartCount>0">{{food.cartCount}}</span>
    <div class="add" @click="productAdd($event)">
      <i class="el-icon-plus"></i>
    </div>
  </div>
</template>

<script>
import { CartCtrl } from "@/api/store/cart";
import { mapState } from "vuex";
import { getStorage } from "@/script/storage";
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    productAdd(ev) {
      this.ctrl
        .addCart({
          storeId: this.store_._id,
          category: this.food.category,
          foodId: this.food.product_id,
        })
        .then(d => {
          if (d.data.status == 1) {
            this.food.cartCount = d.data.count;
            this.$nextTick(() => {
              this.$emit("ballDown", ev.target);
              this.$emit("cartChange");
            });
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    productMinus() {
      if (this.food.cartCount > 0) {
        this.ctrl
          .minusCart({
            storeId: this.store_._id,
            category: this.food.category,
            foodId: this.food.product_id
          })
          .then(d => {
            if (d.data.status == 1) {
              this.food.cartCount = d.data.count;
              this.$emit("cartChange");
            }
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
  },
  computed: {
    ...mapState({
      store_: state => {
        return state.store.store_;
      }
    })
  },
  created() {
    this.ctrl = new CartCtrl();
  }
};
</script>

<style scoped lang="less">
@import "~@/style/base.less";
.operating {
  height: 66 / @r;
  width: 216 / @r;
  position: relative;

  .cut,
  .add {
    position: absolute;
    height: 66 / @r;
    width: 66 / @r;
    border: 2 / @r solid @blue;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 36 / @r;
    color: @blue;
    font-weight: bold;
    background-color: #fff;
    top: 0;
    right: 0;
  }
  .add {
    color: #fff;
    background-color: @blue;
    transform: translateX(0);
  }
  .cut {
    transition: all 0.3s;
    transform: translateX(-150 / @r);
    &.in-enter, &.in-leave-to /* .fade-leave-active below version 2.1.8 */ {
      transform: translate3D(0, 0, 0);
      opacity: 0;
    }
    i {
      transition: all 0.3s;
      &.rotate-enter, &.rotate-leave-to /* .fade-leave-active below version 2.1.8 */ {
        transform: rotate(180deg);
      }
    }
  }
  span {
    display: block;
    width: 100%;
    text-align: center;
    font-size: 32 / @r;
    color: #666;
    line-height: 66 / @r;
  }
}
</style>