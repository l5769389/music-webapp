<template >
  <div class="list-container">
    <div class="list-item" @click="goToColumn">
      <img src="@/asset/imgs/column1.jpg">
      <div class="icon-container">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-tingshu"></use>
        </svg>
        <span>2176万</span>
      </div>
      <span class="column-desc">
          圣诞唱片店 | 节日专属的耳蜗仪式感四大分卫分为非是的撒登机牌
      </span>
    </div>
    <div class="list-item">
      <img src="@/asset/imgs/column1.jpg">
    </div>
    <div class="list-item">
      <img src="@/asset/imgs/column1.jpg">
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
import {  defineComponent  } from 'vue';
import {useRouter} from "vue-router";
export default defineComponent({
   name: 'recommend',
  setup(){
     const router = useRouter();
     const  goToColumn = ()=>{
       router.push('/column')
     }
    return {
      goToColumn,
    }
  }
});
</script>
