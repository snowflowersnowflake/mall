<template>
  <div class="test">
    <div class="scroll">
      <div class="scroll_wrap a">
        <scroll>
          <ul>
            <li v-for="(item,index) in arr" :key="index">{{index}}</li>
          </ul>
        </scroll>
      </div>
       </div>
      <div class="scroll">
        <div class="scroll_wrap b">
          <scroll>
            <ul>
              <li v-for="(item,index) in arr" :key="index">{{index}}</li>
            </ul>
          </scroll>
       
      </div>
    </div>
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
      openMap: true,
      arr: new Array(50).fill(),
      page: 1
    };
  },
  components: {
    scroll,
    storelist,
    ss
  },
  methods: {},
  mounted() {}
};
</script>

<style scoped lang=less>
@import "~@/style/base.less";
.test {  
  display: flex;
}
.scroll {
  flex: 1;
  position: relative;
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
.a {
  background-color: red;
}
.b {
  background-color: @blue;
}
.map {
  height: 50vh;
}
</style>