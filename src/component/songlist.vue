<template>
  <div class="container" >
    <div class="btn-container">
      <van-icon name="play-circle-o" size="22" />
      <span>播放全部</span>
      <small>(共{{tracks.length+1}}首)</small>
    </div>
    <van-divider></van-divider>
    <div v-for="(item,index) in tracks" :key="item" @click="goToPlay(index,item.id)">
      <div  class="item-container">
        <span>{{index+1}}</span>
        <div class="song-container">
          <span class="name"><span>{{item.name}}</span><small v-if="item.alia.length">({{item.alia[0]}})</small></span>
          <span class="song-desc">
            <span v-if="item.ar.length">
            <span v-for="item1 in item.ar" :key="item1">{{item1.name}}-</span>
          </span>
            <span>{{item.name}}</span>
          </span>
        </div>
      </div>
      <van-divider></van-divider>
    </div>
  </div>
</template>

<style scoped lang="less">
  .container{
    width: 100%;

    border-radius: 30px;
    box-sizing: border-box;
    background: #F2F3F4;
    z-index: 1000;
    overflow: hidden;
    padding-left: 30px;
    .btn-container,.item-container{
      display: flex;
      align-items: center;

    }
    .btn-container{
      height: 60px;
      padding-top: 60px;
      box-sizing: border-box;
      >span{
        margin-left: 20px;
      }
      >small{
        font-size: small;
        font-weight: 300;
        margin-left: 10px;
      }
    }
    .item-container{
      height: 75px;
      display: flex;
      .song-container{
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-between;
        margin-left: 30px;
        .name{
          display: -webkit-box;
          overflow: hidden;
          -webkit-line-clamp:1;
          -webkit-box-orient: vertical;
          small{
            font-size: 28px;
            color: gray;
            display: inline-block;
          }
        }
        .song-desc{
          font-weight: 300;
          font-size: small;
          display: -webkit-box;
          overflow: hidden;
          -webkit-line-clamp:1;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
</style>
<script lang="ts">
import {defineComponent, ref,watch,onMounted,computed} from 'vue';
import {useRouter} from "vue-router";
import {getSongSrc} from "@/api/common/songlist";
import {useStore} from "vuex";
export default defineComponent({
  name: 'songlist',
  props:{
    tracks:{
      type:Array
    }
  },
  setup(props){
    const router =useRouter();
    const store =useStore();
    const arr: any=computed(()=>props.tracks);
    const playSongFlag: any = computed(()=>store.getters.getPlaySongFlag);
    //点击播放时，将歌曲信息 以及歌曲资源加入vuex的列表中
    const goToPlay =async (index: number,id: number)=>{
      // 点击播放时，先确定一下是否有歌曲在播放
      if (playSongFlag.value === true){
        store.commit('setPlaySongFlag',false);
      }
      //获取音乐作者名称和封面等信息,在tracks中
      let musicObj: any;
      let  desc=``;
      if (arr.value.length){
        arr.value[index].ar.forEach((item: any)=>{
          desc =`${desc}-${item.name}`
        })
         musicObj ={
          name: arr.value[index].name,
          alia: arr.value[index].alia[0] || '',
          desc:`${desc}-${arr.value[index].name}`,
          picUrl: arr.value[index].al.picUrl,
        }
      }
      //获取音乐资源
      const {data} =await getSongSrc(id);
      // const songlist =computed(()=>store.getters.getReadyPlayList);
      // songlist.value.push({
      //   ...data.data,
      //   musicObj:musicObj,
      // });
      const song = [
        {
          ...data.data,
          musicObj:musicObj,
        }
      ];
      store.commit('setReadyPlayList',song);
      store.commit('setPlayBarShowFlag',true);
      store.commit('setPlaySongFlag',true);
    }
    return{
      goToPlay,
    }
  }
});
</script>
