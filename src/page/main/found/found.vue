<template>
    <div>
        <div class="scroll">
            <scroll>
                <div class="wrap">
                    <lisss></lisss>
                </div>

            </scroll>
        </div>

    </div>
</template>

<script>
import scroll from "@/components/scroll";
import storelist from '@/components/storelist/head'
import lisss from '@/components/storelist/store'
export default {
  data() {
    return {
     
    };
  },
  components: {
    scroll,
    storelist,
    lisss
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