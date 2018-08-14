<template>
  <div class="bg_gray" v-if="initEnd">
    <div class="mycenter_header">
      <div class="header_top">
        <div class="left">
          <i class="el-icon-bell"></i>
        </div>
        <section>我的</section>
        <router-link tag="div" to="userinfo" class="right">
          <i class="el-icon-setting"></i>
        </router-link>
      </div>
      <div class="header_bottom">
        <div class="wrap_">
          <div class="img_wrap">
            <img src="static/avatar.png" alt="">
          </div>
          <router-link tag="div" to="userinfo" class="texts">
            <p>{{nickName}}</p>
            <section>
              <i class="el-icon-mobile-phone"></i>
              <span>{{tel}}</span>
            </section>
          </router-link>
        </div>
        <div class="icon_wrap" @click="logout">
          <i class="fa fa-power-off"></i>
        </div>

      </div>
    </div>
    <div class="currency">
      <section class="wallet">
        <strong>0.00
          <span>元</span>
        </strong>
        <p>钱包</p>
      </section>
      <section class="offer">
        <strong>0
          <span>个</span>
        </strong>
        <p>优惠</p>
      </section>
      <section class="gold">
        <strong>{{coin}}
          <span>个</span>
        </strong>
        <p>金币</p>
      </section>
    </div>
    <div class="h30"></div>
    <ul class="list">
      <li>
        <div class="img_wrap">
          <img src="static/center/icon_01.png" alt="">
        </div>
        <router-link tag="div" to="/addresslist" class="link">
          <span>收获地址</span>
          <div class="right">
            <i class="el-icon-arrow-right"></i>
          </div>
        </router-link>
      </li>
      <li>
        <div class="img_wrap">
          <img src="static/center/icon_02.png" alt="">
        </div>
        <router-link tag="div" to="/collection" class="link">
          <span>我的收藏</span>
          <div class="right">
            <i class="el-icon-arrow-right"></i>
          </div>
        </router-link>
      </li>
      <li @click="tip">
        <div class="img_wrap">
          <img src="static/center/icon_03.png" alt="">
        </div>
        <div class="link">
          <span>我的客服</span>
          <div class="right">
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
      </li>
    </ul>
    <div class="h30"></div>
    <ul class="list">
      <li @click="tip">
        <div class="img_wrap">
          <img src="static/center/icon_04.png" alt="">
        </div>
        <div class="link">
          <span>饿了么联名卡</span>
          <div class="right">
            <div class="active">NEW</div>
            <div class="text">
              <span>免费领百元红包</span>
            </div>
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
      </li>
      <li @click="tip">
        <div class="img_wrap">
          <img src="static/center/icon_05.png" alt="">
        </div>
        <div class="link">
          <span>推荐有奖</span>
          <div class="right">
            <div class="text">
              <span>5元现金拿不停</span>
            </div>
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
      </li>
      <li @click="tip">
        <div class="img_wrap">
          <img src="static/center/icon_06.png" alt="">
        </div>
        <div class="link">
          <span>金币商城</span>
          <div class="right">
            <div class="text">
              <span>0元好礼在这里</span>
            </div>
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
      </li>
      <li @click="tip">
        <div class="img_wrap">
          <img src="static/center/icon_07.png" alt="">
        </div>
        <div class="link">
          <span>城市代理申请</span>
          <div class="right">
            <div class="active">NEW</div>
            <div class="text">
              <span>最高6个月免抽佣</span>
            </div>
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { clearStorage } from "@/script/storage";
import { Toast , Indicator } from "mint-ui";
import { IndexCtrl } from "@/api/index";
export default {
  data() {
    return {
      nickName: "未登录",
      tel: "未填写",
      coin:0,
      initEnd:false
    };
  },
  methods: {
    tip() {
      Toast({
        message: "没有实现功能",
        position: "bottom"
      });
    },
    logout() {
      clearStorage();

      this.$router.push("/login");
    },
    init_() {
      this.ctrl.getUserInfo().then(d => {
        d = d.data;
        if (d.status == 1) {
          this.nickName = d.data.nickName;
          this.coin = d.data.coin
          if (d.data.tel) {
            this.tel = d.data.tel;
          }
        }
        this.initEnd = true
        Indicator.close()
      });
    },
    ...mapMutations(["openToast"])
  },
  created() {
    this.ctrl = new IndexCtrl();
    this.init_();
  }
};
</script>

<style scoped lang="less">
@import "~@/style/base.less";

.mycenter_header {
  background: linear-gradient(to right, #02aaff, #0387ff);
  height: 492 / @r;
  padding: 96 / @r 60 / @r 0;
  .header_top {
    display: flex;
    justify-content: space-between;
    font-size: 60 / @r;
    color: #fff;
    padding-bottom: 90 / @r;
  }
  .header_bottom {
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    .wrap_ {
      display: flex;
      .img_wrap {
        height: 180 / @r;
        width: 180 / @r;
        border-radius: 50%;
        margin-right: 46 / @r;
        overflow: hidden;
        img {
          height: 100%;
          width: 100%;
        }
      }
      .texts {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        color: #fff;
        p {
          font-size: 60 / @r;
        }
        section {
          font-size: 38 / @r;
        }
      }
    }
    div.icon_wrap {
      padding: 30 / @r;
      padding-right: 0;
      i {
        font-size: 60 / @r;
        color: #fff;
      }
    }
  }
}
.currency {
  background-color: #fff;
  height: 240 / @r;
  display: flex;
  border-top: 2 / @r solid #eee;
  border-bottom: 2 / @r solid #eee;
  > section {
    flex: 1;
    border-right: 1px solid #eee;
    text-align: center;
    padding: 70 / @r 050 / @r;
    strong {
      font-size: 64 / @r;
      font-weight: bold;
      padding-bottom: 22 / @r;
      display: block;
      span {
        font-size: 26 / @r;
      }
    }
    p {
      font-size: 34 / @r;
      color: #666;
    }
    &.wallet {
      color: #2395ff;
    }
    &.offer {
      color: #ff5f3e;
    }
    &.gold {
      color: #ffa200;
    }
    &:nth-last-of-type(1) {
      border-right: none;
    }
  }
}
.bg_gray {
  background-color: #f5f5f5;
}
.h30 {
  height: 30 / @r;
}
.list {
  border-top: 2 / @r solid #eee;
  border-bottom: 2 / @r solid #eee;
  padding: 0 60 / @r;
  background-color: #fff;
  li {
    display: flex;
    align-items: center;
    height: 131 / @r;
    &:nth-last-of-type(1) {
      .link {
        border-bottom: none;
      }
    }
    .img_wrap {
      flex: none;
      width: 64 / @r;
      display: flex;
      margin-right: 50 / @r;
      align-items: center;
      img {
        width: 100%;
        height: 64 / @r;
      }
    }
    .link {
      height: 100%;
      flex: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2 / @r solid #eee;
      span {
        font-size: 46 / @r;
        color: #000;
      }
      .right {
        display: flex;
        align-items: center;
        .active {
          height: 40 / @r;
          background-color: #ff3618;
          font-size: 24 / @r;
          color: #fff;
          line-height: 40 / @r;
          padding: 0 16 / @r;
          border-radius: 20 / @r;
          margin-right: 25 / @r;
        }
        .text {
          display: flex;
          align-items: center;
          span {
            font-size: 36 / @r;
            color: #999;
          }
        }
        i {
          color: #c7c7cc;
        }
      }
    }
  }
}
</style>