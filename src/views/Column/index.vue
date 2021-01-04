<template>
<!--专栏页面-->
  <back :showFlag="showFlag" :title="title"></back>
  <div class="top-container-base" id="container" v-lazy:background-image="playListObj.backgroundCoverUrl"  :style="{height:backHeight+'vw'}" ref="containerRef">
    <div class="desc" v-if="!showFlag">
       <span class="desc-content">{{playListObj.description}}</span>
       <span v-if="playListObj.updateFrequency" class="frequency-container">{{playListObj.updateFrequency}}</span>
    </div>
    <div class="filter"></div>
  </div>
  <div class="songlist-container">
    <songlist :tracks="playListObj.tracks"></songlist>
  </div>
  <van-overlay :show="showLoading" @click="showModalFlag = false" style="display: flex;justify-content: center;align-items: center">
    <van-loading color="#d44439" />
  </van-overlay>
</template>
<style scoped lang="less">
    .top-container-base{
      position: fixed;
      top: 0;
      height: 562px;
      width: 100%;
      z-index: 1;
      filter:blur(px) ;
      background-size: cover;
      background-repeat: no-repeat;
      .desc{
        position: absolute;
        left: 30px;
        bottom: 70px;
        font-size: 35px;
        font-weight: 800;
        color: white;
        box-sizing: border-box;
        padding-right: 100px;
        >.desc-content{
          display: -webkit-box;
          -webkit-line-clamp:2;
          overflow: hidden;
          -webkit-box-orient: vertical;
          font-size: 32px;
          font-weight: 500;
          line-height: 1.2;
        }
        .frequency-container{
          display: inline-block;
          background: hsla(0,0%,100%,.2);
          color: hsla(0,0%,100%,.6);
          padding-left: 6px;
          padding-right: 6px;
          border-radius: 4px;
          font-size: 20px;
          margin-top: 20px;
        }
      }
      .filter{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.2);
      }
    }
    .songlist-container{
      margin-top: 560px;
      border-radius: 50px;
      transform: translateY(-30px);
      padding-bottom: 120px;
    }
</style>
<script lang="ts">
import {defineComponent, ref, onMounted, onBeforeUnmount, reactive, watch} from 'vue';
import Songlist from "@/component/songlist.vue";
import Back from "@/component/back.vue";

import {useRoute} from "vue-router";
import {getPlaylist, getSingerDesc, getSingerTopList} from "@/api/column";
import {useStore} from "vuex";
import {Toast} from "vant";
export default defineComponent({
  name: 'index',
  components: { Back, Songlist},
  setup(){
    const route = useRoute();
    const showLoading =ref(false);
    showLoading.value =true;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const _ =require('lodash');
    const store = useStore();
    const {tag,id} = route.query;
    const showFlag = ref(false);
    const  initTitle= ref('');
    const title=ref<any>('');
    const playListObj = reactive({
      backgroundCoverUrl:'',
      description:'',
      tracks:[],
      updateFrequency:''
    });
    // 获取专栏歌曲
    const _getData =async ()=>{
      const {data:content} = await  getPlaylist(id);
      showLoading.value=false;
      playListObj.description=content.playlist.description ||'';
      playListObj.backgroundCoverUrl=content.playlist.coverImgUrl;
      playListObj.tracks=content.playlist.tracks;
      playListObj.updateFrequency = content.playlist.updateFrequency;
      title.value =tag;
    }
    const _getSingerData =async ()=>{
    const {data} =await getSingerTopList(id);
    const {data: desc}=await getSingerDesc(id);
    showLoading.value=false;
    playListObj.backgroundCoverUrl= desc.data.artist.cover;
    playListObj.description = desc.data.artist.name;
    playListObj.tracks =data.songs;
    title.value = desc.data.artist.name;
    }
    // 根据id的长短判断是歌手的详情页，还是歌单详情页
    if (tag === '歌手'){
      _getSingerData();
    }else {
      _getData();
    }
    const containerRef = ref();
    const blurVal = ref(0);
    const  backHeight =ref<number>(74.933333);
    const initHeight =74.933333;
    const _handler =  _.throttle(()=>{
      const scrollVw = document.documentElement.scrollTop/ 750 *100;
      // 注意这里设置的高度值为获取到的2倍。否则会出现下面list组件内部文字滚出白色背景框的情况。
      if (scrollVw>0 && scrollVw <32){
        backHeight.value =initHeight-2*scrollVw;
        blurVal.value = Math.min(scrollVw/initHeight *10,2);
        const ele: HTMLElement |any =document.getElementById('container');
        ele.style['-webkit-filter']=`blur(${blurVal.value}px)`;
        showFlag.value = false;
      }else if (scrollVw <=0){
        blurVal.value=1;
        showFlag.value = false;
      }else {
        // 到顶了
        showFlag.value = true;
        backHeight.value =initHeight-2*32;
      }
    },1);
    onMounted(()=>{
      document.addEventListener('scroll',_handler)
    })
    onBeforeUnmount(()=>{
      document.removeEventListener('scroll',_handler)
    })
    watch(showLoading,value => {
      if (value ===true){
        setTimeout(()=>{
          if (value ===true){
            showLoading.value =false;
            Toast.fail('网络出错，请重试')
          }
        },2000)
      }
    })
    return {
      playListObj,
      backHeight,
      containerRef,
      blurVal,
      showFlag,
      title,
      showLoading,
    }
  }
});
</script>
