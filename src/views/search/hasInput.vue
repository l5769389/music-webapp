<template >

   <div v-if="!suggestShowFlag && hasResultFlag" class="search-result-container" >
     <!--        歌手-->
     <div  class="content-container" v-if="singerObj.list.length" :style="{order:singerObj.order}">
       <div class="header van-hairline--bottom">
         <span >歌手</span>
       </div>
       <div v-for="item in singerObj.list" class="item-container van-hairline--bottom" :key="item" @click="gotoColumn(item.id)">
         <div class="singer-container ">
           <div class="img-container">
             <img v-lazy="item.picUrl">
           </div>
           <span>{{item.name}}</span>
         </div>
       </div>
       <div class="footer">
         {{singerObj.moreText}}
       </div>
     </div>
     <!--        单曲-->
     <div  class="content-container" v-if="songsObj.list.length" :style="{order:songsObj.order}">
       <div class="header van-hairline--bottom">
         <span >单曲</span>
       </div>
       <div v-for="(item,index) in songsObj.list" class="item-container van-hairline--bottom" :key="item" @click="gotoPlay(index,item.id)">
         <div class="song-container ">
            <span :class="['name']">
               <span>{{item.name}}</span>
               <small v-if="item.alia.length">({{item.alia[0]}})</small>
            </span>
           <span class="song-desc">
               <span v-if="item.ar.length">
               <span v-for="item1 in item.ar" :key="item1">{{item1.name}}-</span>
                 <span>{{item.al.name}}</span>
               </span>
         </span>
         </div>
       </div>
       <div class="footer">
         {{songsObj.moreText}}
       </div>
     </div>
     <!--   专辑 -->
     <div  class="content-container" v-if="albumsObj.list.length" :style="{order:albumsObj.order}">
       <div class="header van-hairline--bottom">
         <span >专辑</span>
       </div>
       <div v-for="item in albumsObj.list" class="item-container van-hairline--bottom" :key="item" @click="gotoalbum">
         <div class="album-container ">
           <div class="img-container">
             <img v-lazy="item.picUrl">
           </div>
           <div class="desc-container">
             <span class="name">{{item.name}}</span>
             <span class="name-desc">{{item.artists[0].name}}
            <small>{{timeFormat(item.publishTime)}}</small>
          </span>
           </div>
         </div>
       </div>
       <div class="footer">
         {{albumsObj.moreText}}
       </div>
     </div>
     <!--  歌单 -->
     <div  class="content-container" v-if="playListObj.list.length" :style="{order:playListObj.order}">
       <div class="header van-hairline--bottom">
         <span >歌单</span>
       </div>
       <div v-for="item in playListObj.list" class="item-container van-hairline--bottom" :key="item" @click="gotoColumn1(item.id)">
         <div class="playlist-container ">
           <div class="img-container">
             <img v-lazy="item.coverImgUrl">
           </div>
           <div class="desc-container">
             <span class="name">{{item.name}}</span>
             <span class="name-desc">
              <span>{{item.trackCount}}首音乐</span>
              <span>by{{item.creator.nickname}},</span>
              <span>播放{{item.playCount}}次</span>
            </span>
           </div>
         </div>
       </div>
       <div class="footer">
         {{albumsObj.moreText}}
       </div>
     </div>
   </div>
   <div v-else-if="!suggestShowFlag && !hasResultFlag" class="noresult-container">
     <van-empty image="search" description="没有结果" />
   </div>
   <div class="suggest-container" v-else>
     <div class="item-container" v-for="item in suggestList" :key="item" @click="triggerSearch(item.keyword)">
       <van-icon name="search" />
       <span>{{item.keyword}}</span>
     </div>
   </div>
   <van-overlay :show="loadingFlag" class="overlay">
     <van-loading color="#1989fa" class="loading"/>
   </van-overlay>

</template>

