<template >
<!--  这里 style attribute -->
  <back style="background:red">
      <template v-slot>
        <van-search class="input-container"  v-model="inputVal" placeholder="请输入搜索关键词"  background="transparent"/>
      </template>
  </back>
<!--没有输入，收到响应则隐藏 -->
  <div v-if="false">
    <div class="hot-search-container">
      <span>热门搜索</span>
      <div class="tag-container">
        <van-tag v-for="item in hotList" :key="item" plain type="primary" size="large" color="gray">{{item}}</van-tag>
      </div>
    </div>
    <div v-if="searchList.length" class="search-history-container">
      <div class="desc-container">
        <span>搜索历史</span>
        <van-icon name="delete" size="18" color="gray" @click="deleteList"/>
      </div>
      <div class="item-container" v-for="item in searchList" :key="item">
        <span>{{item}}</span>
        <van-icon  name="cross" color="gray" size="15" @click="deleteHistory(index)"/>
      </div>
    </div>
  </div>
<!--  有搜索内容且有结果-->
  <div class="search-result-container">
    <span>最佳匹配</span>
    <van-list
        v-model:loading="state.loading"
        :finished="state.finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
      <van-cell>
        <template #title>
           <div class="singer-container">
             <img src="../../asset/imgs/column1.jpg">
             <span>歌手：衬衣徐</span>
           </div>
        </template>
      </van-cell>
      <van-cell>
        <template #title>
          <div class="song-container">
            <span>大鱼</span>
            <span>周琛</span>
          </div>
        </template>
      </van-cell>
      <van-cell>
        <template #title>
          <div class="song-container">
            <span>大鱼</span>
            <span>周琛</span>
          </div>
        </template>
      </van-cell>
      <van-cell>
        <template #title>
          <div class="song-container">
            <span>大鱼</span>
            <span>周琛</span>
          </div>
        </template>
      </van-cell>
      <van-cell>
        <template #title>
          <div class="song-container">
            <span>大鱼</span>
            <span>周琛</span>
          </div>
        </template>
      </van-cell>
      <van-cell>
        <template #title>
          <div class="song-container">
            <span>大鱼</span>
            <span>周琛</span>
          </div>
        </template>
      </van-cell>
      <van-cell>
        <template #title>
          <div class="song-container">
            <span>大鱼</span>
            <span>周琛</span>
          </div>
        </template>
      </van-cell>
      <van-cell>
        <template #title>
          <div class="song-container">
            <span>大鱼</span>
            <span>周琛</span>
          </div>
        </template>
      </van-cell>
      <van-cell>
        <template #title>
          <div class="song-container">
            <span>大鱼</span>
            <span>周琛</span>
          </div>
        </template>
      </van-cell>
      <van-cell>
        <template #title>
          <div class="song-container">
            <span>大鱼</span>
            <span>周琛</span>
          </div>
        </template>
      </van-cell>
      <van-cell>
        <template #title>
          <div class="song-container">
            <span>大鱼</span>
            <span>周琛</span>
          </div>
        </template>
      </van-cell>
      <van-cell>
        <template #title>
          <div class="song-container">
            <span>大鱼</span>
            <span>周琛</span>
          </div>
        </template>
      </van-cell>
      <van-cell>
        <template #title>
          <div class="song-container">
            <span>大鱼</span>
            <span>周琛</span>
          </div>
        </template>
      </van-cell>
      <van-cell>
        <template #title>
          <div class="song-container">
            <span>大鱼</span>
            <span>周琛</span>
          </div>
        </template>
      </van-cell>
      <van-cell>
        <template #title>
          <div class="song-container">
            <span>大鱼</span>
            <span>周琛</span>
          </div>
        </template>
      </van-cell>
      <van-cell>
        <template #title>
          <div class="song-container">
            <span>大鱼</span>
            <span>周琛</span>
          </div>
        </template>
      </van-cell>
      <van-cell>
        <template #title>
          <div class="song-container">
            <span>大鱼</span>
            <span>周琛</span>
          </div>
        </template>
      </van-cell>

    </van-list>
  </div>
</template>

<style scoped lang="less">

.input-container{
  width: 100%;
  padding-left: 50px;
  box-sizing: border-box;
  ::-webkit-input-placeholder{

  }
}
.header{
  //height: 88px;
  //background: #d44439;
  //width:100%;
  //display: flex;
  //align-items: center;
  //margin-bottom: 40px;
  //position: fixed;
  //top: 0;
  //left: 0;
  //z-index: 10;
}
.hot-search-container,.search-history-container{
  width: 100%;
  margin-top: 30px;
  box-sizing: border-box;
  padding-left: 30px;
  padding-right: 30px;
}
.hot-search-container{
  >span{
    font-size: 24px;
    color: #757575;
  }
  .tag-container{
    margin-top: 20px;
    width: 100%;
    height: 200px;
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
  }
}
.search-result-container{
  margin-top: 88px;
  >span{
    color: #d44439;
    font-size: 24px;
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
    >span{
      &:first-child{
        font-size: 32px;
      }
      &:last-child{
        font-size: 28px;
        color:#757575;
      }
    }
  }
}
</style>
<script lang="ts">
import {defineComponent, ref,reactive} from 'vue';
import Back from "@/component/back.vue";
export default defineComponent({
   name: 'index',
  components: {Back},
  setup(){
     const inputVal = ref('');
     const hotList = ref([
        '薛之谦',
        '薛之谦薛之谦',
        '薛之谦',
        '薛之谦',
        '薛之谦',
        '薛之谦薛之谦',
        '薛之谦',
       '薛之谦',
       '薛之谦薛之谦',
       '薛之谦',
       '薛之谦',
       '薛之谦',
       '薛之谦薛之谦',
       '薛之谦',
     ]);
     const searchList= ref([
      '薛之谦','蔡依林'])
    const deleteHistory=(index: number)=>{
       searchList.value.splice(index,1);
    }
    const state = reactive({
      list: [],
      loading: false,
      finished: false,
    });

    const onLoad = () => {
      setTimeout(()=>{
        console.log();
        state.loading=false;
      }, 1000);
    };
    const showPlayFlag = ref(false);

     return{
       inputVal,
       hotList,
       searchList,
       deleteHistory,
       state,
       onLoad,

       showPlayFlag,
     }
  }
});
</script>
