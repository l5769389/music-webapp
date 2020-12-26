<template>
  <div class="header">
    <van-icon name="arrow-left" size="24"/>
    <span>{{initTitle}}</span>
    <span></span>
  </div>
</template>

<style scoped lang="less">
.header{
  height: 88px;
  width: 100%;
  font-size: 40px;
  color: white;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10000;

}
</style>
<script lang="ts">
import {defineComponent, ref, watch} from 'vue';

export default defineComponent({
  name: 'back',
  props:{
    showFlag:{
      type:Boolean,
      default:false
    },
    title:{
      type:String,
      default: ''
    }
  },
  setup(props){
    const init = '你特么真鸡儿秀';
    const initTitle = ref();
    initTitle.value = init;
    watch(()=>props.showFlag,value => {
      if (value){
        initTitle.value = props.title;
      }else {
        initTitle.value = init;
      }

    })
    return {
      initTitle
    }
  }
});
</script>
