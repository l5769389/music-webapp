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
        font-size: 13px;
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
import {defineComponent, ref} from 'vue';
import {useRouter} from "vue-router";
import {getRecommendList} from "@/api/home";
export default defineComponent({
   name: 'recommend',
  setup(){
     const router = useRouter();
     const  goToColumn = (id: number)=>{
       router.push(`/column/${id}`)
     }
     const list = ref([]);
     const _getColumnData = async ()=>{
       const {data} = await getRecommendList();
       list.value =  data.result.map((item: any)=>{
         item.playCount =  Math.floor(item.playCount/10000);
         return item;
       })
     }
     _getColumnData();
    return {
      goToColumn,
      list,
    }
  }
});
</script>
