<template >
  <div class="header">
    <van-icon class="back" name="arrow-left" size="24"  color="white" @click="goBack"/>
    <van-tabs v-model:active="active" sticky
              :background="'#d44439'" :color="'white'"
              :title-active-color="'#f1f1f1'"
              :title-inactive-color="'#e4e4e4'"
              :line-height="'4px'"
    >
      <van-tab title="我的收藏" name="/favarite" >
          <div>
            <favorite></favorite>
          </div>
      </van-tab>
      <van-tab title="最近播放" name="/recent" class="wrapper">
            <recent></recent>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style scoped lang="less">
  .header{
    height: 88px;
    background: #d44439;
    width:100%;
    .back{
      position: fixed;
      left: 0;
      top: 20px;
      z-index: 100;
    }
  }
  .wrapper{
    padding-bottom: 100px;
  }
</style>
<script lang="ts">
import {  defineComponent,ref } from 'vue';
import Favorite from "@/views/my/favorite.vue";

import Recent from "@/views/my/recent.vue";
import {useRoute, useRouter} from "vue-router";
import {Toast} from "vant";

export default defineComponent({
   name: 'index',
  components: {Recent, Favorite},
  setup() {
    const active = ref(2);
    const router = useRouter();
    const goBack = ()=>{
     if (window.history.length<=2){
       router.push('/')
     }else {
       router.go(-1);
     }
    }
    return {
      active,
      goBack,
    };
  },
});
</script>
