<template>
    <div>
        <div class="scroll">
            <scroll>
                <div class="wrap">
                    <ss></ss>
                </div>

            </scroll>
        </div>

    </div>
</template>

<script>
import scroll from "@/components/scroll";
import storelist from '@/components/storelist/head'
import ss from '@/page/store'
export default {
  data() {
    return {
     
    };
  },
  components: {
    scroll,
    storelist,
    ss
  }
};
</script>

<style scoped>
.scroll {
  flex-grow: 1;
  flex-shrink: 1;
  overflow: hidden;
}
</style>