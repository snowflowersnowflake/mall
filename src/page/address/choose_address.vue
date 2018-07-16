<template>
  <div class="choose_address">
    <header>
      <div class="back" @click="$router.back(-1)">
        <i class="el-icon-arrow-left"></i>
      </div>
      <h3>选择地址</h3>
      <router-link tag="div" to="/addresslist" class="add">
        地址管理
      </router-link>
    </header>
    <div class="search_wrap">
      <div class="search_box">
        <div class="city_wrap" @click="selectCity">
          <span>{{choose_city}}</span>
          <i :class="{'el-icon-arrow-down':page==2,'el-icon-arrow-up':page!=2}"></i>
        </div>
        <div class="inp_wrap">
          <i class="el-icon-search"></i>
          <input type="text" v-model="search_key" placeholder="小区/写字楼/学校等" @focus="openSearch" @input="search_near">
        </div>
      </div>
    </div>
    <transition name="el-fade-in-linear" mode="out-in">
      <div class="page_choose" v-show="page==1">
        <div class="now_pos">
          <h3>当前位置</h3>
          <div class="pos">
            <p>{{pos_text}}</p>
            <div class="re_pos">
              <i class="el-icon-location-outline"></i>
              重新定位
            </div>
          </div>
        </div>
        <div class="h24"></div>
        <div class="address_list_wrap">
          <div class="scroll_wrap">
            <scroll>
              <div class="address_list">
                <h3>收货地址</h3>
                <div class="lists">

                  <ul>
                    <li v-for="(item,key) in address_list" :key="key" @click="setAddress(item)">
                      <h3>{{item.address.name}}
                        <section v-show="item.tag">{{item.tag}}</section>
                      </h3>
                      <h4>{{item.address.address}}</h4>
                      <p>{{getUser(item)}}</p>
                    </li>
                  </ul>

                </div>
                <router-link tag="div" class="add_address" to="/editaddress">
                  <span>新增地址</span>
                  <i class="el-icon-arrow-right"></i>
                </router-link>
              </div>
            </scroll>
          </div>
        </div>
      </div>
    </transition>
    <transition name="el-fade-in-linear" mode="out-in">
      <div class="page_city_select" v-show="page==2">
        <div class="scroll_wrap">
          <scroll ref="cityScroll">
            <ul class="list_wrap">
              <li>
                <h4>当前定位</h4>
                <section @click="setCity(city)">
                  <span>{{city}}</span>
                  <em>
                    <i class="el-icon-location-outline"></i>重新定位</em>
                </section>
              </li>
              <li v-for="(item,key) in city_obj" :key="key">
                <h4>{{key.toUpperCase()}}</h4>
                <ul>
                  <li v-for="(city,index) in item" :key="index" @click="setCity(city.name)">{{city.name}}</li>
                </ul>
              </li>
            </ul>
          </scroll>
        </div>
        <div class="letter">
          <ul>
            <li v-for="(item,key) in right_letter" :key="key">{{key.toUpperCase()}}</li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="el-fade-in-linear" mode="out-in">
      <div class="page_search" v-show="page==3">
        <nav class="search_nav">
          <div v-for="(item,index) in search_type_arr" :key="index" :class="{'active':index==search_type}" @click="setSearchType(index)">
            <span>{{item}}</span>
          </div>
        </nav>
        <div class="search_content">
          <div class="nodata" v-show="!serach_result.length">
            <i class="el-icon-refresh"></i>没有数据
          </div>
          <div class="scroll_wrap">
            <scroll ref="searchScroll">
              <ul>
                <li v-for="(item,index) in serach_result" :key="index" @click="setAddress(item)">
                  <div class="icon_wrap">
                    <i class="el-icon-location-outline"></i>
                  </div>
                  <div class="text">
                    <div class="title-distance">
                      <h3>{{item.name}}</h3>
                      <div class="distance" v-show="choose_city==city">
                        {{item.distance}}m
                      </div>
                    </div>

                    <p class="subtitle">{{item.address}}</p>
                  </div>
                </li>
              </ul>
            </scroll>
          </div>

        </div>
      </div>
    </transition>
  </div>
</template>

