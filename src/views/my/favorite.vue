<template >
    <songlist></songlist>
</template>

<style scoped>
</style>
<script lang="ts">
import {  defineComponent  } from 'vue';
import Songlist from "@/component/songlist.vue";
export default defineComponent({
   name: 'favorite',
  components: {Songlist},
});
</script>
