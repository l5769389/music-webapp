<template >
  <div class="header-container">
    <div class="header">
      <div  class="icon-container">
        <svg class="icon" aria-hidden="true" @click="showMy">
          <use xlink:href="#icon-zhedie"></use>
        </svg>
      </div>
      <div><span>Landing Guy</span></div>
       <div  class="icon-container" @click="goToSearch">
         <svg class="icon" aria-hidden="true">
           <use xlink:href="#icon-chazhao"></use>
         </svg>
       </div>
    </div>
    <van-tabs v-model:active="activeName"
              :background="'#d44439'" :color="'white'"
              :title-active-color="'#f1f1f1'"
              :title-inactive-color="'#e4e4e4'"
              :line-height="'4px'"
    >
      <van-tab title="推荐" name="/recommend" :to="'/'"></van-tab>
      <van-tab title="排行" name="/rank" :to="'/rank'"></van-tab>
      <van-tab title="歌手" name="/singer" :to="'/singer'"></van-tab>
    </van-tabs>
  </div>
  <div class="content">
    <router-view ></router-view>
  </div>
</template>

<style scoped lang="less">
  .header-container{
    position: fixed;
    top: 0;
    width: 100%;
    height: 176px;
    z-index: 10000;
    .header{
      height: 88px;
      background: #d44439;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #f1f1f1;
      font-weight: 600;
      padding: 0 30px;
      box-sizing: border-box;
      .icon-container{
        font-size: 44px;
      }
    }
  }
  .content{
    margin-top: 176px;
  }
</style>

<script lang="ts">
import {  defineComponent,ref } from 'vue';
import {useRoute, useRouter} from "vue-router";
export default defineComponent({
   name: 'index',
  setup(){
    const route = useRoute();
    const router = useRouter();
    const activeName = ref('');
    activeName.value = route.path;
    const goToSearch =()=>{
      router.push('/search')
    }
    const showMy=()=>{
      router.push('/my');
    }
    return {
      activeName,
      goToSearch,
      showMy,
    };
  }
});
</script>
