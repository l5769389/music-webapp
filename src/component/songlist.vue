<template>
  <div class="container" ref="containerRef" >
    <div class="btn-container">
      <van-icon name="play-circle-o" size="22" />
      <span>播放全部</span>
      <small>(共{{songlist.length+1}}首)</small>
    </div>
    <van-divider></van-divider>
    <div v-for="(item,index) in songlist" :key="item.name">
      <div  class="item-container">
        <span>{{index}}</span>
        <div class="song-container">
          <span>{{item.name}}</span>
          <span>{{item.singer}}</span>
        </div>
      </div>
      <van-divider></van-divider>
    </div>
  </div>
</template>

<style scoped lang="less">
  .container{
    width: 100%;

    border-radius: 30px;
    box-sizing: border-box;
    background: #F2F3F4;
    z-index: 1000;
    overflow: hidden;
    padding-left: 30px;
    .btn-container,.item-container{
      display: flex;
      align-items: center;

    }
    .btn-container{
      height: 60px;
      padding-top: 60px;
      box-sizing: border-box;
      >span{
        margin-left: 20px;
      }
      >small{
        font-size: small;
        font-weight: 300;
      }
    }
    .item-container{
      height: 75px;
      display: flex;
      .song-container{
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-between;
        margin-left: 30px;
        >span:last-child{
          font-weight: 300;
          font-size: small;
        }
      }
    }
  }
</style>
<script lang="ts">
import {defineComponent, ref,watch,onMounted} from 'vue';

export default defineComponent({
  name: 'songlist',
  setup(props){
    const songlist = ref<object>([]);
    const  constainerRef=ref();
    songlist.value=[
      {
        name:'梦醒时分',
        singer:'陈奕迅'
      },
      {
        name:'梦醒时分',
        singer:'陈奕迅'
      },
      {
        name:'梦醒时分',
        singer:'陈奕迅'
      },
      {
        name:'梦醒时分',
        singer:'陈奕迅'
      },
      {
        name:'梦醒时分',
        singer:'陈奕迅'
      },
      {
        name:'梦醒时分',
        singer:'陈奕迅'
      },
      {
        name:'梦醒时分',
        singer:'陈奕迅'
      },
      {
        name:'梦醒时分',
        singer:'陈奕迅'
      },
      {
        name:'梦醒时分',
        singer:'陈奕迅'
      },
      {
        name:'梦醒时分',
        singer:'陈奕迅'
      },
      {
        name:'梦醒时分',
        singer:'陈奕迅'
      },
      {
        name:'梦醒时分',
        singer:'陈奕迅'
      },
      {
        name:'梦醒时分',
        singer:'陈奕迅'
      },
    ]
    return {
      songlist,
      constainerRef,

    }
  }
});
</script>
