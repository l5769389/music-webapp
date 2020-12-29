<template >
  <audio ref="audioRef" :src="readyPlayList[0]?readyPlayList[0][0].url:''" ></audio>
</template>

<style scoped>

</style>
<script lang="ts">
import {computed, defineComponent, isRef, ref, watch,nextTick} from 'vue';
import {useStore} from "vuex";
export default defineComponent({
   name: 'SongAudio',
  setup(){
    const store =useStore();
    const readyPlayList: any = computed(()=>store.getters.getReadyPlayList);
    const playSongFlag: any = computed(()=>store.getters.getPlaySongFlag);
    const audioRef =ref();
    // 监听判断是否开始播放
    watch(playSongFlag,value => {
      if (value){
        nextTick(()=>{
          audioRef.value.play();
        })
      }else {
        nextTick(()=>{
          audioRef.value.pause();
        })
      }
    })
    return{
      readyPlayList,
      audioRef
    }
  }
});
</script>
