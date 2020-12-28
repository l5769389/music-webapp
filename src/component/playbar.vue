<template >
<!-- 小型播放页-->
  <div @click="showPlay" class="container">
    <div class="img-container">
      <img src="../asset/imgs/column1.jpg" :class="['rotate',!playFlag?'rotate-pause':'']">
    </div>
    <div class="song-desc">
      <span>梦醒时分</span>
      <span>周华健</span>
    </div>
    <div class="progress-container">
      <van-circle
          v-model:current-rate="currentRate"
          :rate="50"
          :stroke-width="70"
          layer-color="rgba(19,19,19,0.6)"
          color="#d44439"
          size="40px"
      />
      <van-icon v-if="!playFlag" class="icon"  name="play" size="25" @click.stop="triggerPlay" />
      <van-icon v-else class="icon" name="pause" size="25" @click.stop="triggerPause"/>
    </div>
    <van-icon name="bars" size="35" @click.stop="showModal"/>
  </div>
  <van-popup v-model:show="showModalFlag"  class="modal" position="bottom" :style="{height:'60%'}" round>
        <div class="modal-header">
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xunhuan"></use>
            </svg>
            <span>顺序播放(50首)</span>
            <van-icon name="delete" size="25" color="gray" @click.stop="deleteList"/>
          </div>
        </div>
        <div class="list-container">
          <div class="item-container" v-for="(item,index) in songList" :key="item.name">
             <div class="left">
               <van-icon v-if="index===1" class="listening" name="audio" color="#d44439" size="20"/>
               <span class="name">{{item.name}}</span>
             </div>
            <small>{{item.singer}}</small>
            <van-icon  name="cross" color="#d44439" size="20" @click.stop="deleteSong(index)"/>
          </div>
        </div>
        <div class="footer" @click.stop="()=>showModalFlag=false">
          <span>关闭</span>
        </div>
  </van-popup>
  <van-popup v-model:show="showPlayFlag" :style="{width:'100%',height:'100%'}">
        <play-page @hide-song-play="hideSongPlay"></play-page>
  </van-popup>
</template>
<style scoped lang="less">
  .container{
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    height:120px;
    background: rgba(255,255,255,0.85);
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding-left: 40px;
    padding-right: 40px;
    .img-container{
      flex: 0 0 90px;
      height: 80px;
      margin-right: 20px;
      img{
        width: 100%;
        object-fit: contain;
        border-radius: 50%;
      }
    }
    .song-desc{
      flex: 1 1 200px;
      display: flex;
      flex-direction: column;
      font-size: 28px;
      line-height: 1.2;
    }
    .progress-container{
      height: 100%;
      display: flex;
      align-items: center;
      position: relative;
      margin-right: 20px;
      i{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
      }
      .icon1{
        transform: translate(-40%,-50%);
      }
      .icon2{

      }
    }
  }
  // 旋转和旋转暂停问题
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
  .modal{
    border-radius: 20px;
    .modal-header{
      padding: 40px 60px 0 40px ;
      >div{
        height: 50px;
        display: flex;
        align-items: center;
        position: relative;
        >span{
          margin-left: 30px;
        }
        svg{
          font-size: 40px;
        }
        i{
          position: absolute;
          right: 20px;
        }
      }
    }
    .list-container{
      padding: 20px 60px 20px 40px ;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      .item-container{
        flex: 0 0 80px;
        display: flex;
        position: relative;
        align-items: center;
        .listening{
          margin-right: 20px;
        }
        .left{
          margin-right: 20px;
          font-size: 30px;
          width: 400px;
          display: flex;
          span{
            flex: 1;
            -webkit-line-clamp:1;
            overflow: hidden;
            -webkit-box-orient: vertical;
            display: -webkit-box;
          }
        }
        small{
          font-size: 20px;
        }
        i:last-child{
          position: absolute;
          right: 0;
        }
      }
    }
    .footer{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
      border-top: 1px solid #ebedf0;
    }
  }
</style>
<script lang="ts">
import {  defineComponent,ref,computed } from 'vue';
import {Dialog} from "vant";
import PlayPage from "@/component/playPage.vue";
export default defineComponent({
   name: 'playbar',
  components:{
    PlayPage,
     [Dialog.Component.name]:Dialog.Component,
  },
  setup() {
    const currentRate = ref(0);
    const text = computed(() => currentRate.value.toFixed(0) + '%');
    const playFlag = ref(false);
    const showModalFlag = ref(false);
    const showPlayFlag = ref(false);
    const showModal = ()=>{
      showModalFlag.value = true;
    };
    const triggerPlay=()=>{playFlag.value = true};
    const triggerPause=()=>{playFlag.value = false};
    const songList=ref([
      {
        name:'好景不长好景不长好景不长好景不长好景不长',
        singer:'陈奕迅'
      },
      {
        name:'好景不长',
        singer:'陈奕迅'
      },
      {
        name:'好景不长',
        singer:'陈奕迅'
      },
      {
        name:'好景不长',
        singer:'陈奕迅'
      },
      {
        name:'好景不长好景不长好景不长好景不长好景不长',
        singer:'陈奕迅'
      },
      {
        name:'好景不长',
        singer:'陈奕迅'
      },
      {
        name:'好景不长',
        singer:'陈奕迅'
      },
      {
        name:'好景不长',
        singer:'陈奕迅'
      },
      {
        name:'好景不长好景不长好景不长好景不长好景不长',
        singer:'陈奕迅'
      },
      {
        name:'好景不长',
        singer:'陈奕迅'
      },
      {
        name:'好景不长',
        singer:'陈奕迅'
      },
      {
        name:'好景不长',
        singer:'陈奕迅'
      }
    ]);
    const deleteSong = (index: number)=>{
      songList.value.splice(0,1);
    }
    const deleteList=()=>{
      Dialog.confirm({
        title: '确定清空播放列表么',
      })
          .then(() => {
            // on confirm
            songList.value = [];
          })
          .catch(() => {
            // on cancel
          });
    };

    const showPlay=()=>{
      showPlayFlag.value = true;
    }
    const hideSongPlay=()=>{
      console.log('trigger');
      showPlayFlag.value = false;
    }
    return {
      text,
      currentRate,
      playFlag,
      triggerPlay,
      triggerPause,
      showModal,
      showModalFlag,
      songList,
      deleteSong,
      deleteList,
      showPlayFlag,
      showPlay,
      hideSongPlay,
    };
  }
});
</script>
