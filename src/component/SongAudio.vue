<template >
  <audio ref="audioRef" :src="readyPlayList[nowPlayingIndex] && readyPlayList[nowPlayingIndex].url"
         @play="onplay"
         @playing="onplaying"
         @loadedmetadata="onloadedmetadata"
         @timeupdate="ontimeupdate"
         @ended="onended"
  >
  </audio>
</template>

<style scoped>

</style>
<script lang="ts">
import {computed, defineComponent, isRef, ref, watch, nextTick, reactive} from 'vue';
import {useStore} from "vuex";
export default defineComponent({
   name: 'SongAudio',
  setup(){
    const store =useStore();
    const readyPlayList: any = computed(()=>store.getters.getReadyPlayList);
    const playSongFlag: any = computed(()=>store.getters.getPlaySongFlag);
    const nowPlayingIndex: any = computed(()=>store.getters.getNowPlayingIndex);
    const audioRef =ref();
    const currentTime =computed(()=>store.getters.getSongtime.start);
    // 当自由播放时，触发currentTime的改变，来触发时间的变化
    // 当用户手动拖动进度条时，需要判断进度条的差值来决定是自由触发，还是手动触发。
    watch(currentTime,value => {
       if (Math.abs(value-audioRef.value.currentTime)<=10){
          return;
       }else {
         audioRef.value.currentTime =value;
       }
    })
    const songtime=reactive({
         start:0,
          end:0,
    })
    // 监听判断是否开始播放，对应情况是:1.点击播放按钮 2. 播放index值发生改变 3.播放列表的长度发生变化，即有删减。 这2种情况应该触发playSongFlag
    watch(playSongFlag,(value: boolean) => {
       if (value ===true){
         nextTick(()=>{
          store.commit('setRecentPlayList',readyPlayList.value[nowPlayingIndex.value].trackObj);
           audioRef.value.play();
         })
       }else {
         nextTick(()=>{
           audioRef.value.pause();
         })
       }
    })
    watch([nowPlayingIndex,()=>readyPlayList.value.length],([indexValue,listValue],[preIndex,prelistValue])=> {
      if (listValue ===0){
        store.commit('setPlaySongFlag',false);
      }else {
        if ( indexValue!== preIndex || listValue!== prelistValue){
          store.commit('setPlaySongFlag',true)
        }else {
          store.commit('setPlaySongFlag',false)
        }
      }
    })
    const onended =()=>{
      store.commit('setPlaySongFlag',false);
      const tempIndex: number =nowPlayingIndex.value+1;
      store.commit('setNowPlayingIndex',tempIndex)
    }
    const onplay =()=>{
      console.log('onplay')
    }
    const onplaying =()=>{
      console.log('onplaying')
    }
    const onloadedmetadata =(res: any)=>{
      songtime.end =res.target.duration;
      store.commit('setSongtime',songtime)
    }
    const  ontimeupdate=(res: any)=>{
      console.log('onupdate');
      console.log(res);
      songtime.start =res.target.currentTime;
      store.commit('setSongtime',songtime)
    }
    return{
      readyPlayList,
      audioRef,
      onended,
      onplay,
      onplaying,
      onloadedmetadata,
      ontimeupdate,
      nowPlayingIndex,
    }
  }
});
</script>
