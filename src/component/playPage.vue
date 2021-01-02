<template>
<!--  播放主界面-->
  <div class="play-wrapper" v-if="showPlayPageFlag">
    <div class="back-container" >
      <div class="header">
        <van-icon name="arrow-down" @click="hideSongPlay" />
        <div>
          <span>{{readyPlayList[nowPlayingIndex].musicObj.name}}</span>
          <small>{{readyPlayList[nowPlayingIndex].musicObj.desc}}</small>
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
            <div>
              <van-slider  active-color="#ee0a24" inactive-color="rgba(0,0,0,0.3)" bar-height="4px"
                  v-model="progressPercent"
                  @drag-start="ondragstart"
                  @drag-end="ondragend"
                  @update:model-value="onchangeNow"
                  @change="onChange"
                 >
                <template #button>
                  <!-- 正常播放时-->
                  <div class="custom-button" v-show="!dragFlag">{{_timeFormatSecond(songtime.start)}}</div>
                  <!-- 拖动时   -->
                  <div class="custom-button" v-show="dragFlag">{{progressContent}}</div>
                </template>
              </van-slider>
            </div>
            <span>{{_timeFormatSecond(songtime.end)}}</span>
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

            <svg class="icon" aria-hidden="true" @click="turnToPre">
              <use xlink:href="#icon-shangyishoushangyige"></use>
            </svg>
            <van-icon v-if="!playSongFlag" size="40" name="play-circle-o"  @click.stop="triggerPlay" />
            <van-icon v-else size="40" name="pause-circle-o"  @click.stop="triggerPause" />


            <svg class="icon" aria-hidden="true" @click="turnToNext">
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
          >span{
            flex: 0 0 80px;
          }
          >div{
            flex: 1;
            margin-left: 20px;
            margin-right: 20px;
          }
        }
        .scroll-container{
          display: flex;
          justify-content: space-between;
          margin-top: 40px;
          font-size: 55px;
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

  .custom-button {
    width: 120px;
    color: #fff;
    font-size: 36px;
    line-height: 45px;
    height: 45px;
    text-align: center;
    background-color: #ee0a24;
    border-radius: 100px;
  }
</style>
<script lang="ts">
import {computed, defineComponent, reactive, ref, watch} from 'vue';
import {useStore} from "vuex";
import {Toast} from "vant";
import set = Reflect.set;

export default defineComponent({
  name: 'playPage',
  setup(props,context){
    const store = useStore();
    const showPlayPageFlag = computed(()=>store.getters.getPlayPageShowFlag);
    const readyPlayList: any = computed(()=>store.getters.getReadyPlayList);
    const playSongFlag = computed(()=>store.getters.getPlaySongFlag);
    const dragFlag =ref(false);
    const nowPlayingIndex =computed(()=>store.getters.getNowPlayingIndex);
    const songtime: any =computed(()=>store.getters.getSongtime);
    const favoriteList: any =computed(()=>store.getters.getFavoriteList)
    const progressPercent =ref<number>(0);
    const progressContent: any = ref();
    const likeFlag =ref(false);
    watch(()=>songtime.value.start,(value: number) => {
       try{
         progressPercent.value =Number((value /songtime.value.end *100).toFixed(0))
         console.log(progressPercent.value);
       }catch (e){
         progressPercent.value =0;
       }
    })
    //进入页面设置收藏
    function setStar(){
     const index = favoriteList.value.findIndex((item: any)=>{
        return item.id ===readyPlayList.value[nowPlayingIndex.value].id;
      })
      if (index!==-1){
        likeFlag.value=true;
      }else {
        likeFlag.value=false;
      }
    }
    setStar();
    watch([nowPlayingIndex,()=>readyPlayList.value.length],([indexValue,listValue],[preIndex,prelistValue])=> {
        if ( indexValue!== preIndex || listValue!== prelistValue){
          setStar();
        }else {
          setStar();
        }
    })
    const hideSongPlay = ()=>{
      store.commit('setPlayPageShowFlag',false);
    }
    const triggerPlay=()=>{
      store.commit('setPlaySongFlag',true);
    };
    const triggerPause=()=>{
      store.commit('setPlaySongFlag',false);

    };

    const like =()=>{
      store.commit('addFavoriteList',readyPlayList.value[nowPlayingIndex.value].trackObj);
      likeFlag.value =true;
      Toast.success('收藏成功');
    }
    const unlike=()=>{
      const id =readyPlayList.value[nowPlayingIndex.value].id;
      store.commit('removeFavoriteList',id);
      likeFlag.value =false;
    }
    function _timeFormatSecond(time: number){
      return `${Math.floor(time/60).toString().padStart(2,'0')}:${(time%60).toFixed(0).toString().padStart(2,'0')}`
    }
    // 用户手动拖动时,
    const onChange=(value: any)=>{
      store.commit('setSongtime',{
        start:value/100 * songtime.value.end,
        end:songtime.value.end,
      })
    }
    const onchangeNow=(value: any)=>{
    const format = _timeFormatSecond(value/100 * songtime.value.end);
    progressContent.value =format;
    }
    const  ondragstart=()=>{
      dragFlag.value =true;
      store.commit('setPlaySongFlag',false)
    }
    const ondragend=()=>{
      dragFlag.value =false;
      store.commit('setPlaySongFlag',true)
    }
    const turnToPre=()=>{
      const target =nowPlayingIndex.value -1;
      const len = readyPlayList.value.length;
      if (len <=1){
        Toast.fail('没有待播放歌曲');
      }else {
        store.commit('setPlaySongFlag',false)
        if (target<0){
          store.commit('setNowPlayingIndex',len-1)
        }else {
          store.commit('setNowPlayingIndex',target)
        }
      }
    }
    const turnToNext=()=>{
      const target =nowPlayingIndex.value +1;
      const len = readyPlayList.value.length;
      if (len <=1){
        Toast.fail('没有待播放歌曲');
      }else {
        store.commit('setPlaySongFlag',false)
        if (target>len-1){
          store.commit('setNowPlayingIndex',0)
        }else {
          store.commit('setNowPlayingIndex',target)
        }
      }
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
      songtime,
      _timeFormatSecond,
      progressPercent,
      onChange,
      onchangeNow,
      ondragstart,
      ondragend,
      dragFlag,
      progressContent,
      turnToPre,
      turnToNext,
      nowPlayingIndex,
    }
  }
});
</script>
