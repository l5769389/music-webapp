<template >
<!-- 小型播放页-->
  <div @click="showPlay" v-if="showPlayBarFlag" class="container">
    <div class="img-container">
      <img v-lazy="readyPlayList[0].musicObj.picUrl" :class="['rotate',!playSongFlag?'rotate-pause':'']">
    </div>
    <div class="song-desc">
      <span>{{readyPlayList[0].musicObj.name}}</span>
      <span>{{readyPlayList[0].musicObj.desc}}</span>
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
      <van-icon v-if="!playSongFlag" class="icon"  name="play" size="25" @click.stop="triggerPlay" />
      <van-icon v-else class="icon" name="pause" size="25" @click.stop="triggerPause"/>
    </div>
    <van-icon name="bars" size="35" @click.stop="showModal"/>
  </div>
<!--  播放列表页-->
  <van-popup v-model:show="showModalFlag"  class="modal" position="bottom" :style="{height:'60%'}" round>
        <div class="modal-header">
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xunhuan"></use>
            </svg>
            <span>顺序播放({{readyPlayList.length}}首)</span>
            <van-icon name="delete" size="25" color="gray" @click.stop="deleteList"/>
          </div>
        </div>
        <div class="list-container">
          <div class="item-container" v-for="(item,index) in readyPlayList" :key="item">
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
import {  defineComponent,ref,computed,watch,isRef } from 'vue';
import {Dialog} from "vant";
import PlayPage from "@/component/playPage.vue";
import {useStore} from "vuex";
export default defineComponent({
   name: 'playbar',
  components:{
     [Dialog.Component.name]:Dialog.Component,
  },
  setup() {
    const store =useStore();
    // 从vuex中获取flag值。去决定组件的显示或者隐藏。
    const showPlayBarFlag =computed(()=>store.getters. getPlayBarShowFlag);
    const readyPlayList: any = computed(()=>store.getters.getReadyPlayList);
    const playSongFlag = computed(()=>store.getters.getPlaySongFlag);
    const nowPlayingIndex =computed(()=>store.getters.getNowPlayingIndex);
    // 根据是否有待播放列表来控制playbar的显示和隐藏。
    watch(readyPlayList.value,value => {
      console.log(value);
      if (value.length){
        store.commit('setPlayBarShowFlag',true);
      }else {
        store.commit('setPlayBarShowFlag',false);
      }
    })
    // 监听判断是否开始播放
    watch(playSongFlag.value,value => {
      console.log(value)
    })
    const currentRate = ref(0);
    const text = computed(() => currentRate.value.toFixed(0) + '%');

    const showModalFlag = ref(false);
    const showModal = ()=>{
      showModalFlag.value = true;
    };
    const triggerPlay=()=>{
      store.commit('setPlaySongFlag',true);
    };
    const triggerPause=()=>{
      store.commit('setPlaySongFlag',false);

    };
    const deleteSong = (index: number)=>{
       console.log(index)
    }
    const deleteList=()=>{
      Dialog.confirm({
        title: '确定清空播放列表么',
      })
          .then(() => {
            // on confirm
           console.log()
          })
          .catch(() => {
            // on cancel
          });
    };

    const showPlay=()=>{
      store.commit('setPlayPageShowFlag',true);
    }
    return {
      text,
      currentRate,
      playSongFlag,
      triggerPlay,
      triggerPause,
      showModal,
      showModalFlag,
      deleteSong,
      deleteList,
      showPlay,
      showPlayBarFlag,
      readyPlayList,
    };
  }
});
</script>
