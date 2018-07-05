<template>
  <div class="address_list">
    <header>
      <div class="back" @click="$router.back(-1)">
        <i class="el-icon-arrow-left"></i>
      </div>
      <h3>收货地址</h3>
      <router-link to="/editaddress" class="add">
        新增地址
      </router-link>
    </header>
    <div class="list_wrap">
      <div class="nodata" v-show="!Object.keys(address).length">
        <p class="tip">还没有收获地址</p>
        <div class="btn_wrap">
          <router-link tag="div" to="/editaddress" class="save">
            新增地址
          </router-link>
        </div>
      </div>

      <ul>
        <li v-for="(item,key) in address" :key="key">
          <div class="text">
            <h3>{{item.address.name}}
              <section v-show="item.tag">{{item.tag}}</section>
            </h3>
            <h4>{{item.address.address}}</h4>
            <p>{{getUser(item)}}</p>
          </div>

          <router-link :to="{path:'/editaddress',query:{id:item.id}}" class="edit">
            <i class="el-icon-edit-outline"></i>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getStorage } from "@/script/storage";
export default {
  data() {
    return {
      address: []
    };
  },
  methods: {
    getUser(address) {
      if (address && address.length) {
        var { name, sex, tel } = address;
        if (sex) {
          return `${name}(先生) ${tel}`;
        } else {
          return `${name}(女士) ${tel}`;
        }
      }
    }
  },
  mounted() {
    var arr = getStorage("address_list");
    if (arr) {
      this.address = arr;
    }
  }
};
</script>

<style scoped lang="less">
@import "~@/style/base.less";
.address_list {
  background-color: #f5f5f5;
  height: 100%;
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
    .add {
      position: absolute;
      top: 100 / @r;
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
  .list_wrap {
    .nodata {
      .tip {
        margin: 200 / @r auto 160 / @r;
        color: #333;
        font-size: 60 / @r;
        text-align: center;
      }
      .btn_wrap {
        padding: 0 60 / @r;
        .save {
          height: 144 / @r;
          background-color: #00d762;
          text-align: center;
          line-height: 144 / @r;
          border-radius: 14 / @r;
          font-size: 46 / @r;
          color: #fff;
          font-weight: bold;
          text-align: center;
        }
      }
    }

    ul {
      padding-left: 50 / @r;
      background-color: #fff;
      li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 2 / @r solid #eee;
        padding: 50 / @r 50 / @r 50 / @r 0;
        .text {
          color: #333;
          h3 {
            font-size: 46 / @r;
            font-weight: bold;
            section {
              display: inline-block;
              color: @blue;
              font-size: 30 / @r;
              padding: 9 / @r 12 / @r;
              border: 1px solid @blue;
              border-radius: 6 / @r;
              background-color: #d6edfa;
              margin-left: 20 / @r;
            }
          }
          h4 {
            font-size: 40 / @r;
            padding: 20 / @r 0 40 / @r;
            line-height: 50 / @r;
          }
          p {
            font-size: 40 / @r;
            color: #999;
          }
        }
        .edit {
          padding: 10 / @r;
          i {
            font-size: 60 / @r;
            color: #999;
          }
        }
      }
    }
  }
}
</style>