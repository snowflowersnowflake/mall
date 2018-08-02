<template>
  <div class="rate_page">
    <header>
      <div class="back" @click="$router.back(-1)">
        <i class="el-icon-arrow-left"></i>
      </div>
      <section class="coin" v-show="!readOnly">
        <p>
          <span>金币{{coin}}</span>/{{coinMax}}</p>
        <div class="outer">
          <div class="inner" :style="{'width':(coin/coinMax)*100 + '%'}"></div>
        </div>
      </section>
    </header>
    <div class="body">
      <scroll ref="scroll" :listenScroll="true" :probeType="2" @scroll="scroll_">
        <div class="blank">
          <div class="head">
            <div class="left">
              <div class="img_box">
                <img src="static/rider.png" alt="">
              </div>
              <span>黄翔</span>
              <em>蜂鸟转送</em>
            </div>
            <div class="right">
              <span>已对骑手匿名</span>
            </div>
          </div>
          <div class="white_bg">
            <h4>配送评价</h4>
            <div class="coin_wrap">
              <transition name="float">
                <div class="addCoin" v-show="!faceScore">金币+{{scoreCoin}}</div>
              </transition>
              <el-rate class="face_rate" :disabled="readOnly" v-model="faceScore" :max="3" :icon-classes="['iconfont icon-frown', 'iconfont icon-meh', 'iconfont icon-smile']" :low-threshold="1" :high-threshold="3" void-icon-class="iconfont icon-meh" :colors="colorArr" void-color="#ababab" @change="faceTextColorChange" />
              <div class="face_text">
                <span :style="{'color':faceScore>0?voidColor:'#ababab'}">非常差</span>
                <span :style="{'color':faceScore>1?voidColor:'#ababab'}">一般</span>
                <span :style="{'color':faceScore>2?voidColor:'#ababab'}">超赞</span>
              </div>
            </div>
            <div class="read_tag" v-if="readOnly&&readTag.length" :style="{'color':voidColor}">
              <span v-for="item in readTag" :key="item">“{{item}}”</span>
            </div>
            <transition name="fade">
              <div class="tags" v-show="!readOnly&&faceScore">
                <span v-for="(item,index) in tags" :class="{'active':Boolean(chooseTag[index])}" :key="item" @click="addTag(index)">{{item}}</span>
              </div>
            </transition>
          </div>
        </div>
        <div class="blank" ref="shopBlank">
          <div class="head">
            <div class="left">
              <div class="img_box">
                <img v-lazy="bill.imgUrl" alt="">
              </div>
              <span>{{bill.storeName}}</span>
            </div>
            <div class="right" v-show="!readOnly" @click="anonymousToggle">
              <i class="el-icon-success" :class="{'active':anonymous}"></i>
              <span>匿名评价</span>
            </div>
          </div>
          <div class="white_bg">
            <h4>商店评价</h4>
            <div class="coin_wrap">
              <transition name="float">
                <div class="addCoin" v-show="!shopScore">金币+{{scoreCoin}}</div>
              </transition>
              <el-rate class="shop_rate" :disabled="readOnly" v-model="shopScore" :texts="texts" :colors="colorArr" void-color="#ababab" :high-threshold="5" show-text :text-color="TextColorChange(shopScore)" />
            </div>

            <div class="detail">
              <transition name="fade">
                <div v-show="shopScore">
                  <div class="rate_wrap">
                    <span>包装</span>
                    <el-rate class="sm" :disabled="readOnly" v-model="wrapScore" :texts="texts" :colors="colorArr" void-color="#ababab" :high-threshold="5" :text-color="TextColorChange(wrapScore)" show-text/>
                  </div>
                  <div class="rate_wrap">
                    <span>味道</span>
                    <el-rate class="sm" :disabled="readOnly" v-model="tasteScore" :texts="texts" :colors="colorArr" void-color="#ababab" :high-threshold="5" :text-color="TextColorChange(tasteScore)" show-text/>
                  </div>
                </div>
              </transition>
              <transition name="fade">
                <div class="input_wrap" ref="textarea" v-show="!readOnly&&shopScore&&wrapScore&&tasteScore">
                  <textarea v-model="text" @input="textTrim" placeholder="餐点味道好，包装也仔细，下次还会点" />
                  <p>评价文字获得
                    <span>{{textCoin}}金币</span>
                  </p>
                </div>
              </transition>
              <div v-if="readOnly" class="read_text">
                <p>{{text}}</p>
              </div>
            </div>
            <div v-if="readOnly" class="edit_box" @click="openEdit">
              <img src="static/eraser.png" alt="">
              <span>修改评价</span>
            </div>
          </div>

        </div>
        <div class="blank" v-if="!readOnly&&(attitudes.length||bill.cart)&&shopScore&&wrapScore&&tasteScore">
          <div class="white_bg off">
            <div>
              <h4>有没有不错或者较差的食物?</h4>
              <ul class="foos_list">
                <li v-for="(item,index) in attitudes" :key="index">
                  <div class="name">
                    {{item.name}}
                  </div>
                  <div class="attitude">
                    <i class="fa fa-thumbs-o-up" :class="{'fa-thumbs-up':item.attitude==1}" @click="like(item)"></i>
                    <i class="fa fa-thumbs-o-down flip" :class="{'fa-thumbs-down':item.attitude==2}" @click="dislike(item)"></i>
                  </div>
                </li>
              </ul>
            </div>
            
          </div>
        </div>
        <div class="blank" v-if="readOnly&&haveAttitudesGood">
          <div class="white_bg">
            <div>
              <ul class="read_list"  v-show="haveAttitudesGood">
                <li v-for="(item,index) in attitudes" :key="index">
                  <i class="fa" :class="{'fa-thumbs-down':item.attitude==2,'fa-thumbs-up':item.attitude==1}"></i>
                  <span>{{item.name}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="mat" v-show="!readOnly&&shopScore&&!dirty"></div>
        <div class="mat30"></div>
      </scroll>
    </div>
    <footer v-if="!readOnly">
      <button type="button" class="sub" v-if="faceScore&&shopScore&&wrapScore&&tasteScore" @click="sub">提交评价</button>
      <button type="button" v-else>请评价配送满意度</button>
    </footer>
    <mt-popup v-if="readOnly" v-model="editSwitch" position="right" class="edit_rate">
      <header>
        <div class="back" @click="closeEdit">
          <i class="el-icon-arrow-left"></i>
        </div>
        <h4>编辑评价</h4>
      </header>
      <div class="body">
        <div class="blank">
          <div class="head">
            <div class="left">
              <div class="img_box">
                <img v-lazy="bill.imgUrl" alt="">
              </div>
              <span>{{bill.storeName}}</span>
            </div>
          </div>
          <div class="white_bg">
            <h4>商店评价</h4>
            <div class="coin_wrap">
              <el-rate class="shop_rate" v-model="shopScore" :texts="texts" :colors="colorArr" void-color="#ababab" :high-threshold="5" show-text :text-color="TextColorChange(shopScore)" />
            </div>

            <div class="detail">
              <div v-show="shopScore">
                <div class="rate_wrap">
                  <span>包装</span>
                  <el-rate class="sm" v-model="wrapScore" :texts="texts" :colors="colorArr" void-color="#ababab" :high-threshold="5" :text-color="TextColorChange(wrapScore)" show-text/>
                </div>
                <div class="rate_wrap">
                  <span>味道</span>
                  <el-rate class="sm" v-model="tasteScore" :texts="texts" :colors="colorArr" void-color="#ababab" :high-threshold="5" :text-color="TextColorChange(tasteScore)" show-text/>
                </div>
              </div>
              <div class="input_wrap" ref="textarea" v-show="shopScore&&wrapScore&&tasteScore">
                <textarea v-model="text" @input="textTrim" placeholder="餐点味道好，包装也仔细，下次还会点" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <button type="button" class="sub" v-if="isChange" @click="subEdit">保存评价</button>
        <button type="button" v-else>保存评价</button>
      </footer>
    </mt-popup>

  </div>
</template>

<script>
import scroll from "@/components/scroll";
import { CartCtrl } from "@/api/store/cart";
import { Toast, Indicator, MessageBox } from "mint-ui";
export default {
  data() {
    return {
      faceScore: 0,
      shopScore: 0,
      wrapScore: 0,
      tasteScore: 0,
      voidColor: "#ababab",
      colorArr: ["#8f9cae", "#ffb51c", "#ff6a34"],
      shopRateTextColor: "#ababab",
      bill: {},
      texts: ["非常差", "差", "一般", "满意", "超赞"],
      tags: [
        "送餐快",
        "餐品完好",
        "服务态度好",
        "准时到达",
        "穿着专业",
        "衣着整洁"
      ],
      chooseTag: {},
      dirty: false,
      anonymous: false,
      scoreCoin: 0,
      textCoin: 0,
      coin: 0,
      coinMax: 12,
      text: "",
      attitudes: [],
      readOnly: false,
      editSwitch: false,
      cache: {
        shopScore: 0,
        wrapScore: 0,
        tasteScore: 0,
        text: ""
      }
    };
  },
  methods: {
    scroll_() {
      if (this.dirty == false) {
        this.dirty = true;
        this.$refs.scroll.refresh();
      }
    },
    faceTextColorChange(value) {
      this.voidColor = this.colorArr[value - 1];
    },
    TextColorChange(value) {
      switch (parseFloat(value)) {
        case 1:
        case 2:
          return "#8f9cae";
          break;
        case 3:
        case 4:
          return "#ffb51c";
          break;
        case 5:
          return "#ff6a34";
          break;
      }
    },
    addTag(index) {
      if (typeof this.chooseTag[index] == "undefined") {
        this.$set(this.chooseTag, index, true);
      } else {
        this.$set(this.chooseTag, index, !this.chooseTag[index]);
      }
    },
    like(food) {
      food.attitude = 1;
    },
    dislike(food) {
      food.attitude = 2;
    },
    anonymousToggle() {
      this.anonymous = !this.anonymous;
    },
    textTrim() {
      this.text = this.text.trim();
    },
    openEdit() {
      this.editSwitch = true;
    },
    closeEdit() {
      this.editSwitch = false;
    },
    init_() {
      this.billId = this.$route.query.billId;
      this.ctrl
        .getBill({ billId: this.billId })
        .then(d => {
          d = d.data;
          if (d.status == 1) {
            if (d.data.status == 1) {
              this.attitudes = d.data.cart.map((item, i) => {
                var obj = {
                  attitude: 0,
                  name: item.name,
                  product_id: item.product_id,
                  category: item.category
                };
                return obj;
              });
              this.bill = d.data;
              this.coinMax = Math.ceil(d.data.totalPrice / 2);
              this.scoreCoin = Math.ceil(this.coinMax * 0.3);
              this.textCoin = this.coinMax - this.scoreCoin * 2;
            } else if (d.data.status == 10) {
              var evaluation = d.data.evaluation;
              this.readOnly = true;
              this.faceScore = evaluation.riderScore;
              this.faceTextColorChange(this.faceScore);
              this.shopScore = evaluation.shopScore;
              this.wrapScore = evaluation.wrapScore;
              this.tasteScore = evaluation.tasteScore;
              this.bill.imgUrl = d.data.imgUrl;
              this.bill._id = d.data._id;
              this.attitudes = evaluation.attitudes;
              this.text = evaluation.text;
              this.readTag = evaluation.riderTags.split(",");
              this.cache.shopScore = this.shopScore;
              this.cache.wrapScore = this.wrapScore;
              this.cache.tasteScore = this.tasteScore;
              this.cache.text = this.text;
            }
          }

          Indicator.close();
        })
        .catch(e => {});
    },
    sub() {
      var tagArr = [];
      for (var attr in this.chooseTag) {
        if (this.chooseTag[attr]) {
          tagArr.push(this.tags[attr]);
        }
      }
      var tagStr = tagArr.join(",");
      var obj = {
        billId: this.billId,
        riderTags: tagStr,
        riderScore: this.faceScore,
        shopScore: this.shopScore,
        wrapScore: this.wrapScore,
        tasteScore: this.tasteScore,
        attitudes: this.attitudes,
        anonymous: this.anonymous,
        text: this.text
      };

      this.ctrl
        .subEvaluation(obj)
        .then(d => {
          d = d.data;
          if (d.status == 1) {
            this.$router.back(-1);
          } else {
            Toast({
              message: d.msg,
              position: "bottom"
            });
          }
          Indicator.close();
        })
        .catch(e => {
          console.log(e);
        });
    },
    subEdit() {
      this.ctrl.editEvaluation({
        shopScore:this.shopScore,
        wrapScore:this.wrapScore,
        tasteScore:this.tasteScore,
        text:this.text,
        billId: this.bill._id
      }).then(d => {
        d = d.data;
        if(d.status==1) {
          Toast({
            message: '修改成功',
            position: 'bottom'
          })
          this.$router.back(-1)
        }
        Indicator.close()
      }).catch(e=>{
        console.log(e)
      })
    }
  },
  components: {
    scroll
  },
  computed: {
    isChange() {
      return (
        this.cache.shopScore != this.shopScore ||
        this.cache.wrapScore != this.wrapScore ||
        this.cache.tasteScore != this.tasteScore ||
        this.cache.text != this.text
      );
    },
    haveAttitudesGood() {
      return this.attitudes.some( item => {
        return item.attitude
      })
    }
  },
  created() {
    this.ctrl = new CartCtrl();
    this.init_();
  },
  watch: {
    faceScore(n, o) {
      if (o == 0) {
        this.coin += this.scoreCoin;
      }
    },
    shopScore(newVal, oldVal) {
      if (oldVal == 0) {
        this.coin += this.scoreCoin;
        this.dirty = false;
        setTimeout(() => {
          this.$refs.scroll.scrollToElement(this.$refs.shopBlank, 500, 0, true);
        }, 200);
      }
    },
    wrapScore(n, o) {
      if (n && this.tasteScore) {
        setTimeout(() => {
          this.$refs.scroll.scrollToElement(this.$refs.textarea, 500, 0, true);
        }, 200);
      }
    },
    tasteScore(n, o) {
      if (n && this.tasteScore) {
        setTimeout(() => {
          this.$refs.scroll.scrollToElement(this.$refs.textarea, 500, 0, true);
        }, 200);
      }
    },
    text(n, o) {
      if (o.length == 0 && n.length > 0) {
        this.coin += this.textCoin;
      } else if (o.length > 0 && n.length == 0) {
        this.coin -= this.textCoin;
      }
    }
  }
};
</script>

<style lang='less'>
@import "~@/style/base.less";
.rate_page {
  background-color: #f5f5f5 !important;
  display: flex;
  flex-direction: column;
  position: relative;
  .mat {
    height: 1000 / @r;
  }
  .mat30 {
    height: 30 / @r;
  }
  header {
    position: relative;
    height: 188 / @r;
    z-index: 20;
    flex: none;
    padding-top: 84 / @r;
    .back {
      position: absolute;
      top: 50 / @r;
      left: 20 / @r;
      padding: 40 / @r;
      color: #707070;
      font-size: 56 / @r;
      z-index: 20;
    }
    .coin {
      width: 430 / @r;
      margin: 0 auto;
      p {
        font-size: 42 / @r;
        text-align: center;
        color: #999;
        padding-bottom: 16 / @r;
        span {
          color: #ffaa0c;
        }
      }
      .outer {
        height: 12 / @r;
        background-color: #e7e7e7;
        border-radius: 6 / @r;
        overflow: hidden;
        .inner {
          height: 100%;
          width: 60%;
          background-color: #ffaa0c;
          border-radius: 6 / @r;
          transition: 0.5s;
        }
      }
    }
  }
  .body {
    flex: 1;
    padding: 0 48 / @r;
    overflow: scroll;
    .blank {
      margin-bottom: 35 / @r;
      .head {
        height: 190 / @r;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
          display: flex;
          align-items: center;
          .img_box {
            width: 114 / @r;
            height: 114 / @r;
            border-radius: 6 / @r;
            border: 1px solid rgba(0, 0, 0, 0.1);
            overflow: hidden;
            img {
              height: 100%;
              width: 100%;
            }
          }
          span {
            font-size: 42 / @r;
            color: #333;
            margin-left: 32 / @r;
          }
          em {
            margin-left: 16 / @r;
            padding: 10 / @r;
            border-radius: 6 / @r;
            font-size: 26 / @r;
            color: #fff;
            background: linear-gradient(to right, #02aaff, #0387ff);
          }
        }
        .right {
          display: flex;
          align-items: center;
          i {
            font-size: 52 / @r;
            color: #999;
            &.active {
              color: #00e066;
            }
          }
          span {
            font-size: 34 / @r;
            color: #999;
            margin-left: 20 / @r;
          }
        }
      }
      .white_bg {
        background-color: #fff;
        border-radius: 6 / @r;
        box-shadow: 0 10 / @r 10 / @r 0 rgba(10, 10, 10, 0.05);
        padding: 80 / @r 30 / @r;
        position: relative;
        .coin_wrap {
          position: relative;
          .addCoin {
            font-weight: bold;
            text-align: center;
            color: #ffaa0c;
            font-size: 50 / @r;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            opacity: 0;
          }
        }
        h4 {
          text-align: center;
          font-size: 48 / @r;
          color: #333;
          font-weight: bold;
          padding-bottom: 78 / @r;
        }
        .face_rate {
          text-align: center;
          font-size: 0;
          height: auto;
          .el-rate__item {
            .el-rate__icon {
              font-size: 110 / @r;
              margin: 0 54 / @r;
            }
          }
        }
        .face_text {
          display: flex;
          justify-content: center;
          padding: 22 / @r 0 55 / @r;
          span {
            width: 110 / @r;
            text-align: center;
            margin: 0 54 / @r;
            font-size: 34 / @r;
          }
        }
        .read_tag {
          font-size: 42 / @r;
          text-align: center;
          span {
            line-height: 50 / @r;
            &:last-child {
              &:after {
                content: "";
              }
            }
            &:after {
              content: "，";
            }
          }
        }
        .tags {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          span {
            padding: 22 / @r 30 / @r;
            border: 1px solid #e2e2e2;
            border-radius: 6 / @r;
            font-size: 34 / @r;
            color: #a1a1a1;
            margin: 24 / @r 12 / @r 0;
            &.active {
              color: @blue;
              border-color: @blue;
            }
          }
        }
        .shop_rate {
          text-align: center;
          font-size: 0;
          height: auto;
          .el-rate__item {
            .el-rate__icon {
              font-size: 85 / @r;
              margin: 0 26 / @r;
            }
          }
          .el-rate__text {
            display: block;
            padding-top: 26 / @r;
            font-size: 36 / @r;
          }
        }
        .detail {
          padding-top: 30 / @r;
          .rate_wrap {
            padding-top: 40 / @r;
            display: flex;
            justify-content: center;
            align-items: center;
            > span {
              font-size: 44 / @r;
              color: #333;
              margin-right: 18 / @r;
            }
            .sm {
              text-align: center;
              height: auto;
              font-size: 0;
              .el-rate__item {
                .el-rate__icon {
                  font-size: 64 / @r;
                  margin: 0 18 / @r;
                }
              }
              .el-rate__text {
                margin-left: 18 / @r;
                font-size: 34 / @r;
              }
            }
          }
          .input_wrap {
            margin-top: 68 / @r;
            height: 300 / @r;
            background-color: #fafafa;
            padding: 40 / @r;
            display: flex;
            flex-direction: column;
            textarea {
              flex: 1;
              height: 0;
              border: none;
              resize: none;
              background-color: initial;
              font-size: 32 / @r;
              color: #000;
              line-height: 40 / @r;
            }
            p {
              flex: none;
              height: 36 / @r;
              margin-top: 30 / @r;
              font-size: 36 / @r;
              color: #666;
              text-align: right;
              span {
                color: #ffaa0c;
                letter-spacing: 4 / @r;
                margin-left: 8 / @r;
              }
            }
          }
          .read_text {
            margin-top: 70 / @r;
            padding: 0 36 / @r 60 / @r;
            p {
              padding: 70 / @r 0;
              border-top: 1px dashed #ddd;
              word-wrap: break-word;
              font-size: 40 / @r;
              color: #333;
              line-height: 50 / @r;
            }
          }
        }
        .edit_box {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 142 / @r;
          border-top: 2 / @r dashed #ddd;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            height: 44 / @r;
            margin-right: 10 / @r;
          }
          span {
            font-size: 40 / @r;
            color: #999;
          }
        }
        .foos_list {
          li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .name {
              flex: 1;
              height: 40 / @r;
              width: 0;
              font-size: 40 / @r;
              color: #696969;
              .text_one_line;
            }
            .attitude {
              display: flex;
              justify-content: space-between;
              align-items: center;
              i {
                font-size: 50 / @r;
                padding: 20 / @r;
                margin: 0 20 / @r;
                color: #ababab;
                &.fa-thumbs-up {
                  color: #ff731c;
                }
                &.fa-thumbs-down {
                  color: #8f9cae;
                }
                &.flip {
                  transform: scaleX(-1);
                }
              }
            }
          }
        }
        .read_list {
          li {
            font-size: 50 / @r;
            color: #696969;
            display: flex;
            padding: 20 / @r 36 / @r;
            i {
              margin-right: 26 / @r;
              flex: none;
              &.fa-thumbs-up {
                color: #ff731c;
              }
              &.fa-thumbs-down {
                color: #8f9cae;
              }
            }
            span {
              flex: 1;
              width: 0;
              font-size: 40 / @r;
              line-height: 50 / @r;
              .text_one_line;
            }
          }
        }
        &.off {
          &:before {
            display: none;
          }
        }
        &:before {
          display: block;
          content: "";
          width: 26 / @r;
          height: 26 / @r;
          border-radius: 4 / @r;
          background-color: #fff;
          position: absolute;
          top: -13 / @r;
          left: 40 / @r;
          transform: rotate(45deg);
        }
      }
    }
  }
  footer {
    flex: none;
    padding: 48 / @r;
    height: 228 / @r;
    button {
      width: 100%;
      border: none;
      height: 132 / @r;
      line-height: 132 / @r;
      text-align: center;
      font-size: 48 / @r;
      border-radius: 6 / @r;
      background-color: #e5e5e5;
      color: #8e8e8e;
      &.sub {
        background-color: @blue;
        color: #fff;
      }
    }
  }
  .float-leave-active {
    animation: bounce-out 1s;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .edit_rate {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #f5f5f5;
    header {
      text-align: center;
      h4 {
        font-size: 50 / @r;
        display: inline;
      }
    }
  }
}
@keyframes bounce-out {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-200%);
  }
}
</style>