<template>
  <div class="reg_page">
    <header>
      <div class="back" @click="$router.back(-1)">
        <i class="el-icon-arrow-left"></i>
      </div>
      <h3>注册</h3>
      <router-link tag="div" to="/login" class="to_reg">
        登录
      </router-link>
    </header>
    <div class="content">
      <div class="list">
        <label>
          <input type="text" v-model="name" placeholder="输入4-12位账号">
        </label>
        <label>
          <input type="password" v-model="pw" placeholder="输入6-12位密码">
        </label>
        <label>
          <input type="password" v-model="pw2" placeholder="再次输入密码">
        </label>
      </div>
      <section class="btn_wrap">
        <div class="btn" @click="reg">注册</div>
      </section>
    </div>
  </div>
</template>

<script>
import { UserApi } from "@/api/user/user";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      name: "",
      pw: "",
      pw2: "",
      userApi: null
    };
  },
  methods: {
    reg() {
      if (this.name && this.pw && this.pw === this.pw2) {
        this.userApi
          .reg({ name: this.name, pw: this.pw })
          .then(r => {
            var r = r.data;
            if (r.status == 1) {
              this.$router.replace("/login");
            }
            this.openToast(r.msg);
          })
          .catch(e => {
            console.log(e);
          });
      }else if(this.pw!==this.pw2) {
        this.openToast('两次输入密码不一致');
      }else {
        this.openToast('用户名或密码格式不正确');
      }
    },
    ...mapMutations(["openToast"])
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