<template >
  <swipe></swipe>
  <p class="recommend-title">推荐歌单</p>
  <Recommned></Recommned>
</template>

<style scoped>
.recommend-title{
  font-size: 40px;
  padding-left: 18px;
  margin-top: 28px;
  margin-bottom: 28px;
  line-height: 40px;
  font-weight: 500;
}
</style>
<script lang="ts">
import {  defineComponent  } from 'vue';
import Swipe from "@/views/Home/swipe.vue";
import Recommned from '@/views/Home/recommend.vue';
export default defineComponent({
   name: 'index',
  components: {Swipe,Recommned},
});
</script>
