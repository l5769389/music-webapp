<template >
  <div class="container">
    <p>官方榜单</p>
    <div v-for="item in songs" :key="item" @click="gotoColumn(item.id)">
      <div class="item-container" >
        <div class="img-container">
          <img v-lazy="item.coverImgUrl">
        </div>
        <div class="list-container">
          <span  v-for="(item1, index) in item.tracks" :key="item1">
            <span>{{index+1}}.</span>
            <span>{{item1.first}}-</span>
            <span>{{item1.second}}</span>
          </span>
        </div>
      </div>
      <van-divider />
    </div>
    <van-overlay :show="showLoading" @click="showModalFlag = false" style="display: flex;justify-content: center;align-items: center">
      <van-loading color="#d44439" />
    </van-overlay>
  </div>
</template>

<style scoped lang="less">
  .container{
    padding: 15px 10px;
    display: flex;
    flex-direction: column;
    >p{
      margin-bottom: 20px;
    }
    .item-container{
      display: flex;
      height: 200px;
      align-items: center;
      .img-container{
        flex: 0 0 200px;
        height: 100%;
        padding-left: 20px;
        img{
          width: 100%;
          object-fit: contain;
          border-radius: 10%;
        }
      }
      .list-container{
        flex: 1;
        height: 100%;
        padding: 20px 10px 20px 30px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        >span{
          display: -webkit-box;
          -webkit-line-clamp:1;
          overflow: hidden;
          -webkit-box-orient: vertical;
          color: #888;
          font-size: 28px;
        }
      }
    }
  }
</style>
<script lang="ts">
import {defineComponent, ref, watch} from 'vue';
import {getRank} from "@/api/rank";
import {useRouter} from "vue-router";
import {Toast} from "vant";
export default defineComponent({
   name: 'index',
  setup(){
    const showLoading =ref(false);
    showLoading.value =true;
     const songs=ref<any>([]);
     const router = useRouter();
     const RankNameList=['飙升榜','新歌榜','热歌榜','原创榜','畅销榜'];
   const _getRankData=async ()=>{
       const {data:{list}} = await getRank();
     showLoading.value =false;
        const  needList: any[]= [];
        list.forEach((item: any)=>{
          if (RankNameList.includes(item.name)){
            needList.push(item)
          }
        })
     songs.value =needList;
   }
   _getRankData();
   const gotoColumn=(id: any)=>{
     router.push({
       path:`/column/`,
       query:{
         tag:`飙升榜`,
         id:id,
       }
     })
   }
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
      songs,
      gotoColumn,
      showLoading,
    }

  }
});
</script>
