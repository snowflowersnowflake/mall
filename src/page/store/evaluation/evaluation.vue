<template>
  <div class="evaluation___">
    <div class="wrap_2">
      <scroll ref="scroll" :listenScroll="true" :probeType="2" @scroll="emitScroll" :pullup="true" @scrollToEnd="pulldown_">
        <div class="evaluation_read_wrap">
          <div class="overview">
            <div class="left">
              <div class="main_core">{{store.score}}</div>
              <p>综合评分</p>
              <section>高于周边商家59.6%</section>
            </div>
            <div class="right">
              <ul>
                <li>
                  <span class="title">服务态度</span>
                  <el-rate v-model="core.fw" disabled show-score text-color="#ff5339" score-template="{value}">
                  </el-rate>
                </li>
                <li>
                  <span class="title">商品评分</span>
                  <el-rate v-model="core.sp" disabled show-score text-color="#ff5339" score-template="{value}">
                  </el-rate>
                </li>
                <li>
                  <span class="title">送达时间</span>
                  <div class="time">25分钟</div>
                </li>
              </ul>
            </div>
          </div>
          <div class="eval_bottom">
            <div class="eval_bottom_wrap">
              <div class="filter">
                <span :class="{'active':filterType==1}" @click="filterType=1">全部</span>
                <span :class="{'active':filterType==2}" @click="filterType=2">最新</span>
                <span :class="{'active':filterType==3}" @click="filterType=3">好评</span>
                <span class="bad" :class="{'active':filterType==4}" @click="filterType=4">差评</span>
              </div>
            </div>
            <div class="eval_list">
              <ul>
                <li v-for="(item,index) in completeData" :key="index">
                  <div class="user_">
                    <div class="user_wrap">
                      <div class="img_box">
                        <img src="static/avatar.png" alt="">
                      </div>
                      <div class="core">
                        <h3>{{item.name}}</h3>
                        <el-rate v-model="item.core" disabled show-text text-color="#ff9900" score-template="{value}">
                        </el-rate>
                      </div>
                    </div>
                    <div class="time">
                      {{item.time}}
                    </div>
                  </div>
                  <p>{{item.msg}}</p>
                </li>
              </ul>
              <div class="loading">
                <i class="el-icon-loading"></i>
                数据加载中
              </div>
            </div>
          </div>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import scroll from "@/components/scroll";
