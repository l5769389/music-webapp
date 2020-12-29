<template>
<!--  播放主界面-->
  <div class="play-wrapper" v-if="showPlayPageFlag">
    <div class="back-container" >
      <div class="header">
        <van-icon name="arrow-down" @click="hideSongPlay" />
        <div>
          <span>{{readyPlayList[0].musicObj.name}}</span>
          <small>{{readyPlayList[0].musicObj.desc}}</small>
        </div>
      </div>
      <div class="content">
        <div class="wrapper" :class="['rotate',!playSongFlag?'rotate-pause':'']">
          <img v-lazy="readyPlayList[0].musicObj.picUrl">
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
            <van-icon v-if="!playSongFlag" size="40" name="play-circle-o"  @click.stop="triggerPlay" />
            <van-icon v-else size="40" name="pause-circle-o"  @click.stop="triggerPause" />


            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiayigexiayishou"></use>
            </svg>
            <van-icon v-if="!likeFlag" name="like-o" @click="like"/>
            <van-icon name="like" v-else color="#d44439" @click="unlike" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
  .play-wrapper{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background: white;
    overflow: hidden;
  }
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
import {computed, defineComponent, ref, watch} from 'vue';
import {useStore} from "vuex";

export default defineComponent({
  name: 'playPage',
  setup(props,context){
    const store = useStore();
    const showPlayPageFlag = computed(()=>store.getters.getPlayPageShowFlag);
    const readyPlayList: any = computed(()=>store.getters.getReadyPlayList);
    const playSongFlag = computed(()=>store.getters.getPlaySongFlag);
    const nowPlayingIndex =computed(()=>store.getters.getNowPlayingIndex);
    const hideSongPlay = ()=>{
      store.commit('setPlayPageShowFlag',false);
    }
    const triggerPlay=()=>{
      store.commit('setPlaySongFlag',true);
    };
    const triggerPause=()=>{
      store.commit('setPlaySongFlag',false);

    };
    const likeFlag =ref(false);
    const like =()=>{
      likeFlag.value =true;
    }
    const unlike=()=>{
      likeFlag.value =false;
    }
    return {
      hideSongPlay,
      showPlayPageFlag,
      readyPlayList,
      playSongFlag,
      triggerPlay,
      triggerPause,
      like,
      unlike,
      likeFlag,
    }
  }
});
</script>