<script>
var pos = {
  lat: 30.53347,
  lng: 114.3308
};
pos = new AMap.LngLat(114.3308, 30.53347);
var pinyin = require("pinyin");
import scroll from "@/components/scroll";
import { setStorage, getStorage } from "@/script/storage";
export default {
  data() {
    return {
      pos: "",
      pos_text: "定位中",
      page: 1,
      city_obj: {},
      search: null,
      search_key: "",
      search_type: 0,
      search_type_arr: ["全部", "写字楼", "小区", "学校"],
      serach_result: [],
      address_list: {},
      city: "武汉市",
      choose_city: "武汉市",
      choose_address: null
    };
  },
  methods: {
    getUser(address) {
      var { name, sex, tel } = address;
      if (sex) {
        return `${name}(先生) ${tel}`;
      } else {
        return `${name}(女士) ${tel}`;
      }
    },
    search_near() {
      this.$nextTick(() => {
        if (this.choose_city == this.city) {
          this.search.searchNearBy(
            this.search_key,
            pos,
            50000,
            (status, info) => {
              if (status == "complete") {
                this.serach_result = info.poiList.pois;
              } else if (status == "no_data") {
                this.serach_result = [];
              }
            }
          );
        } else {
          this.search.search(this.search_key, (status, info) => {
            if (status == "complete") {
              this.serach_result = info.poiList.pois;
            } else if (status == "no_data") {
              this.serach_result = [];
            }
          });
        }
      });
    },
    setSearchType(index) {
      this.search_type = index;
      if (index == 0) {
        this.search.setType("");
      } else {
        this.search.setType(this.search_type_arr[index]);
      }
      this.search_near();
    },
    setCity(name) {
      this.choose_city = name;
      this.search.setCity(name);
      this.page = 1;
    },
    setAddress(obj) {
      this.choose_address = obj;
      this.page = 1;
    },
    selectCity() {
      if (this.page == 2) {
        this.page = 1;
      } else {
        this.page = 2;
        this.$nextTick(() => {
          this.$refs.cityScroll.refresh();
        });
      }
    },
    openSearch() {
      this.page = 3;
      this.$nextTick(() => {
        this.$refs.searchScroll.refresh();
      });
    }
  },
  computed: {
    right_letter() {
      var obj = {};
      for (var attr in this.city_obj) {
        if (attr.length > 1) {
          obj.o = attr;
        } else {
          obj[attr] = attr;
        }
      }
      return obj;
    }
  },
  components: {
    scroll
  },
  mounted() {
    AMap.plugin("AMap.PlaceSearch", () => {
      this.search = new AMap.PlaceSearch({
        city: this.city,
        citylimit: true,
        type: this.search_type_arr.join("|"),
        pageSize: 20
      });
    });
    this.address = getStorage("address_list");
    //定位
    AMap.plugin("AMap.Geolocation", () => {
      var geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: false,
        // 设置定位超时时间，默认：无穷大
        timeout: 50000
      });
      geolocation.getCurrentPosition();
      AMap.event.addListener(geolocation, "complete", data => {
        this.pos = data;
        this.pos_text = data.addressComponent.building;
        setStorage("curLocalPos", data);
      });
      AMap.event.addListener(geolocation, "error", err => {
        //console.error(err);
        var data = getStorage("curLocalPos");
        if (data) {
          this.pos = data;
          this.pos_text = data.addressComponent.building;
        }
      });
    });

    //获取所有城市
    AMap.plugin("AMap.DistrictSearch", () => {
      var d = new AMap.DistrictSearch({
        subdistrict: 2
      });
      d.search("中国", (status, result) => {
        if (status == "complete") {
          var o = getAllCity(result.districtList);
          var arr = [];
          for (var attr in o) {
            arr.push(o[attr]);
          }

          //拆分成拼音
          var arr = arr.map(item => {
            let py = pinyin(item.name.charAt(0), {
              style: pinyin.STYLE_NORMAL
            });
            item.sortPy = py[0][0][0];
            return item;
          });
          //按拼音分组
          arr.forEach(item => {
            var k = item.sortPy;
            if (k.charCodeAt(0) > 1000) {
              if (!this.city_obj.z_other) {
                this.city_obj.z_other = [];
              }
              this.city_obj.z_other.push(item);
              return;
            }
            if (!this.city_obj[k] || !Array.isArray(this.city_obj[k])) {
              this.city_obj[k] = [];
            }
            this.city_obj[k].push(item);
          });
          //json按key重新排序
          var keyArr = Object.keys(this.city_obj).sort();
          var sortObj = {};
          keyArr.forEach(item => {
            sortObj[item] = this.city_obj[item];
          });
          this.city_obj = sortObj;
        }
      });
    });

    var address_list = getStorage("address_list");
    if (address_list) {
      this.address_list = address_list;
    }
  },
  watch: {
    page: function(val) {
      if (val == 3) {
        this.search_near();
      }
    }
  }
};
function getAllCity(arr, obj_) {
  var obj = obj_ ? obj_ : {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].districtList && arr[i].districtList.length) {
      getAllCity(arr[i].districtList, obj);
    } else {
      obj[arr[i].citycode] = arr[i];
    }
  }
  return obj;
}
</script>

