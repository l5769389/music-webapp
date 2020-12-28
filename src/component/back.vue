<template>
  <div class="header">
    <van-icon name="arrow-left" size="24" @click="goBack"/>
    <slot>
      <span class="title">{{initTitle}}</span>
      <span></span>
    </slot>
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
  justify-content: center;
  z-index: 10;

  i{
    position: fixed;
    left: 0;
    top: 20px;
    z-index: 100;
  }
}
</style>
<script lang="ts">
import {defineComponent, ref, watch} from 'vue';
import {useRouter} from "vue-router";

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
    const router = useRouter();
    initTitle.value = init;
    watch(()=>props.showFlag,value => {
      if (value){
        initTitle.value = props.title;
      }else {
        initTitle.value = init;
      }

    })
    const goBack = ()=>{
      if (window.history.length<=2){
        router.push('/')
      }else {
        router.go(-1);
      }
    }
    return {
      initTitle,
      goBack,
    }
  }
});
</script>
