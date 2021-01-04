<template >
  <div class="list-container">
    <div class="list-item" v-for="item in list" :key="item" @click="goToColumn(item.id)">
      <img v-lazy="item.picUrl">
      <div class="icon-container">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-tingshu"></use>
        </svg>
        <span>{{item.playCount}}万</span>
      </div>
      <span class="column-desc">
          {{item.name}}
      </span>
    </div>
    <van-overlay :show="showLoading" @click="showModalFlag = false" style="display: flex;justify-content: center;align-items: center">
      <van-loading color="#d44439" />
    </van-overlay>
  </div>
</template>

<style scoped lang="less">
  .list-container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
    box-sizing: border-box;
    .list-item{
      flex: 1 1 33.33%;
      height: 316px;
      box-sizing: border-box;
      padding: 5px 8px;
      border-radius: 10px;
      overflow: hidden;
      position: relative;
       img{
        width: 100%;
        object-fit: contain;
      }
      .column-desc{
        font-size: 26px;
        line-height: 1.2;
        padding: 6px 2px 0 6px;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp:2;
        -webkit-box-orient: vertical;
      }
      .icon-container{
        position: absolute;
        right: 20px;
        top: 20px;
        color: #f1f1f1;
        font-weight: 600;
        font-size: 24px;
        line-height: 30px;
        display: flex;
        align-items: center;
        >svg{
          font-size: 30px;
          font-weight: 600;
        }
      }
    }
  }
</style>
<script lang="ts">
import {defineComponent, ref, watch} from 'vue';
import {useRouter} from "vue-router";
import {getRecommendList} from "@/api/home";
import {Toast} from "vant";
export default defineComponent({
   name: 'recommend',
  setup(){
    const showLoading =ref(false);
     showLoading.value =true;
     const router = useRouter();
     const  goToColumn = (id: number)=>{
       router.push({
         path:'/column/',
         query:{
           tag:'歌单',
           id:id
         }
       })
     }
     const list = ref([]);
     const _getColumnData = async ()=>{
       const {data} = await getRecommendList();
       showLoading.value =false;
       list.value =  data.result.map((item: any)=>{
         item.playCount =  Math.floor(item.playCount/10000);
         return item;
       })
     }
     _getColumnData();
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
      goToColumn,
      list,
      showLoading,
    }
  }
});
</script>