<style scoped lang="less">
@import "~@/style/base.less";
.choose_address {
  background-color: #f5f5f5;
  position: relative;
  display: flex;
  flex-direction: column;
  header {
    flex: none;
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
      top: 106 / @r;
      right: 60 / @r;
      color: #fff;
      font-size: 46 / @r;
    }
    h3 {
      font-size: 60 / @r;
      color: #fff;
      padding-top: 96 / @r;
      text-align: center;
    }
  }
  .search_wrap {
    flex: none;
    background-color: #fff;
    padding: 30 / @r 24 / @r 12 / @r;
    .search_box {
      height: 90 / @r;
      border-radius: 6 / @r;
      background-color: #f5f5f5;
      display: flex;
      .city_wrap {
        height: 100%;
        display: flex;
        align-items: center;
        margin-right: 34 / @r;
        span {
          font-size: 37 / @r;
          color: #333;
          margin: 0 18 / @r 0 50 / @r;
        }
        i {
          font-size: 24 / @r;
          color: #bbbbbb;
        }
      }
      .inp_wrap {
        align-items: center;
        display: flex;
        i {
          font-size: 43 / @r;
          color: #989898;
          margin-right: 18 / @r;
        }
        input {
          flex: auto;
          background-color: initial;
          border: none;
          height: 100%;
          line-height: 90 / @r;
          font-size: 40 / @r;
          color: #666;
        }
      }
    }
  }
  .h24 {
    height: 24 / @r;
  }
  .scroll_wrap {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    overflow: hidden;
  }
  .page_choose {
    flex: auto;
    display: flex;
    flex-direction: column;
    .now_pos {
      flex: 0;
      background-color: #fff;
      padding-bottom: 34 / @r;
      h3 {
        padding: 54 / @r 0 44 / @r 50 / @r;
        color: #999;
        font-size: 40 / @r;
      }

      .pos {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 60 / @r;
        p {
          line-height: 64 / @r;
          font-size: 46 / @r;
          color: #333;
        }
        .re_pos {
          flex: none;
          text-align: right;
          width: 286 / @r;
          color: @blue;
          font-size: 44 / @r;
          i {
            margin-right: 10 / @r;
          }
        }
      }
    }
    .address_list_wrap {
      position: relative;
      flex: 1;
      .address_list {
        background-color: #fff;
        padding: 50 / @r 50 / @r 0;
        display: flex;
        flex-direction: column;
        > h3 {
          font-size: 38 / @r;
          color: #999;
          padding-bottom: 10 / @r;
        }
        .lists {
          position: relative;
          flex: 1;
          ul {
            li {
              color: #333;
              padding: 46 / @r 0;
              border-bottom: 1px solid #eee;
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
          }
        }

        .add_address {
          height: 130 / @r;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 48 / @r;
          span {
            color: @blue;
          }
          i {
            color: #c7c7cc;
          }
        }
      }
    }
  }
  .page_city_select {
    flex: auto;
    overflow: hidden;
    position: relative;
    .list_wrap {
      background-color: #fff;
      > li {
        h4 {
          padding: 0 60 / @r;
          line-height: 100 / @r;
          color: #666;
          font-size: 40 / @r;
          background-color: #ededed;
        }
        > section {
          padding: 0 60 / @r;
          font-size: 38 / @r;
          color: #333;
          display: flex;
          justify-content: space-between;
          height: 130 / @r;
          align-items: center;
          em {
            color: @blue;
            i {
              font-size: 50 / @r;
              margin-right: 20 / @r;
            }
          }
        }
        ul {
          padding: 0 60 / @r;
          li {
            height: 130 / @r;
            line-height: 130 / @r;
            font-size: 38 / @r;
            color: #333;
            border-bottom: 1px solid #eee;
          }
        }
      }
    }
    .letter {
      position: fixed;
      right: 20 / @r;
      top: 50%;
      transform: translateY(-50%);

      li {
        font-size: 26 / @r;
        line-height: 50 / @r;
        color: #666;
      }
    }
  }
  .page_search {
    flex: 1;
    display: flex;
    flex-direction: column;
    .search_nav {
      flex: none;
      height: 102 / @r;
      border-bottom: 1px solid #eee;
      display: flex;
      background-color: #fff;
      > div {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          font-size: 40 / @r;
          color: #333;
          position: relative;
        }
        &.active {
          span {
            color: @blue;
            &:after {
              content: "";
              display: block;
              position: absolute;
              left: 0;
              top: 54 / @r;
              height: 6 / @r;
              width: 100%;
              background-color: @blue;
            }
          }
        }
      }
    }
    .search_content {
      flex: 1;
      position: relative;
      background-color: #fff;
      .nodata {
        font-size: 60 / @r;
        text-align: center;
        color: @blue;
        padding-top: 200 / @r;
      }
      ul {
        padding-left: 60 / @r;
        li {
          display: flex;
          justify-content: space-between;
          padding: 36 / @r 60 / @r 36 / @r 0;
          border-bottom: 1px solid #eee;
          .icon_wrap {
            width: 60 / @r;
            margin-right: 43 / @r;
            flex: none;
            display: flex;
            justify-content: center;
            align-content: center;
            flex-direction: column;
            i {
              font-size: 60 / @r;
              text-align: center;
              color: #999999;
            }
          }
          .text {
            flex: auto;
            width: 100 / @r;
            .title-distance {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding-bottom: 26 / @r;
              width: 100%;
              h3 {
                flex: 1;

                font-size: 48 / @r;
                color: #333;
                width: 100 / @r;
                .text_one_line;
              }
              .distance {
                flex: none;
                font-size: 30 / @r;
                color: #666;
                margin-left: 40 / @r;
              }
            }
            .subtitle {
              font-size: 36 / @r;
              color: #333;
              .text_one_line;
            }
          }
        }
      }
    }
  }
}
</style>