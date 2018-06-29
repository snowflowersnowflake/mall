<template>
  <div>
    <div @click="openMap=true">{{address}}</div>
    <iframe v-show="openMap" id="test" class="scroll" src="//m.amap.com/picker/?keywords=写字楼,小区,学校&zoom=15&center=&radius=1000&total=20&key=57a69eeee7b8a093920533158421d541" frameborder="0"></iframe>
    <div ref="scroll"></div>
  </div>
</template>

<script>
import scroll from "@/components/scroll";
import storelist from "@/components/storelist/head";
import ss from "@/page/store";
export default {
  data() {
    return {
      address: "",
      openMap: true
    };
  },
  components: {
    scroll,
    storelist,
    ss
  },
  methods: {},
  mounted() {
    var map = new AMap.Map(this.$refs.scroll, {
      zoom: 12
    });
    var iframe = document.getElementById("test").contentWindow;
    document.getElementById("test").onload = () => {
      iframe.postMessage("hello", "https://m.amap.com/picker/");
    };
    window.addEventListener(
      "message",
      e => {
        if (e.data.name) {
          this.address = e.data.address;
          this.openMap = false;
          var arr = e.data.location.split(",");
          var p = new AMap.LngLat(arr[0], arr[1]);
          map.setCenter(p);
          map.getCity(r => {
            console.log(r);
          });
        }
      },
      false
    );
    AMap.plugin("AMap.DistrictSearch", () => {
      var d = new AMap.DistrictSearch({
        subdistrict: 2
      });
      d.search("中国", (status, result) => {
        if (status == "complete") {
          var o = getAllCity(result.districtList);
          console.log(o);
        }
      });
    });
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

<style scoped>
.scroll {
  flex-grow: 1;
  flex-shrink: 1;
  overflow: hidden;
}
.map {
  height: 50vh;
}
</style>