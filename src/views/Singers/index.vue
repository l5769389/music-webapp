<template >
  <van-index-bar :index-list="indexList">
    <van-index-anchor index="1">热门</van-index-anchor>
    <van-cell >
     <div class="item-container">
       <div class="avatar-container">
         <img src="@/asset/imgs/column1.jpg">
       </div>
       <span>薛之谦</span>
     </div>
    </van-cell>
    <van-cell title="文本" />
    <van-cell title="文本" />

    <van-index-anchor index="2">标题2</van-index-anchor>
    <van-cell title="文本" />
    <van-cell title="文本" />
    <van-cell title="文本" />

    <van-index-anchor index="3">标题2</van-index-anchor>
    <van-cell title="文本" />
    <van-cell title="文本" />
    <van-cell title="文本" />

    <van-index-anchor index="4">标题2</van-index-anchor>
    <van-cell title="文本" />
    <van-cell title="文本" />
    <van-cell title="文本" />
    <van-index-anchor index="5">标题2</van-index-anchor>
    <van-cell title="文本" />
    <van-cell title="文本" />
    <van-cell title="文本" />
  </van-index-bar>
</template>

<style scoped lang="less">
  .title{
    background: transparent;
  }
  .item-container{
    width: 100%;
    height:166px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .avatar-container{
      width:120px;
      border-radius: 50%;
      overflow: hidden;
      img{
        width: 100%;
        object-fit:contain;
      }
    }
    >span{
      margin-left: 50px;
      font-size: 28px;
    }
  }
</style>
<script lang="ts">
import {  defineComponent  } from 'vue'; 
export default defineComponent({
   name: 'index',
  setup() {
    return {
      indexList:['热','A','B','C','D','E']
    };
  },
});
</script>
