<template>
  <div class="swipe-container">
    <van-swipe class="my-swipe"
               :autoplay="3000"
               indicator-color="white"
    >
      <van-swipe-item v-for="item in bannerlist" :key="item">
        <div class="img-container">
          <img v-lazy="{
            src:item.pic,
            loading:require(`../../common/default/swipe-loading.jpg`)
          }">
        </div>
      </van-swipe-item>
    </van-swipe>
    <div class="background">

    </div>
  </div>
</template>

<style scoped lang="less">
.swipe-container{
  position: relative;
  height: 380px;
  .my-swipe .van-swipe-item {
    color: #fff;
    height: 350px;
    font-size: 20px;
    margin-top: 30px;
    text-align: center;
    .img-container{
      width: 95%;
      height: 100%;
      margin-left: auto;
      margin-right: auto;
      border-radius: 20px;
      overflow: hidden;
      img{
        height: 100%;
        object-fit: contain;
      }
    }
  }
  .background{
    width: 100%;
    height: 300px;
    background: #d44439;
    position: absolute;
    top: 0;
    z-index: -1111;
  }
}
</style>
<script lang="ts">
import {defineComponent, ref} from 'vue';
import {getBanner} from "@/api/home";

export default defineComponent({
  name: 'swipe',
  setup(){
    const bannerlist =ref<object []>();
   const _getBanner =async ()=>{
    const {data} = await  getBanner();
      bannerlist.value = data.banners;
   }
   _getBanner();
    return {
      bannerlist,
    }
  }
});
</script>
