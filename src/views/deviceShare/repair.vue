<script setup lang="ts">
import Tel from '@/components/TelLine.vue'
import { useStore } from 'vuex'
import { Toast } from 'vant';

const store = useStore()
const d = computed<ShareMachine>(() => store.state.share.device)

const formData = reactive<RepairApplyReq>({
  name:'',
  phone:'',
  machine:d.value.licenseId,
  matterDesc:'',
  resource:d.value.licenseId
})

const router = useRouter()
async function submit(e:Event){
  Toast.loading({
    message: '提交中...',
    forbidClick: true,
  });
  e.preventDefault()
  if(!formData.name){
    return Toast('请填写姓名');
  }
  if(!formData.phone){
    return Toast('请填写手机号');
  }
  if (!validatePhone(formData.phone)) {
    return Toast('手机号格式不正确')
  }
  await store.dispatch('share/applyRepair',formData)
  Toast.success('提交成功');

  router.back()
}
</script>

<template>
  <div class="bg-[#F5F4F9] h-full pt-3">
    <form class="bg-white px-6 py-7" ref="form" @submit="submit">
      <div class=" mb-lg flex ">
        <span class=" w-20 font-bold text-justify mt-2.5">您的姓名<span class="text-left text-primary w">*</span></span>
        <input v-model="formData.name" type="text" required class="flex-1 rounded-md border border-gray-border py-sm px-sm" placeholder="请输入您的姓名">
      </div>
      <div class=" mb-lg flex ">
        <span class=" w-20 font-bold text-justify mt-2.5">您的电话<span class="text-left text-primary w">*</span></span>
        <input v-model="formData.phone" type="tel" required class="flex-1 rounded-md border border-gray-border py-sm px-sm" placeholder="请输入您的电话">
      </div>
      <div class=" mb-lg flex ">
        <span class=" w-20 font-bold text-justify mt-2.5">报修设备</span>
        <input v-model="formData.machine" type="text" required class="flex-1 rounded-md border border-gray-border py-sm px-sm" >
      </div>
      <div class=" mb-lg flex ">
        <span class=" w-20 font-bold text-justify mt-2.5">问题描述</span>
        <!-- <input type="text" class="flex-1 rounded border border-gray-border py-xs px-sm"> -->
        <textarea v-model="formData.matterDesc" class="flex-1 rounded-md border border-gray-border py-sm px-sm" placeholder="请简要描述设备发生的故障情况"></textarea>
      </div>
      <input type="submit" value="提交" class="w-full bg-primary flex justify-center text-white rounded-md py-sm text-lg">
    </form>
    <tel :tel="d.contactphone"></tel>
  </div>
</template>

<style scoped lang="scss">

</style>