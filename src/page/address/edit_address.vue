<template>
  <div class="edit_address">
    <header>
      <div class="back" @click="$router.back(-1)">
        <i class="el-icon-arrow-left"></i>
      </div>
      <h3>{{type}}</h3>
      <div v-show="id" class="add" @click="rmAddress">
        <i class="el-icon-delete"></i>
      </div>
    </header>
    <ul class="form">
      <li>
        <div class="title">
          联系人
        </div>
        <div class="content">
          <div class="inner_wrap">
            <input v-model="name" type="text" placeholder="请填写姓名">
          </div>
          <div class="inner_wrap">
            <button type="button" class="btn" :class="{'active':sex}" @click="sex=true">先生</button>
            <button type="button" class="btn" :class="{'active':!sex}" @click="sex=false">女士</button>
          </div>
        </div>
      </li>
      <li>
        <div class="title">
          电话
        </div>
        <div class="content">
          <div class="inner_wrap">
            <input v-model="tel" type="number" placeholder="请填写电话">
          </div>
        </div>
      </li>
      <li>
        <div class="title">
          地址
        </div>
        <div class="content">
          <div class="address_wrap" @click="mapOn">
            <h3>{{address.name}}</h3>
            <h4>{{address.address}}</h4>
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
      </li>
      <li>
        <div class="title">
          门牌号
        </div>
        <div class="content">
          <div class="inner_wrap">
            <input v-model="address.detail" type="text" placeholder="请输入具体地址">
          </div>
        </div>
      </li>
      <li>
        <div class="title">
          标签
        </div>
        <div class="content">
          <div class="inner_wrap">
            <button v-for="(item,index) in tagArr" :key="index" type="button" :class="{'active':item==tag}" class="btn" @click="setTag(item)">{{item}}</button>
          </div>
        </div>
      </li>
    </ul>
    <div class="btn_wrap">
      <div class="save" @click="save">确&emsp;定</div>
    </div>
    <div class="map_wrap" v-if="openMap" :style="{'opacity':opacity}">
      <iframe id="test" ref="iframe" class="flex" src="https://m.amap.com/picker/?keywords=写字楼,小区,学校&zoom=15&center=&radius=1000&total=20&key=57a69eeee7b8a093920533158421d541" frameborder="0"></iframe>
    </div>
    <transition name="el-fade-in">
      <div v-show="isloadding" @click="isloadding=!isloadding" class="loading">
        <div class="wrap">
          <i class="el-icon-loading"></i>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
