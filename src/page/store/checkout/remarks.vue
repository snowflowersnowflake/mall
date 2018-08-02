<template>
    <div class="remark">
        <header>
            <div class="back" @click="back">
                <i class="el-icon-arrow-left"></i>
            </div>
            <h3>订单备注</h3>
            <div class="add" @click="submit">
                完成
            </div>
        </header>
        <div class="body">
            <div class="body_wrap">
                <label class="input_wrap">
                    <textarea ref="input" @blur="checkLength" v-model="text" placeholder="请写额外对餐厅和骑手小哥备注的信息"></textarea>
                    <p>
                        <span :class="{'red':text.length>50}">{{text.length}}</span>/50个字</p>
                </label>
                <div class="fast_input">
                    <h4>
                        <span>快捷输入</span>
                        <em class="blue" @click="saveMarks" v-if="eidting">保存</em>
                        <em @click="eidting=true" v-else>编辑</em>
                    </h4>
                    <div class="text_box">
                        <span v-for="item in userMarks" :key="item" @click="addText(item)">{{item}}
                            <i v-show="eidting" class="el-icon-error" @click="rmMarks(item)"></i>
                        </span>
                        <span :class="{'dis':eidting}" v-for="(item,index) in defaultText" :key="index" @click="addText(item)">{{item}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import { setStorage, getStorage } from "@/script/storage";
export default {
  data() {
    return {
      text: "",
      userMarks: getStorage("userMarks") || [],
      defaultText: [
        "不要辣",
        "少点辣",
        "多点辣",
        "不要香菜",
        "不要洋葱",
        "多点醋",
        "多点葱"
      ],
      eidting: false
    };
  },
  methods: {
    checkLength() {
      this.text = this.text.trim();
      if (this.text.length > 50) {
        MessageBox.alert("备注最多输入50个字", "提示").then(() => {
          this.$refs.input.focus();
          return false;
        });
      } else {
        return true;
      }
    },
    back() {
      this.checkMark(() => {
        this.$emit("back");
      });
    },
    checkMark(fn) {
      var UM = getStorage("userMarks") || [];
      if (UM.toString() !== this.userMarks.toString()) {
        MessageBox.confirm("快捷输入没有保存是否保存", "提示")
          .then(() => {
            setStorage("userMarks", this.userMarks);
            fn && fn();
          })
          .catch(() => {
            this.userMarks = UM;
            fn && fn();
          });
      } else {
        fn && fn();
      }
    },
    submit() {
      if (this.checkLength()) {
        this.checkMark(() => {
          if (this.text.trim().length > 0) {
            var a = this.defaultText.some(item => {
              return item == this.text;
            });
            var b = this.userMarks.some(item => {
              return item == this.text;
            });
            if (!a && !b) {
              this.userMarks.unshift(this.text);
              setStorage("userMarks", this.userMarks);
            } else if (!a) {
              var index = this.userMarks.indexOf(this.text);
              this.userMarks.splice(index, 1);
              this.userMarks.unshift(this.text);
              setStorage("userMarks", this.userMarks);
            }
            this.$emit("writeMark", this.text);
            this.back();
          } else {
            this.back();
          }
        });
      }
    },
    addText(str) {
      if (!this.eidting) {
        this.text += " " + str;
      }
    },
    saveMarks() {
      this.eidting = false;
      setStorage("userMarks", this.userMarks);
    },
    rmMarks(str) {
      this.userMarks.splice(this.userMarks.indexOf(str), 1);
    },
    focus_() {
      this.$refs.input.focus();
    }
  }
};
</script>

<style scoped lang='less'>
@import "~@/style/base.less";
.remark {
  height: 100%;
  display: flex;
  flex-direction: column;
}
header {
  position: relative;
  background: linear-gradient(to right, #02aaff, #0387ff);
  height: 188 / @r;
  flex: none;
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
.body {
  flex: 1;
  padding: 48 / @r;
  display: flex;
  flex-direction: column;
  .body_wrap {
    flex: 1;
    height: 100%;
    overflow: scroll;
    .input_wrap {
      display: block;
      height: 336 / @r;
      border: 2 / @r solid #eee;
      border-radius: 6 / @r;
      background-color: #fafafa;
      padding: 30 / @r 50 / @r 50 / @r;
      textarea {
        resize: none;
        height: 214 / @r;
        width: 100%;
        border: none;
        font-size: 38 / @r;
        line-height: 50 / @r;
        color: #333;
        background-color: initial;
      }
      p {
        font-size: 28 / @r;
        text-align: right;
        color: #999;
        .red {
          color: red;
        }
      }
    }
  }
  .fast_input {
    h4 {
      display: flex;
      justify-content: space-between;
      font-size: 40 / @r;
      color: #999;
      span {
        padding: 66 / @r 0 52 / @r;
      }
      em {
        padding: 66 / @r 15 / @r 52 / @r;
        &.blue {
          color: @blue;
        }
      }
    }
  }
  .text_box {
    display: flex;
    flex-wrap: wrap;
    span {
      font-size: 36 / @r;
      line-height: 46 / @r;
      color: #666;
      padding: 20 / @r 25 / @r;
      border: 1px solid #ddd;
      border-radius: 6 / @r;
      margin: 0 30 / @r 30 / @r 0;
      position: relative;
      i {
        display: block;
        padding: 10 / @r;
        position: absolute;
        right: -30 / @r;
        top: -30 / @r;
        font-size: 40 / @r;
      }
      &.dis {
        opacity: 0.5;
      }
    }
  }
}
</style>