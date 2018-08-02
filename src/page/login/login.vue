<template>
  <div class="reg_page">
    <header>
      <div class="back" @click="$router.back(-1)">
        <i class="el-icon-arrow-left"></i>
      </div>
      <h3>登录</h3>
      <router-link tag="div" to="/reg" class="to_reg">
        注册
      </router-link>
    </header>
    <div class="content">
      <div class="list">
        <label>
          <input type="text" v-model="name" placeholder="输入账号">
        </label>
        <label>
          <input type="password" v-model="pw" placeholder="输入密码">
        </label>
      </div>
      <section class="btn_wrap">
        <div class="btn" @click="login">登录</div>
      </section>
    </div>
  </div>
</template>

<script>
import { UserApi } from "@/api/user/user";
import { setStorage } from "@/script/storage";
import { Indicator, Toast } from "mint-ui";
export default {
  data() {
    return {
      name: "",
      pw: "",
      userApi: null
    };
  },
  methods: {
    login() {
      if (this.name && this.pw) {
        this.userApi
          .login({ name: this.name, pw: this.pw })
          .then(r => {
            var r = r.data;
            if (r.status == 1) {
              setStorage("token", r.token);
              this.$router.replace("/center");
            }
            Toast({
              message: r.msg,
              position: "bottom"
            });
            Indicator.close();
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        Toast({
          message: "用户名或密码格式不正确",
          position: "bottom"
        });
      }
    }
  },
  created() {
    this.userApi = new UserApi();
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
        input {
          flex: 1;
          border: none;
          background: initial;
          font-size: 48 / @r;
          color: #333;
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