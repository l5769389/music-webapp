<template>
  <div class="swipe-container">
    <van-swipe class="my-swipe"
               :autoplay="3000"
               indicator-color="white"
    >
      <van-swipe-item v-for="item in images" :key="item">
        <div class="img-container">
          <img :src="item">
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
        width: 100%;
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
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'swipe',
  setup(){
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const images=[
      require('../../asset/imgs/1.webp'),
      require('../../asset/imgs/2.webp'),
      require('../../asset/imgs/3.webp'),
    ];
    return {
      images,
    }
  }
});
</script>
