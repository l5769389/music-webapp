<template>
  <div class="container" ref="lyricRef">
      <span v-for="(item,index) in arr" :key="item" :class="[activeIndex===index?'active':'']">
        {{item[1]}}
      </span>
  </div>
</template>

<style scoped lang="less">
  .container{
    width: 100%;
    height: 100%;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    padding-top: 250px;
    span{
      display: block;
      color: gray;
      height: 70px;
      font-size: 34px;
      text-align: center;
      box-sizing: border-box;
      padding: 18px 0;
    }
    .active{
      color:#d44439;
      font-size: 44px;
      padding:13px 0;
    }
  }
</style>
<script lang="ts">
import {computed, defineComponent, nextTick, ref, watch} from 'vue';
import {getLyric} from "@/api/common/lyric";
import {useStore} from "vuex";

export default defineComponent({
  name: 'lyric',
  props:{
    id:{
      type:Number
    }
  },
  setup(props){
    //歌词数组
    const arr: any =ref([]);
    const store = useStore();
    const nowPlayingIndex: any = computed(()=>store.getters.getNowPlayingIndex);
    const readyPlayList: any = computed(()=>store.getters.getReadyPlayList);
    const currentTime =computed(()=>store.getters.getSongtime.start);
    const  activeIndex =ref(0);
    const  lyricRef =ref();
    let scrollTopVal=0;
    // 设置歌词的高亮
     const findPlayingIndex=(value: any)=>{
     const playingLyricIndex = arr.value.findIndex((item: any)=>{
        return item[0]>value
      })
      if (playingLyricIndex===-1){
        activeIndex.value =arr.value.length-1;
      }else {
        activeIndex.value =playingLyricIndex-1;
      }
    }
     const _getLyric = async ()=>{
      const id =readyPlayList.value[nowPlayingIndex.value].id;
      const {data} =await getLyric(id);
      const lyric =data.lrc.lyric;
      console.log(lyric);
      const lyricArr =lyric.split('\n');
      lyricArr.forEach((item: any)=>{
        let temp: any =[];
        temp =item.split(']');
        temp[0]= temp[0].toString().substring(1);
        const timeArr = temp[0].split(':')
        const second = Number(timeArr[0])*60+Number(timeArr[1]);
        temp[0]=second;
        arr.value.push(temp)
      })
    }
    //设置初始滚动条的位置
     const setScroll=()=>{
      if (activeIndex.value ===0){
        scrollTopVal =0;
      }else {
        scrollTopVal =35*activeIndex.value;
      }
    }
     const init =async ()=>{
      await _getLyric();
      setScroll();
    }
    watch(()=>currentTime.value,(value,preVal) => {
      findPlayingIndex(value);
      //如果两次currentTime的差值过大，那么认为是用户拖动进度条
      if (value - preVal >5){
        setScroll();
      }
    })
    watch(()=>activeIndex.value,value => {
      lyricRef.value.scrollTop =scrollTopVal;
      scrollTopVal =scrollTopVal+35;
    })
    //切歌
    watch([nowPlayingIndex,()=>readyPlayList.value.length],([indexValue,listValue],[preIndex,prelistValue])=> {
      if ( indexValue!== preIndex || listValue!== prelistValue){
        arr.value =[];
        scrollTopVal=0;
        _getLyric();
      }
    })
    init();
    return {
      arr,
      activeIndex,
      lyricRef,
    }
  }
});
</script>
