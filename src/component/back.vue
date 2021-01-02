<template>
  <div :class="['header',showFlag?'active':'inactive']">
    <van-icon name="arrow-left" size="24" @click="goBack"/>
    <slot>
      <span class="title" v-if="showFlag">{{mytitle}}</span>
      <span class="title" v-else>{{init}}</span>
      <span></span>
    </slot>
  </div>
</template>

<style scoped lang="less">
.header{
  height: 88px;
  width: 100%;
  font-size: 40px;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  color: white;
  i{
    position: fixed;
    left: 0;
    top: 20px;
    z-index: 100;
  }
}
.active{
  background: #d44439;
}
.inactive{

}
</style>
<script lang="ts">
import {computed, defineComponent, ref, watch} from 'vue';
import {useRouter} from "vue-router";

export default defineComponent({
  name: 'back',
  props:{
    showFlag:{
      type:Boolean,
      default:false
    },
    initTitle:{
      type:String,
    },
    title:{
      type:String,
      default: ''
    }
  },
  setup(props){
    const init = computed(()=>props.initTitle);
    const mytitle = computed(()=>props.title);
    const flag = computed(()=>props.showFlag);
    const router = useRouter();
    const goBack = ()=>{
      if (window.history.length<=2){
        router.push('/')
      }else {
        router.go(-1);
      }
    }
    return {
      init,
      flag,
      mytitle,
      goBack,
    }
  }
});
</script>