import { mapState } from "vuex";
export default {
  data() {
    return {
      core: {
        fw: 4.9,
        sp: 5.0
      },
      data: [],
      tips: [],
      filterType: 1
    };
  },
  methods: {
    emitScroll(pos) {
      this.$emit("scroll", pos);
    },
    pulldown_() {
      this.createEval();
      this.$nextTick(() => {
        this.$refs.scroll.refresh();
      });
    },
    createEval() {
      var n = 10;
      var arr = [];
      while (n--) {
        var obj = {};
        obj.core = Math.round(Math.random() * 40 + 10) / 10;
        var nameStart = String.fromCharCode(
          Math.floor(Math.random() * 26 + 65)
        );
        var nameEnd = String.fromCharCode(Math.floor(Math.random() * 26 + 97));
        obj.name = `${nameStart}******${nameEnd}`;
        var randomMsg = Math.floor(Math.random() * (this.tips.length - 1));
        obj.msg = this.tips[randomMsg];
        var time = new Date();
        time.setDate(time.getDate() - Math.floor(Math.random() * 50));
        obj.time = time.toLocaleDateString();
        arr.push(obj);
      }
      this.data = this.data.concat(arr);
    }
  },
  components: {
    scroll
  },
  computed: {
    completeData() {
      switch (parseInt(this.filterType)) {
        case 1:
          return this.data;
          break;
        case 2:
          var arr = [...this.data];
          arr.sort((a, b) => {
            a = a.time.split("/");
            a.forEach((item, index) => {
              if (item.length < 2) {
                a[index] = "0" + item;
              }
            });
            a = a.join("");
            b = b.time.split("/");
            b.forEach((item, index) => {
              if (item.length < 2) {
                b[index] = "0" + item;
              }
            });
            b = b.join("");
            return a < b;
          });
          return arr;
          break;
        case 3:
          return this.data.filter(item => {
            return item.core > 3;
          });
          break;
        case 4:
          return this.data.filter(item => {
            return item.core <= 2;
          });
          break;
      }
    },
    ...mapState({
      store: state => state.store.store_
    })
  },
  created() {
    this.tips[0] = "生活是不公平的，你要去适应它。";
    this.tips[1] = "送人玫瑰，手流余香。";
    this.tips[2] =
      "我们有不同的籍贯、不同的年龄、不同的习惯、不同的经历，但有一点我们是相同的，那就是都有一颗：爱心。";
    this.tips[3] = "锦上添花固然好,雪中送炭更可贵。";
    this.tips[4] = "伸出您的友爱之手,让更多的孩子重返校园。";
    this.tips[5] =
      "如果你陷入困境，那不是你父母的过错，不要将你理应承担的责任转嫁给他人，而要学着从中吸取教训。";
    this.tips[6] = "爱心一片,真情永远。";
    this.tips[7] = "聆听心声,实现愿望。";
    this.tips[8] =
      "走出学校后的生活不像在学校一样有学期之分，也没有暑假之说。没有几位老板乐于帮你发现自我，你必须依靠自己去完成。";
    this.tips[9] =
      "电视中的许多场景决不是真实的生活。在现实生活中，人们必须埋头做自己的工作，而非像电视里演的那样天天泡在咖啡馆里。";
    this.tips[10] =
      "善待你所厌恶的人，因为说不定哪一天你就会为这样的一个人工作。";
    this.tips[11] =
      "人生应该如蜡烛一样，从顶燃到底，一直都是光明的。 —— 萧楚女";
    this.tips[12] = "人生的价值，即以其人对于当代所做的工作为尺度。 —— 徐玮";
    this.tips[13] =
      "路是脚踏出来的，历史是人写出来的。人的每一步行动都在书写自己的历史。 —— 吉鸿昌";
    this.tips[14] =
      "春蚕到死丝方尽，人至期颐亦不休。一息尚存须努力，留作青年好范畴。 —— 吴玉章";
    this.tips[15] = "但愿每次回忆，对生活都不感到负疚 —— 郭小川";
    this.tips[16] =
      "人的一生可能燃烧也可能腐朽，我不能腐朽，我愿意燃烧起来！ —— 奥斯特洛夫斯基";
    this.tips[17] = "你若要喜爱你自己的价值，你就得给世界创造价值。 —— 歌德";
    this.tips[18] = "社会犹如一条船，每个人都要有掌舵的准备。 —— 易卜生";
    this.tips[19] =
      "人生不是一种享乐，而是一桩十分沉重的工作。 —— 列夫·托尔斯泰";
    this.tips[20] =
      "人生的价值，并不是用时间，而是用深度去衡量的。 —— 列夫·托尔斯泰";
    this.tips[21] =
      "生活只有在平淡无味的人看来才是空虚而平淡无味的。 —— 车尔尼雪夫斯基";
    this.tips[22] =
      "一个人的价值，应该看他贡献什么，而不应当看他取得什么。 —— 爱因斯坦";
    this.tips[23] =
      "人只有献身于社会，才能找出那短暂而有风险的生命的意义。 —— 爱因斯坦";
    this.tips[24] = "芸芸众生，孰不爱生？爱生之极，进而爱群。 —— 秋瑾";
    this.tips[25] =
      "生活真象这杯浓酒，不经三番五次的提炼呵，就不会这样可口！ —— 郭小川";
    this.tips[26] =
      "充满着欢乐与斗争精神的人们，永远带着欢乐，欢迎雷霆与阳光。 —— 赫胥黎";
    this.tips[27] = "春风吹柳,雨润大地。";
    this.tips[28] = "为了生活中努力发挥自己的作用，热爱人生吧。 —— 罗丹";
    this.tips[29] =
      "希望是附丽于存在的，有存在，便有希望，有希望，便是光明。 —— 鲁迅";
    this.tips[30] = "沉沉的黑夜都是白天的前奏。 —— 郭小川";
    this.tips[31] =
      "当一个人用工作去迎接光明，光明很快就会来照耀着他。 —— 冯学峰";
    this.tips[32] = "东天已经到来，春天还会远吗？ —— 雪莱";
    this.tips[33] = "过去属于死神，未来属于你自己。 —— 雪莱";
    this.tips[34] = "世间的活动，缺点虽多，但仍是美好的。 —— 罗丹";
    this.tips[35] = "辛勤的蜜蜂永没有时间悲哀。 —— 布莱克";
    this.tips[36] = "希望是厄运的忠实的姐妹。 —— 普希金";
    this.tips[37] = "当你的希望一个个落空，你也要坚定，要沉着！ —— 朗费罗";
    this.tips[38] = "先相信你自己，然后别人才会相信你。 —— 屠格涅夫";
    this.tips[39] = "不要慨叹生活底痛苦！---慨叹是弱者...... —— 高尔基";
    this.tips[40] = "宿命论是那些缺乏意志力的弱者的借口。 —— 罗曼·罗兰";
    this.tips[41] = "春回人间,真情奉献。";
    this.tips[42] = "私心胜者，可以灭公。 —— 林逋";
    this.tips[43] = "人人好公，则天下太平；人人营私，则天下大乱。 —— 刘鹗";
    this.tips[44] = "自私自利之心，是立人达人之障。 —— 吕坤";
    this.tips[45] = "如烟往事俱忘却，心底无私天地宽。 —— 陶铸";
    this.tips[46] = "常求有利别人，不求有利自己。 —— 谢觉哉";
    this.tips[47] =
      "一切利己的生活，都是非理性的，动物的生活。 —— 列夫·托尔斯泰";
    this.tips[48] = "人的理性粉碎了迷信，而人的感情也将摧毁利己主义。 —— 海涅";
    this.tips[49] = "无私是稀有的道德，因为从它身上是无利可图的。 —— 布莱希特";
    this.tips[50] = "君子喻于义，小人喻于利。 —— 孔丘";
    this.tips[51] = "不戚戚于贫贱，不汲汲于富贵。 —— 陶渊明";
    this.tips[52] = "富贵不淫贫贱乐，男儿到此是豪雄。 —— 程颢";
    this.tips[53] =
      "清贫，洁白朴素的生活，正是我们革命者能够战胜许多困难的地方！ —— 方志敏";
    this.tips[54] = "三军可夺帅也,匹夫不可夺志也。 —— 孔丘";
    this.tips[55] = "志不强者智不达。 —— 墨翟";
    this.tips[56] = "燕雀安知鸿鹄之志哉！ —— 陈涉";
    this.tips[57] = "志当存高远。 —— 诸葛亮";
    this.tips[58] = "老骥伏枥，志在千里；烈士暮年，壮心不已。 —— 曹操";
    this.tips[59] = "燕雀戏藩柴，安识鸿鹄游。 —— 曹植";
    this.tips[60] = "穷且益坚，不坠青云之志。 —— 王勃";
    this.tips[61] = "大鹏一日同风起，扶摇直上九万里。 —— 李白";
    this.tips[62] =
      "古之立大事者，不惟有超世之才，亦必有坚忍不拔之志。 —— 苏轼";
    this.tips[63] =
      "生当作人杰，死亦为鬼雄，至今思项羽，不肯过江东。 —— 李清照";
    this.tips[64] = "壮心未与年俱老，死去犹能作鬼雄。 —— 陆游";
    this.tips[65] = "故立志者，为学之心也；为学者，立志之事也。 —— 王阳明";
    this.tips[66] = "贫不足羞，可羞是贫而无志。 —— 吕坤";
    this.tips[67] =
      "我们以人们的目的来判断人的活动。目的伟大，活动才可以说是伟大的。 —— 契诃夫";
    this.tips[68] = "毫无理想而又优柔寡断是一种可悲的心理。 —— 培根";
    this.tips[69] = "生活的理想，就是为了理想的生活。 —— 张闻天";
    this.tips[70] =
      "人，只要有一种信念，有所追求，什么艰苦都能忍受，什么环境也都能适应。 —— 丁玲";
    this.tips[71] =
      "理想的人物不仅要在物质需要的满足上，还要在精神旨趣的满足上得到表现。 —— 黑格尔";
    this.tips[72] = "一个能思想的人，才真是一个力量无边的人。 —— 巴尔扎克";
    this.tips[73] =
      "一个没有受到献身的热情所鼓舞的人，永远不会做出什么伟大的事情来。 —— 车尔尼雪夫斯基";
    this.tips[74] =
      "共同的事业，共同的斗争，可以使人们产生忍受一切的力量。 —— 奥斯特洛夫斯基";
    this.tips[75] =
      "我从来不把安逸和快乐看作是生活目的本身---这种伦理基础，我叫它猪栏的理想。 —— 爱因斯坦";
    this.tips[76] =
      "在一个人民的国家中还要有一种推动的枢纽，这就是美德。 —— 孟德斯鸠";
    this.tips[77] = "人不能象走兽那样活着，应该追求知识和美德。 —— 但丁";
    this.tips[78] =
      "勿以恶小而为之，勿以善小而不为。惟贤惟德，能服于人。 —— 刘备";
    this.tips[79] =
      "不患位之不尊，而患德之不崇；不耻禄之不伙，而耻智之不博。 —— 张衡";
    this.tips[80] = "土扶可城墙，积德为厚地。 —— 李白";
    this.tips[81] = "行一件好事，心中泰然；行一件歹事，衾影抱愧。 —— 神涵光";
    this.tips[82] =
      "入于污泥而不染、不受资产阶级糖衣炮弹的侵蚀，是最难能可贵的革命品质。—— 周恩来";
    this.tips[83] = "一个人最伤心的事情无过于良心的死灭。 —— 郭沫若";
    this.tips[84] =
      "害羞是畏惧或害怕羞辱的情绪，这种情绪可以阻止人不去犯某些卑鄙的行为。 —— 斯宾诺莎";
    this.tips[85] =
      "应该热心地致力于照道德行事，而不要空谈道德。 —— 德谟克利特";
    this.tips[86] =
      "感情有着极大的鼓舞力量，因此，它是一切道德行为的重要前提。 —— 凯洛夫";
    this.tips[87] =
      "没有伟大的品格，就没有伟大的人，甚至也没有伟大的艺术家，伟大的行动者。 —— 罗曼·罗兰";
    this.tips[88] = "理智要比心灵为高，思想要比感情可靠。 —— 高尔基";
    this.tips[89] = "顶级培训网 让我们携手一起成长 ";
    this.tips[90] = "人类被赋予了一种工作，那就是精神的成长。 —— 列夫·托尔斯泰";
    this.tips[91] =
      "人在智慧上应当是明豁的，道德上应该是清白的，身体上应该是清洁的。 —— 契诃夫";
    this.tips[92] = "良心是由人的知识和全部生活方式来决定的。 —— 马克思";
    this.tips[93] =
      "不念居安思危，戒奢以俭；斯以伐根而求木茂，塞源而欲流长也。 —— 魏徵";
    this.tips[94] = "历览前贤国与家，成由勤俭破由奢。 —— 李商隐";
    this.tips[95] =
      "把“德性”教给你们的孩子：使人幸福的是德性而非金钱。这是我的经验之谈。在患难中支持我的是道德，使我不曾自杀的，除了艺术以外也是道德。 —— 贝多芬";
    this.tips[96] = "如果道德败坏了，趣味也必然会堕落。——狄德罗";
    this.tips[97] =
      "我愿证明，凡是行为善良与高尚的人，定能因之而担当患难。 —— 贝多芬";
    this.tips[98] =
      "装饰对于德行也同样是格格不入的，因为德行是灵魂的力量和生气。 —— 卢梭";
    this.tips[99] =
      "我深信只有有道德的公民才能向自己的祖国致以可被接受的敬礼。 —— 卢梭";
    this.tips[100] =
      "懒人图库-网页素材下载站 - 学会偷懒，并懒出境界是提高工作效率最有效的方法！";
    this.tips[101] =
      "对于事实问题的健全的判断是一切德行的真正基础。 —— 夸美纽斯";
    this.tips[102] = "德行的实现是由行为，不是由文字。 —— 夸美纽斯";
    this.tips[103] =
      "霸祖孤身取二江，子孙多以百城降。豪华尽出成功后，逸乐安知与祸双？ —— 王安石";
    this.tips[104] = "阴谋陷害别人的人，自己会首先遭到不幸。 —— 伊索";
    this.tips[105] =
      "奢则妄取苟取，志气卑辱；一从俭约，则于人无求，于己无愧，是可以养气也。 —— 罗大经";
    this.tips[106] = "侈则多欲。君子多欲则念慕富贵，枉道速祸。 —— 司马光";
    this.tips[107] = "顶级培训网 让我们携手一起成长 ";
    this.tips[108] = "知耻近乎勇。 —— 孔丘";
    this.tips[109] = "辱，莫大于不知耻。 —— 王通";
    this.tips[110] = "君子忧道不忧贫。 —— 孔丘";
  },
  mounted() {
    this.createEval();
    this.core.fw = Math.floor((this.store.score-0.1)*10)/10;
    this.core.sp = Math.floor((this.store.score+0.1)*10)/10;
  }
}
</script>

