<template>
    <div class="reg_page">
        <header>
            <div class="back" @click="$router.back(-1)">
                <i class="el-icon-arrow-left"></i>
            </div>
            <h3>账户信息</h3>
        </header>
        <div class="content">
            <div class="list">
                <label>
                    <div class="img_wrap">
                        <i class="fa fa-mobile"></i>手机号
                    </div>
                    <input type="tel" v-model="tel" placeholder="输入手机号">
                </label>
                <label>
                    <div class="img_wrap">
                        <i class="fa fa-user-o"></i>昵称
                    </div>
                    <input type="text" v-model="nickName" placeholder="昵称">
                </label>
            </div>
            <section class="btn_wrap">
                <div class="btn" @click="submit">保存</div>
            </section>
        </div>
    </div>
</template>

<script>
import { IndexCtrl } from "@/api/index";
import { Toast, Indicator } from "mint-ui";
export default {
  data() {
    return {
      tel: "",
      nickName: ""
    };
  },
  methods: {
    submit() {
      this.ctrl
        .setUserInfo({ tel: this.tel, nickName: this.nickName })
        .then(d => {
          d = d.data;
          if (d.status == 1) {
            this.$router.back(-1);
          }
          Toast({
            message: d.msg,
            position: "bottom"
          });
           Indicator.close()
        });
       
    },
    init_() {
      this.ctrl.getUserInfo().then(d => {
        d = d.data;
        if (d.status == 1) {
          this.tel = d.data.tel;
          this.nickName = d.data.nickName;
        } else {
          Toast({
            message: d.msg
          });
        }
        Indicator.close();
      });
    }
  },
  created() {
    this.ctrl = new IndexCtrl();
    this.init_();
  }
};
</script>

<style scoped lang="less">
@import "~@/style/base.less";
.reg_page {
  background-color: #f5f5f5 !important;
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
    .to_reg {
      position: absolute;
      top: 110 / @r;
      right: 60 / @r;
      color: #fff;
      font-size: 50 / @r;
    }
    h3 {
      font-size: 60 / @r;
      color: #fff;
      padding-top: 96 / @r;
      text-align: center;
    }
  }
  .content {
    padding-top: 45 / @r;
    .list {
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      background-color: #fff;
      padding: 0 60 / @r;
      label {
        height: 131 / @r;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        .img_wrap {
          font-size: 52 / @r;
          width: 300 / @r;
          flex: none;
          i {
            width: 60 / @r;
            text-align: center;
            color: @blue;
          }
          i.fa-mobile {
            font-size: 68 / @r;
          }
        }
        input {
          flex: 1;
          border: none;
          background: initial;
          font-size: 48 / @r;
          color: #333;
          text-align: right;
        }
      }
    }
    .btn_wrap {
      padding: 60 / @r;
      .btn {
        background-color: #00d762;
        height: 144 / @r;
        color: #fff;
        line-height: 144 / @r;
        border-radius: 14 / @r;
        font-size: 44 / @r;
        text-align: center;
      }
    }
    .links {
      text-align: right;
      padding: 0 60 / @r;
      a {
        font-size: 40 / @r;
        color: @blue;
      }
    }
  }
}
</style>