import { setStorage, getStorage } from "@/script/storage";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      id: "",
      type: "新增地址",
      openMap: false,
      address: {
        address: "",
        name: "点击此处选择位置",
        location: "",
        detail: "",
        isdefault: true
      },
      opacity: 0,
      isloadding: false,
      name: "",
      sex: true,
      tel: "",
      tag: "",
      tagArr: ["家", "公司", "学校"]
    };
  },
  methods: {
    mapOn() {
      this.openMap = true;
      this.isloadding = true;
      this.$nextTick(() => {
        var iframe = document.getElementById("test").contentWindow;
        /* setTimeout(() => {
          iframe.postMessage("hello", "https://m.amap.com/picker/");
          this.opacity = 1;
          this.isloadding = false;
          
        },500); */
        this.$refs.iframe.onload = () => {
          iframe.postMessage("hello", "https://m.amap.com/picker/");
          this.opacity = 1;
          this.isloadding = false;
          console.log(112321)
          
        };
        window.addEventListener("message", e=>{this.listener(e)});
        
      });
    },
    mapOff() {
      this.opacity = 0;
      this.openMap = false;
      //window.removeEventListener("message", this.listener);
    },
    listener(e) {
      if (e.data.name) {
        this.address = Object.assign(this.address, e.data);
        this.address.isdefault = false;
        this.mapOff();
      }
    },
    setTag(str) {
      if (this.tag == str) {
        this.tag = "";
      } else {
        this.tag = str;
      }
    },
    generateId() {
      var id = Date.now();
      var s = Math.floor(Math.random() * 100);
      var e = Math.floor(Math.random() * 100);
      s = s < 10 ? "0" + s : s.toString();
      e = e < 10 ? "0" + e : e.toString();
      id = s + id + e;
      return id;
    },
    setStorage(id) {
      if (
        this.name &&
        !this.address.isdefault &&
        this.address.detail &&
        this.tel
      ) {
        var id = id;
        var obj = {
          id,
          name: this.name,
          sex: this.sex,
          tel: this.tel,
          address: this.address,
          tag: this.tag
        };
        var address_list = getStorage("address_list") || {};
        address_list[id] = obj;
        setStorage("address_list", address_list);
        this.openToast("地址保存成功");
        this.$router.back();
      } else {
        alert("资料没填完");
      }
    },
    rmAddress() {
      var address_list = getStorage("address_list") || {};
      delete address_list[this.id];
      setStorage("address_list", address_list);
      this.openToast("地址删除成功");
      this.$router.back();
    },
    save() {
      var id = this.id || this.generateId();
      this.setStorage(id);
    },
    init_() {
      if (this.$route.query.id) {
        //修改地址
        this.type = "修改地址";
        var aid = this.$route.query.id;
        var address_list = getStorage("address_list") || {};
        if (address_list[aid]) {
          var { id, address, sex, tag, tel, name } = address_list[aid];
          this.address = address;
          this.sex = sex;
          this.tag = tag;
          this.tel = tel;
          this.id = id;
          this.name = name;
        } else {
          this.type = "新增地址";
        }
      } else {
        //新增地址
        this.type = "新增地址";
      }
    },
    ...mapMutations(["openToast"])
  },
  mounted() {
    this.init_();
    console.log(123);
  }
};
</script>

<style scoped lang="less">
@import "~@/style/base.less";
.edit_address {
  background-color: #f5f5f5;
  position: relative;
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
  .form {
    padding-left: 60 / @r;
    background-color: #fff;
    border-bottom: 2 / @r solid #eee;
    margin: 45 / @r 0 60 / @r;
    li {
      border-bottom: 2 / @r solid #eee;
      display: flex;
      .title {
        width: 202 / @r;
        line-height: 130 / @r;
        font-weight: bold;
        font-size: 46 / @r;
        color: #000;
      }
      .content {
        flex: auto;
        .inner_wrap {
          padding-right: 60 / @r;
          height: 130 / @r;
          border-bottom: 2 / @r solid #eee;
          width: 100%;
          display: flex;
          align-items: center;
          input {
            font-size: 44 / @r;
            padding: 40 / @r 0;
            width: 100%;
            border: none;
            background-color: initial;
          }
          .btn {
            background-color: initial;
            width: 204 / @r;
            height: 84 / @r;
            border: 2 / @r solid #eee;
            border-radius: 10 / @r;
            line-height: 80 / @r;
            font-size: 39 / @r;
            color: #999;
            margin-right: 30 / @r;
            &.active {
              border-color: @blue;
              color: @blue;
            }
          }
          &:nth-last-of-type(1) {
            border-bottom: none;
          }
        }
        .address_wrap {
          padding: 46 / @r 0;
          position: relative;
          h3 {
            padding-bottom: 18 / @r;
            font-size: 46 / @r;
            color: #999;
          }
          h4 {
            font-size: 34 / @r;
            color: #999;
          }
          i {
            position: absolute;
            right: 60 / @r;
            font-size: 40 / @r;
            top: 50%;
            transform: translateY(-50%);
            font-weight: bold;
            color: #999;
          }
        }
      }
      &:nth-last-of-type(1) {
        border-bottom: none;
      }
    }
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
  .map_wrap {
    transition: 0.5s;
    background-color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    .flex {
      flex: auto;
    }
  }
  .loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    .wrap {
      width: 200 / @r;
      height: 200 / @r;
      i {
        font-size: 200 / @r;
        color: #fff;
      }
    }
  }
}
</style>