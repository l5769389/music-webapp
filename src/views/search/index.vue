<template >
  <div class="container">
    <!--  这里 style attribute -->
    <back style="background:red">
      <template v-slot>
        <van-search class="input-container"  v-model="inputVal" @search="triggerSearch" placeholder="请输入搜索关键词"  background="transparent"/>
      </template>
    </back>
    <!--没有输入，收到响应则隐藏 -->
      <default v-show="showDefaultFlag" @on-click="onTagClick" :searchVal="searchVal"></default>
    <!--  有搜索内容且有结果-->
      <has-input v-show="!showDefaultFlag" :inputVal="inputVal" ref="hasInputRef"></has-input>
  </div>
</template>

<style scoped lang="less">
.container{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.input-container{
  width: 100%;
  padding-left: 50px;
  box-sizing: border-box;
}

</style>
<script lang="ts">
import {defineComponent, ref, reactive, watch} from 'vue';
import Back from "@/component/back.vue";
import Default from "@/views/search/default.vue";
import HasInput from "@/views/search/hasInput.vue";
export default defineComponent({
   name: 'index',
  components: {HasInput, Default, Back},
  setup(){
    const inputVal = ref('');
    const showDefaultFlag = ref(true);
    const hasInputRef=ref();
    watch(inputVal,value => {
      if (value===''){
        showDefaultFlag.value =true
      }else {
        showDefaultFlag.value =false
      }
    })
    const onTagClick=(e: any)=>{
      inputVal.value =e;
    }
    const searchVal=ref('');
    const triggerSearch=()=>{
      searchVal.value=inputVal.value;
      hasInputRef.value.getSearchResult(inputVal.value);
    }
     return{
       inputVal,
       showDefaultFlag,
       onTagClick,
       hasInputRef,
       triggerSearch,
       searchVal,
     }
  }
});
</script>
