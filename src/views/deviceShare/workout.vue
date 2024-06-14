<script setup lang="ts">
import Tel from '@/components/TelLine.vue'
import { useStore } from 'vuex'
import { Toast } from 'vant';

const store = useStore()
const d = computed<ShareMachine>(() => store.state.share.device)

const formData = reactive<WorkApplyReq>({
  name:'',
  phone:'',
  machineType:'',
  machineHeight:'',
  type:'1',
  resource:d.value.licenseId
})

const router = useRouter()
async function submit(e:Event){
  Toast.loading({
    message: '提交中...',
    forbidClick: true,
  });
  e.preventDefault()

  if (!validatePhone(formData.phone)) {
    return Toast('手机号格式不正确')
  }

  await store.dispatch('share/applyWork',formData)
  Toast.success('提交成功');

  router.back()
}
</script>

<template>
  <div class="bg-[#F5F4F9] h-full pt-3">
    <form class="bg-white px-6 py-7" ref="form" @submit="submit">
      <div class=" mb-lg flex ">
        <span class=" w-20 font-bold text-justify mt-2.5">您的姓名<span class="text-left text-primary w">*</span></span>
        <input v-model="formData.name" type="text" required class="h-12 flex-1 rounded-md border border-gray-border py-sm px-sm" placeholder="请输入您的姓名">
      </div>
      <div class=" mb-lg flex ">
        <span class=" w-20 font-bold text-justify mt-2.5">您的电话<span class="text-left text-primary w">*</span></span>
        <input v-model="formData.phone" type="tel" required class="h-12 flex-1 rounded-md border border-gray-border py-sm px-sm" placeholder="请输入您的电话">
      </div>
      <div class=" mb-lg flex">
        <span class=" w-20 font-bold text-justify mt-2.5">设备类型</span>
        <!-- <input type="text" class="flex-1 rounded border border-gray-border py-xs px-sm"> -->
        <select v-model="formData.machineType" class="h-12 bg-white flex-1 rounded-md border border-gray-border py-sm px-sm">
          <option value="1">自行剪叉式</option>
          <option value="2">自行曲臂式</option>
          <option value="3">自行直臂式</option>
          <option value="4">其他</option>
        </select>
      </div>
      <div class=" mb-lg flex">
        <span class=" w-20 font-bold text-justify mt-2.5">高度</span>
        <!-- <input type="text" class="flex-1 rounded border border-gray-border py-xs px-sm"> -->
        <select v-model="formData.machineHeight" class="h-12 bg-white flex-1 rounded-md border border-gray-border py-sm px-sm">
          <option v-for="h in 15" :value="(h+1)*2+'米'">{{ (h+1)*2 }}米</option>
          <option value="其他">其他</option>
        </select>
      </div>
      <input type="submit" value="提交" class="w-full bg-primary flex justify-center text-white rounded-md py-sm text-lg">
    </form>
    <tel :tel="d.contactphone"></tel>
  </div>
</template>

<style scoped lang="scss">

</style>