<style scoped lang="less">
.overlay{
  display: flex;
  justify-content: center;
  align-items: center;
}
.search-result-container{
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 88px;
  background: #ececec;
  position: relative;
>span{
  color: #d44439;
  font-size: 24px;
  flex:0 0 50px;
  margin-top: 50px;
}
  .content-container{
    width: 90%;
    margin: 40px 5% 40px;
    border-radius: 20px;
    background: white;
    padding: 20px 20px 0 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .header{
      flex: 0 0 50px;
      font-size: 40px;
      display: flex;
      align-items: center;
      font-weight: 600;
    }
    .item-container{
      flex: 0 0 100px;
      display: flex;
      align-items: center;
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
            display: inline-block;
          }
        }
        .song-desc{
          font-weight: 300;
          margin-top: 14px;
          font-size: small;
          display: -webkit-box;
          overflow: hidden;
          -webkit-line-clamp:1;
          -webkit-box-orient: vertical;
        }
      }
      .singer-container{
        display: flex;
        height: 100%;
        justify-content: flex-start;
        margin-left: 30px;
        .img-container{
          flex: 0 0 68px;
          margin-right: 30px;
          img{
            width: 100%;
            object-fit: cover;
            border-radius: 50%;
          }
        }
      }
      .album-container,.playlist-container{
        display: flex;
        height: 100%;
        justify-content: flex-start;
        margin-left: 30px;
        .img-container{
          flex: 0 0 68px;
          margin-right: 30px;
          img{
            width: 100%;
            object-fit: cover;
          }
        }
        .desc-container{
          display: flex;
          height: 100%;
          justify-content: space-between;
          flex-direction: column;
          >span:first-child{
            margin-bottom: 10px;
          }
          .name{
            display: -webkit-box;
            overflow: hidden;
            -webkit-line-clamp:1;
            -webkit-box-orient: vertical;
            small{
              font-size: 28px;
              display: inline-block;
            }
          }
          .name-desc{
            font-weight: 300;
            font-size: small;
            display: -webkit-box;
            overflow: hidden;
            -webkit-line-clamp:1;
            -webkit-box-orient: vertical;
            >span{
              margin-right: 5px;
            }
          }
        }
      }
    }
    .footer{
      flex: 60px;
      font-size: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
.singer-container{
  display: flex;
  align-items: center;
img{
  width: 65px;
  height: 65px;
  margin-right: 30px;
}
}
.song-container{
      display: flex;
      flex-direction: column;
      position: relative;
      width: 100%;
      >span{
        width: 100%;
        box-sizing: border-box;
        padding-right: 40px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp:1;
        overflow: hidden;
        &:first-child{
          font-size: 32px;
        }
        &:last-child{
          font-size: 28px;
          color:#757575;
        }
      }
    }


.album-container{
  display: flex;
  align-items: center;
  >div:first-child{
    flex: 0 0 80px;
    margin-right: 30px;
    img{
      width: 100%;
      object-fit: cover;
    }
  }
  >div{
    display: flex;
    flex-direction: column;
  }
}
  .category{
    font-size: 30px;
    font-weight: 500;
  }
}
.noresult-container,.suggest-container{
  height: 100%;
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-left: 40px;
  padding-right: 40px;
  box-sizing: border-box;
  .item-container{
    flex:  0 0 80px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ebedf0;
    >i{
      font-size: 40px;
      margin-right: 20px;
    }
  }
}
</style>
<script lang="ts">
import {computed, defineComponent, reactive, ref, watch} from 'vue';
import {getSearchAns, getSearchSuggest} from "@/api/search";
import {getSongSrc} from "@/api/common/songlist";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {Toast} from "vant";
export default defineComponent({
  name: 'hasInput',
  props: {
    inputVal: {
      type: String,
    }
  },
  setup(props) {
    const userInputVal = computed(() => props.inputVal);
    const hasResultFlag = ref(false);
    const suggestShowFlag = ref(true);
    const store = useStore();
    const router =useRouter();
    const singerObj = reactive({
      order: 1,
      list: [],
      moreText:''
    });
    const songsObj: any = reactive({
      order: 1,
      list: [],
      moreText:''
    });
    const playListObj: any = reactive({
      order: 1,
      list: [],
      moreText:''
    });
    const albumsObj = reactive({
      order: 1,
      list: [],
      moreText:''
    });
    const loadingFlag=ref(false);

    const _handleResult = (result: any) => {
      console.log(result);
      const order = result.order;
      const bestMatch = result.order[0];
      switch (bestMatch) {
        case 'artist':
          singerObj.order = -1;
          break;
        case 'song':
          songsObj.order = -1;
          break;
        case 'album':
          albumsObj.order = -1;
          break;
        case 'playList':
          playListObj.order = -1;
          break;
        default:
          break;
      }
      order.forEach((item: any) => {
        switch (item) {
          case 'artist':
            singerObj.list = result.artist.artists.slice(0,5);
            singerObj.moreText =result.artist.moreText;
            break;
          case 'song':
            songsObj.list = result.song.songs.slice(0,5);
            songsObj.moreText = result.song.moreText;
            break;
          case 'album':
            albumsObj.list = result.album.albums.slice(0,5);
            albumsObj.moreText = result.album.moreText;
            break;
          case 'playList':
            playListObj.list = result.playList.playLists.slice(0,5);
            playListObj.moreText = result.playList.moreText;
            break;
          default:
            break;
        }
      })

    }
    const getSearchResult = async (searchKeywords: any) => {
      loadingFlag.value =true;
      suggestShowFlag.value = false;
      const {data: {result}} = await getSearchAns(searchKeywords);
      loadingFlag.value =false;
      if (result && result.order) {
        hasResultFlag.value = true
        _handleResult(result)
      } else {
        hasResultFlag.value = false
      }
    }
    function timeFormat(time: any) {
      const timeFormat = new Date(time);
      return `${timeFormat.getFullYear()}-${timeFormat.getMonth() + 1}-${timeFormat.getDate()}`
    }
    const state = reactive({
      list: [],
      loading: false,
      finished: true,
    });
    const suggestList = ref([]);
    const getSuggest = async (searchKeywords: any) => {
      suggestShowFlag.value = true;
      const {data: {result: {allMatch}}} = await getSearchSuggest(searchKeywords);
      suggestList.value = allMatch;
    }
    // getSuggest(userInputVal.value);
    watch(userInputVal, value => {
      if (value !== ''){
        suggestList.value=[];
        getSuggest(userInputVal.value);
      }
    })
    const triggerSearch = (val: any) => {
      if (val ===''){
        return;
      }else {
        getSearchResult(val)
      }
    }
    const playSongFlag: any = computed(() => store.getters.getPlaySongFlag);
    const gotoPlay =async (index: any, id: any) => {
      // 点击播放时，先确定一下是否有歌曲在播放
      if (playSongFlag.value === true) {
        store.commit('setPlaySongFlag', false);
      }
      //获取音乐作者名称和封面等信息,在tracks中
      let desc = ``;
      let musicObj: any;
      if (songsObj.list.length) {
        songsObj.list[index].ar.forEach((item: any) => {
          desc = `${desc}-${item.name}`
        })
        musicObj= {
          name: songsObj.list[index].name,
          alia: songsObj.list[index].alia[0]||'',
          desc: `${desc}-${songsObj.list[index].name}`,
          picUrl: songsObj.list[index].al.picUrl,
        }
      }
      // eslint-disable-next-line prefer-const
    //获取音乐资源
    const {data} = await getSongSrc(id);
    const song = [
      {
        ...data.data[0],
        musicObj: musicObj,
      }
    ];
    store.commit('setReadyPlayList', song);
    store.commit('setPlayBarShowFlag', true);
    store.commit('setPlaySongFlag', true);
  }
    const gotoColumn=(id: any)=>{
      router.push({
        path:'/column/',
        query:{
          tag:'歌手',
          id,
        }
      })
    }
    const  gotoColumn1 = (id: number)=>{
      router.push({
        path:'/column/',
        query:{
          tag:'歌单',
          id:id
        }
      })
    }
    const gotoalbum=()=>{
      Toast.fail('功能还没开发')
    }

    watch(loadingFlag,value => {
      if (value ===true){
        setTimeout(()=>{
          if (value ===true){
            loadingFlag.value =false;
          }
        },2000)
      }
    })
    return {
      state,
      singerObj,
      songsObj,
      albumsObj,
      timeFormat,
      hasResultFlag,
      getSearchResult,
      triggerSearch,
      suggestList,
      suggestShowFlag,
      gotoPlay,
      gotoColumn,
      gotoColumn1,
      gotoalbum,
      playListObj,
      loadingFlag,
    }
  }
});
</script>
