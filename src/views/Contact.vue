<template>
  <div>
    <img src="~@/assets/imgs/contact/banner.jpg" alt="" class="banner">
    <div class="bg-gray-bg pb">
      <form class=" px py-xl bg-white" ref="form" @submit="submit">
        <div class=" mb-lg flex items-center">
          <span class=" w-16 font-bold text-justify">您的姓名</span>
          <span class="text-left text-primary w">*</span>
          <input type="text" required class="flex-1 rounded border border-gray-border py-xs px-sm">
        </div>
        <div class=" mb-lg flex items-center">
          <span class=" w-16 font-bold text-justify">您的电话</span>
          <span class="text-left text-primary w">*</span>
          <input type="text" required class="flex-1 rounded border border-gray-border py-xs px-sm">
        </div>
        <div class=" mb-lg flex items-center">
          <span class=" w-16 font-bold text-justify">公司名称</span>
          <span class="text-left text-primary w"></span>
          <input type="text" class="flex-1 rounded border border-gray-border py-xs px-sm">
        </div>
        <div class=" mb-lg flex items-center">
          <span class=" w-16 font-bold text-justify">联系邮箱</span>
          <span class="text-left text-primary w"></span>
          <input type="text" class="flex-1 rounded border border-gray-border py-xs px-sm">
        </div>
        <div class=" mb-lg flex items-center">
          <span class=" w-16 font-bold text-justify">地址</span>
          <span class="text-left text-primary w"></span>
          <input type="text" class="flex-1 rounded border border-gray-border py-xs px-sm">
        </div>
        <input type="submit" value="提交" class="w-full bg-primary flex items-center justify-center text-white rounded py-xs text-lg">
      </form>
    </div>
    <sany-footer></sany-footer>
  </div>
</template>

<script setup lang="ts">
import SanyFooter from '@/components/Footer.vue'
import {ref} from 'vue';

const form = ref()
function submit(e:Event){
  e.preventDefault();
  if(form.value.checkValidity()){
    console.log('ok');
  }
}

</script>

<style scoped lang="scss">
  .banner{
    height:10.24rem;
    display: block;
  }
</style>
