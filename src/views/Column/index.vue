<template>
  <back :showFlag="showFlag" :title="title"></back>
  <div class="top-container-base" id="container"  :style="{height:backHeight+'vw'}" ref="containerRef">
    <div class="desc" v-if="!showFlag">
       <span>G.E.M.邓紫棋(G.E.M.)</span>
    </div>
  </div>
  <songlist></songlist>
</template>

<style scoped lang="less">
    .top-container-base{
      position: fixed;
      top: 0;
      height: 562px;
      width: 100%;
      z-index: 1;
      filter:blur(0px) ;
      background: center /cover  url("../../asset/imgs/column1.jpg");
      .desc{
        position: absolute;
        left: 30px;
        bottom: 70px;
        font-size: 35px;
        font-weight: 800;
        color: white;
      }
    }
</style>
<script lang="ts">
import {defineComponent, ref,onMounted,onBeforeUnmount} from 'vue';
import Songlist from "@/component/songlist.vue";
import Back from "@/component/back.vue";

export default defineComponent({
  name: 'index',
  components: {Back, Songlist},
  setup(){
    const containerRef = ref();
    const blurVal = ref(0);
    const  backHeight =ref<number>(74.933333);
    const initHeight =74.933333;
    const showFlag = ref(false);
    const title=ref('xxxxx');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const _ =require('lodash');
    onMounted(()=>{
      document.addEventListener('scroll', _.throttle(()=>{
        const scrollVw = document.documentElement.scrollTop/ 750 *100;
        // 注意这里设置的高度值为获取到的2倍。否则会出现下面list组件内部文字滚出白色背景框的情况。
        console.log(scrollVw);
        if (scrollVw>0 && scrollVw <26){
          backHeight.value =initHeight-2*scrollVw;
          blurVal.value = Math.min(scrollVw/initHeight *10,2);
          const ele: HTMLElement |any =document.getElementById('container');
          ele.style['-webkit-filter']=`blur(${blurVal.value}px)`;
          showFlag.value = false;
        }else if (scrollVw <=0){
          blurVal.value=1;
          showFlag.value = false;
        }else {
          // 到顶了
          showFlag.value = true;
          backHeight.value =initHeight-2*26;
        }
      },1))
    })
    return {
      backHeight,
      containerRef,
      blurVal,
      showFlag,
      title,
    }
  }
});
</script>
