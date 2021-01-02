<template >
  <div class="container">
    <van-index-bar :index-list="indexList" :sticky-offset-top="88">
      <van-index-anchor index="热">热门</van-index-anchor>
      <van-cell class="item-container"  v-for="item in hostList" :key="item" @click="goToColumn(item)">
         <div class="content">
           <div class="avatar-container">
             <img v-lazy="item.picUrl"/>
           </div>
           <span>{{item.name}}</span>
         </div>
      </van-cell>

      <div v-for="item in singList" :key="item">
        <van-index-anchor :index="item[0]">{{item[0]}}</van-index-anchor>
        <van-cell class="item-container" v-for="itemInner in item[1]" :key="itemInner">
           <div class="content">
             <div class="avatar-container">
               <img v-lazy="itemInner.picUrl"/>
             </div>
             <span>{{itemInner.name}}</span>
           </div>
        </van-cell>
      </div>
    </van-index-bar>

  </div>
</template>

<style scoped lang="less">
 .container{
   margin-top: 176px;
   .title{
     background: transparent;
   }
   .item-container{
     width: 100%;
     height:140px;
     box-sizing: border-box;
     .content{
       height: 100%;
       display: flex;
       align-items: center;
       .avatar-container{
         flex: 0 0 120px;
         height: 120px;
         margin-right: 40px;
         img{
           width: 100%;
           object-fit:contain;
         }
     }
     }
     >span{
       margin-left: 50px;
       font-size: 28px;
     }
   }
 }
</style>
<script lang="ts">
import {defineComponent, ref} from 'vue';
import {getSingerList} from "@/api/singer";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pinyin = require('pinyin');
export default defineComponent({
   name: 'index',
  setup() {
     const  indexList='热ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
     const singList= ref();
     const router =useRouter();
     const store = useStore();
     const hostList= ref([]);
     let rawList: any =[];
     function handler(){
      // 设置热
       hostList.value = rawList.slice(0,9);
      const sortedData = rawList.sort((a: any, b: any) => {
        return pinyin(a.name)[0][0].localeCompare(pinyin(b.name)[0][0]);
      })
      const listMap = new Map();
      sortedData.forEach((item: any)=>{
        const first = pinyin(item.name[0],{
          style:pinyin.STYLE_FIRST_LETTER
        })[0][0].toUpperCase();
        if (listMap.has(first)){
          const arr =listMap.get(first);
          arr.push(item);
          listMap.set(first,arr)
        }else {
          listMap.set(first,[item])
        }
      })
       singList.value =Array.from(listMap);
    }
     const _getList =async ()=>{
       const {data} = await getSingerList();
       console.log(data);
       rawList =data.artists;
       handler();
     }
    _getList();
     const goToColumn=(item: any)=>{
       router.push({
         path:'/column/',
         query:{
           tag:'歌手',
           id:item.id
         }
       })
     }
    return {
     indexList,
      singList,
      hostList,
      goToColumn,
    };
  },
});
</script>
