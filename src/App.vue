<template>
  <router-view/>
  <playbar></playbar>
  <play-page></play-page>
  <song-audio></song-audio>
</template>

<style lang="less">
</style>

<script lang="ts">
import {computed, defineComponent, ref, watch,onMounted} from 'vue';
import {useRoute, useRouter} from "vue-router";
import PlayPage from '@/component/playPage.vue';
import playbar from "@/component/playbar.vue";
import SongAudio from "@/component/SongAudio.vue";
import {getGlobalData, setGlobalData, removeGlobalData} from "@/common/localStorage";
import {useStore} from "vuex";

export default defineComponent({
  name: 'index',
  components:{SongAudio, PlayPage, playbar},
  setup(){
    // 读取localStorage数据
    const store = useStore();
    const songObj = getGlobalData();
    if (songObj.recentList){
      store.commit('initRecentPlayList',songObj.recentList);
    }
    if (songObj.favoriteList){
      store.commit('setFavoriteList',songObj.favoriteList);
    }
    const flist =computed(()=>store.getters.getFavoriteList);
    const rlist =computed(()=>store.getters.getRecentPlayList);
    watch(()=>rlist.value.length,value=>{
      removeGlobalData('recentList');
      setGlobalData('recentList',rlist.value)
    })
    watch(()=>flist.value.length,value=>{
      removeGlobalData('favoriteList')
      setGlobalData('favoriteList',flist.value)
    })
  }
});
</script>