<style lang="less">
@import "~@/style/base.less";
.evaluation___ {
  height: 100%;
  overflow: hidden;
  flex: auto;
  position: relative;
  .wrap_2 {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
  }
}
.evaluation_read_wrap {
  .overview {
    padding: 47 / @r 0;
    height: 256 / @r;
    border-bottom: 2 / @r solid #e6e6e6;
    display: flex;
    justify-content: space-between;
    .left {
      flex: none;
      width: 437 / @r;
      border-right: 1px solid #e6e6e6;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      .main_core {
        font-size: 64 / @r;
        color: #ff5339;
      }
      > p {
        font-size: 28 / @r;
        color: #666;
      }
      > section {
        font-size: 28 / @r;
        color: #999;
      }
    }
    .right {
      flex: auto;
      display: flex;
      justify-content: center;
      ul {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        li {
          font-size: 32 / @r;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          .title {
            margin-right: 60 / @r;
            color: #666;
          }
          .el-rate {
            height: auto;
            display: flex;
            align-items: center;
            .el-rate__icon {
              font-size: 24 / @r;
              margin-right: 6 / @r;
            }
            .el-rate__text {
              font-size: 32 / @r;
              margin-left: 60 / @r;
            }
          }
          .time {
            color: #999;
          }
        }
      }
    }
  }
  .eval_bottom {
    border-top: 30 / @r solid #f5f5f5;
    .eval_bottom_wrap {
      padding: 0 60 / @r;
      .filter {
        padding: 30 / @r 0;
        display: flex;
        border-bottom: 2 / @r dashed #e6e6e6;
        span {
          font-size: 34 / @r;
          color: #6d7885;
          background-color: #ebf5ff;
          border-radius: 6 / @r;
          padding: 28 / @r 42 / @r;
          margin-right: 20 / @r;
          &.active {
            background-color: @blue !important;
            color: #fff !important;
          }
          &.bad {
            background-color: #f5f5f5;
            color: #aaa;
          }
        }
      }
    }
    .eval_list {
      ul {
        padding: 0 48 / @r;
        li {
          padding: 44 / @r 0;
          border-bottom: 2 / @r solid #eee;
          .user_ {
            display: flex;
            justify-content: space-between;
            height: 96 / @r;
            .user_wrap {
              display: flex;
              .img_box {
                height: 96 / @r;
                width: 96 / @r;
                border-radius: 5 / @r;
                margin-right: 20 / @r;
                img {
                  height: 100%;
                  width: 100%;
                }
              }
              .core {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding: 6 / @r 0;
                h3 {
                  padding-top: 8 / @r;
                  font-size: 32 / @r;
                  color: #333;
                }
                .el-rate {
                  height: auto;
                  display: flex;
                  align-items: center;
                  .el-rate__icon {
                    font-size: 32 / @r;
                    margin-right: 6 / @r;
                  }
                  .el-rate__text {
                    font-size: 32 / @r;
                    margin-left: 16 / @r;
                  }
                }
              }
            }
            .time {
              font-size: 32 / @r;
              color: #999;
            }
          }
          > p {
            font-size: 38 / @r;
            color: #333;
            padding: 36 / @r 0 0 116 / @r;
            line-height: 48 / @r;
          }
        }
      }
      .loading {
        text-align: center;
        font-size: 36 / @r;
        color: @blue;
        padding-top: 20 / @r;
      }
    }
  }
}
</style>