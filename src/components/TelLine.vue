<script setup lang="ts">
import { Dialog } from "vant";
type Props = {
  tel?: string;
};
let props = defineProps<Props>();

const telephoneClick = (telephone?:string)=>{
  const a = document.createElement("a");
  a.href = "tel:"+ telephone
  a.click();
}
</script>

<template>
  <div v-if="tel" class="mt-2.5 bg-white flex items-center justify-center py-2" @click="telephoneClick(tel)">
    <span class="text-zinc-400">咨询电话：</span>
    <span class="text-primary">{{tel}}</span>
    <i class="iconfont icon-telephone ml-3 text-xl text-primary w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center" />
  </div>
</template>

<style scoped lang="scss">

</style>