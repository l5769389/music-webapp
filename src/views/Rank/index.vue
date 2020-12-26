<template >
  <div class="container">

    <div class="item-container">
      <div class="img-container">
        <img src="@/asset/imgs/column1.jpg">
      </div>
      <div class="list-container">
          <span  v-for="(item,index) in songs" :key="item.name">
            <span>{{index+1}}.</span>
            <span>{{item.name}}-</span>
            <span>{{item.singer}}</span>
          </span>
        </div>
    </div>
    <van-divider />
    <div class="item-container">
      <div class="img-container">
        <img src="@/asset/imgs/column1.jpg">
      </div>
      <div class="list-container">
          <span  v-for="(item,index) in songs" :key="item.name">
            <span>{{index+1}}.</span>
            <span>{{item.name}}-</span>
            <span>{{item.singer}}</span>
          </span>
      </div>
    </div>
    <van-divider />
    <div class="item-container">
      <div class="img-container">
        <img src="@/asset/imgs/column1.jpg">
      </div>
      <div class="list-container">
          <span  v-for="(item,index) in songs" :key="item.name">
            <span>{{index+1}}.</span>
            <span>{{item.name}}-</span>
            <span>{{item.singer}}</span>
          </span>
      </div>
    </div>
    <van-divider />
    <div class="item-container">
      <div class="img-container">
        <img src="@/asset/imgs/column1.jpg">
      </div>
      <div class="list-container">
          <span  v-for="(item,index) in songs" :key="item.name">
            <span>{{index+1}}.</span>
            <span>{{item.name}}-</span>
            <span>{{item.singer}}</span>
          </span>
      </div>
    </div>
    <van-divider />
    <div class="item-container">
      <div class="img-container">
        <img src="@/asset/imgs/column1.jpg">
      </div>
      <div class="list-container">
          <span  v-for="(item,index) in songs" :key="item.name">
            <span>{{index+1}}.</span>
            <span>{{item.name}}-</span>
            <span>{{item.singer}}</span>
          </span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
  .container{
    padding: 15px 10px;
    display: flex;
    flex-direction: column;
    .item-container{
      display: flex;
      height: 200px;
      align-items: center;
      .img-container{
        flex: 0 0 200px;
        border-radius: 10%;
        padding-left: 20px;
        img{
          width: 100%;
          object-fit: contain;
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

        }
      }
    }
  }
</style>
<script lang="ts">
import {  defineComponent  } from 'vue';
export default defineComponent({
   name: 'index',
  setup(){
     const songs=[
      {
        name:'因为你，所以我',
        singer:'五月天aaaaaaaaa'
      },
       {
         name:'因为你，所以我',
         singer:'五月天'
       },
       {
         name:'因为你，所以我',
         singer:'五月天'
       }
    ]
    return {
      songs
    }

  }
});
</script>
