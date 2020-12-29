<template>
  <router-view/>
  <playbar></playbar>
  <play-page></play-page>
  <song-audio></song-audio>
</template>

<style lang="less">
</style>

<script lang="ts">
import {  defineComponent,ref } from 'vue';
import {useRoute, useRouter} from "vue-router";
import PlayPage from '@/component/playPage.vue';
import playbar from "@/component/playbar.vue";
import SongAudio from "@/component/SongAudio.vue";
export default defineComponent({
  name: 'index',
  components:{SongAudio, PlayPage, playbar},
  setup(){
    const route = useRoute();
    const router = useRouter();
  }
});
</script>
