<template >
  <div class="default-container">
    <div class="hot-search-container">
      <span class="hot">热门搜索</span>
      <div class="tag-container">
        <van-tag v-for="item in hotList" @click="triggerClick(item.first)" :key="item" plain type="primary" size="large" color="gray">{{item.first}}</van-tag>
      </div>
    </div>
    <div v-if="searchList.length" class="search-history-container">
      <div class="desc-container">
        <span>搜索历史</span>
        <van-icon name="delete" size="18" color="gray" @click="deleteList"/>
      </div>
      <div class="item-container" v-for="(item,index) in searchList" :key="item" @click="triggerClick(item)">
        <span>{{item}}</span>
        <van-icon  name="cross" color="gray" size="15" @click="deleteHistory(index)"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.default-container{
   position: absolute;
   top: 120px;
  left: 0;
   width: 100%;
  .hot-search-container,.search-history-container{
    width: 100%;
    box-sizing: border-box;
    padding-left: 30px;
    padding-right: 30px;
  }
  .hot-search-container{
    >span{
      font-size: 24px;
      color: #757575;
      padding: 30px 10px 0 10px;
    }
    .tag-container{
      margin-top: 20px;
      width: 100%;
      box-sizing: border-box;
      padding: 20px 20px;
      overflow: scroll;
      >span{
        margin: 10px 5px;
      }
    }
  }
  .search-history-container{
    margin-top: 60px;
    .desc-container{
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      >span{
        font-size: 24px;
        color: #757575;
      }
    }
    .item-container{
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #2E3030;
      font-size: 28px;
      >span:first-child{
        max-width: 600px;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        -webkit-line-clamp:1;
        overflow: hidden;
      }
    }
  }
}
</style>
<script lang="ts">
import {computed, defineComponent, ref, watch} from 'vue';
import {getHotSearchList} from "@/api/search";
export default defineComponent({
   name: 'default',
  emits:['on-click'],
  props:{
    searchVal:{
      type:String
    }
  },
  setup(props,context){
    const hotList =ref();
    const searchList: any =ref([]);
    watch(()=>props.searchVal,(value: any) => {
      const index = searchList.value.indexOf(value);
      if (index ===-1){
        if (searchList.value.length>9){
          searchList.value.pop();
        }
        searchList.value.unshift(value);
      }else {
        searchList.value.splice(index,1);
        searchList.value.unshift(value);
      }
    })
    const deleteHistory=(index: number)=>{
      searchList.value.splice(index,1);
    }
    const _getHotSearchList =async ()=>{
      const {data:{result:{hots}}} =await getHotSearchList();
      hotList.value = hots;
    }
    const triggerClick=(item: any)=>{
      context.emit('on-click',item);
    }
    _getHotSearchList();
    return{
      hotList,
      searchList,
      deleteHistory,
      triggerClick,

    }
  }
});
</script>
