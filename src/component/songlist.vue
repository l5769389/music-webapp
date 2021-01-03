<template>
  <div class="container" v-if="tracks.length" >
    <div class="btn-container" @click="playAll">
      <van-icon name="play-circle-o" size="22" />
      <span>播放全部</span>
      <small>(共{{tracks.length}}首)</small>
    </div>
    <van-divider></van-divider>
    <div v-for="(item,index) in tracks" :key="item" @click="goToPlay(index,item.id)">
      <div  class="item-container">
        <span v-if="item.id!==IDplaying">{{index+1}}</span>
        <span v-else>
          <van-icon  class="listening" name="audio" color="#d44439" size="20"/>
        </span>
        <div class="song-container">
          <div :class="['name',item.id ===IDplaying?'active':'inactive']">
            <span>{{item.name}}</span>
            <small v-if="item.alia.length" :class="[item.id ===IDplaying?'active':'inactive']">({{item.alia[0]}})</small>
          </div>
          <div class="song-desc">
            <span v-if="item.ar.length">
            <span v-for="item1 in item.ar" :key="item1">{{item1.name}}-</span>
          </span>
            <span>{{item.name}}</span>
          </div>
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
          flex: 0 0 55px;
          line-height: 55px;
          width: 100%;
          display: flex;
          flex-wrap: nowrap;
          span{
            display: -webkit-box;
            overflow: hidden;
            -webkit-line-clamp:1;
            -webkit-box-orient: vertical;
          }
          small{
            font-size: 28px;
            display: inline;
          }
        }
        .active{
          color: #d44439;
        }
        .inactive{
          color: gray;
        }

        .song-desc{
          line-height: 45px;
          flex: 0 0 45px;
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
import {defineComponent, ref, watch, onMounted, computed, nextTick} from 'vue';
import {useRouter} from "vue-router";
import {getSongSrc} from "@/api/common/songlist";
import {useStore} from "vuex";
export default defineComponent({
  name: 'songlist',
  props:{
    tracks:{
      type:Array,
    }
  },
  setup(props){
    const router =useRouter();
    const store =useStore();
    const readyPlayList: any = computed(()=>store.getters.getReadyPlayList);
    const nowPlayingIndex: any=computed(()=>store.getters.getNowPlayingIndex);
    const IDplaying = computed(()=>store.getters.getNowPlayingSongID);
    const arr: any=computed(()=>props.tracks);
    console.log(props.tracks);
    const playSongFlag: any = computed(()=>store.getters.getPlaySongFlag);
    //点击播放时，将歌曲信息 以及歌曲资源加入vuex的列表中
    const goToPlay =async (index: number,id: number)=>{
      // 点击播放时，先确定一下是否有歌曲在播放
      if (playSongFlag.value === true){
        store.commit('setPlaySongFlag',false);
      }
      //记录一下播放的tracks信息.
      let musicObj: any;
      let trackObj: any;
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
        trackObj =arr.value[index];
      }
      //获取音乐资源
      const {data} =await getSongSrc(id);
      const song = [
        {
          ...data.data[0],
          musicObj:musicObj,
          trackObj,
        }
      ];
      store.commit('setReadyPlayList',song);
      nextTick(()=>{
        store.commit('setPlayBarShowFlag',true);
        store.commit('setPlaySongFlag',true);
      })
    }
    const playAll =async ()=>{
      // 点击播放时，先确定一下是否有歌曲在播放
      // 将播放列表中的所有信息存入vuex中
      if (playSongFlag.value === true){
        store.commit('setPlaySongFlag',false);
      }
        const idlist: any =[];
        arr.value.forEach((item: any)=>{
          idlist.push(item.id);
        })
        const {data} =await getSongSrc(idlist.join(','));
        const songObjList =[];
        // 顺序是歌单中的顺序。
        for (let index=0;index<arr.value.length;index++){
          let  desc=``;
          arr.value[index].ar.forEach((item: any)=>{
              desc =`${desc}-${item.name}`
          })
          // 返回的数据 和请求的id顺序是不对应的
         // map 返回一个数组，不是对象.
         const mapOne =  data.data.filter((item: any)=>{
            return item.id === arr.value[index].id;
          })
          const musicObj: any ={
              name: arr.value[index].name,
              alia: arr.value[index].alia[0] || '',
              desc:`${desc}-${arr.value[index].name}`,
              picUrl: arr.value[index].al.picUrl,
            }
            songObjList.push({
              musicObj:musicObj,
              ...mapOne[0],
              trackObj:arr.value[index]
            })
        }
        store.commit('setReadyPlayList',songObjList);
        store.commit('setPlayBarShowFlag',true);
        store.commit('setPlaySongFlag',true);
    }
    return{
      goToPlay,
      playAll,
      readyPlayList,
      nowPlayingIndex,
      IDplaying,
    }
  }
});
</script>
