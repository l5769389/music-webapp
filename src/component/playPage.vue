<template>
  <div class="back-container">
    <div class="header">
      <van-icon name="arrow-down" @click="hideSongPlay" />
      <div>
        <span>I NEED YOUR LOVE</span>
        <small>I NEED YOUR LOVE</small>
      </div>
    </div>
    <div class="content">
      <div class="wrapper rotate">
          <img src="http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg">
      </div>
    </div>
    <div class="bottom">
      <div class="control-container">
        <div class="progress-container">
          <span>0:00</span>
          <div>
            <van-progress
                :percentage="75"
                pivot-text="紫色"
                pivot-color="#7232dd"
                color="linear-gradient(to right, #be99ff, #7232dd)"
            />
          </div>
          <span>0:00</span>
        </div>
        <div class="scroll-container">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xunhuan"></use>
          </svg>
<!--          <svg class="icon" aria-hidden="true">-->
<!--            <use xlink:href="#icon-danquxunhuan"></use>-->
<!--          </svg>-->
<!--          <svg class="icon" aria-hidden="true">-->
<!--            <use xlink:href="#icon-suiji"></use>-->
<!--          </svg>-->

          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shangyishoushangyige"></use>
          </svg>


          <van-icon size="40" name="play-circle-o" />
<!--          <van-icon name="pause-circle-o" />-->


          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiayigexiayishou"></use>
          </svg>
          <van-icon name="like-o" />

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
  .back-container{
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    &::after{
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background:url("http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg") no-repeat center;
      background-size: cover;
      opacity: 0.3;
      z-index: -100;
    }
    .header{
      flex: 0 0 140px;
      order: 1;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      justify-content: center;
      position: relative;
      i{
        font-size: 60px;
        position: absolute;
        left: 30px;
      }
      >div{
        display: flex;
        flex-direction: column;
        align-items: center;
        >span:first-child{
          font-size: 36px;
          font-weight: 600;
          margin-bottom: 10px;
        }
      }
    }
    .content{
      flex: 1;
      order: 2;
      display: flex;
      justify-content: center;
      align-items: center;
      .wrapper{
        width: 300px;
        height: 300px;
        border: 25px solid rgba(33,33,33,.2);
        border-radius: 50%;
        box-sizing: border-box;
          img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }

      }
    }
    .bottom{
      flex: 0 0 200px;
      order: 3;
      margin-bottom: 80px;
      padding: 0px 50px;
      box-sizing: border-box;
      .control-container{
        width: 100%;
        .progress-container{
          display: flex;
          justify-content: space-between;
          align-items: center;
          >div{
            flex: 1;
            margin-left: 20px;
            margin-right: 20px;
          }
        }
        .scroll-container{
          display: flex;
          justify-content: space-between;
          margin-top: 30px;
          font-size: 50px;
          align-items: center;
        }
      }
    }
  }
  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    50% {
      transform: rotate(180deg);
    }
    100%{
      transform: rotate(360deg);
    }
  }
  .rotate{
    transition: 0.5s;
    transform-origin: 50% 50%;
    animation: rotate 10s linear infinite;
    animation-play-state: running;
  }
  .rotate-pause{
    animation-play-state: paused;
  }
</style>
<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'playPage',
  emits:['hide-song-play'],
  setup(props,context){
    const hideSongPlay = ()=>{
      console.log('trigger');
      context.emit('hide-song-play')
    }
    return {
      hideSongPlay,
    }
  }
});
</script>
