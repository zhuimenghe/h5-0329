<template>
  <div class="rental-contact">
    <img src="~@/assets/imgs/contact/banner.jpg" alt="" class="banner">
    <div class="bg-gray-bg pb">
      <form class=" px py-xl bg-white" ref="form" @submit="submit">
        <div class=" mb-lg flex items-center">
          <span class=" w-25 font-bold text-justify">您的姓名</span>
          <span class="text-left text-primary w">*</span>
          <input v-model="formData.username" type="text" required class="flex-1 rounded border border-gray-border py-xs px-sm" placeholder="请输入您的姓名">
        </div>
        <div class=" mb-lg flex items-center">
          <span class=" w-25 font-bold text-justify">您的电话</span>
          <span class="text-left text-primary w">*</span>
          <input v-model="formData.telephone" type="text" required class="flex-1 rounded border border-gray-border py-xs px-sm" placeholder="请输入您的电话">
        </div>
        <div class=" mb-lg flex items-center">
          <span class=" w-25 font-bold text-justify">公司名称</span>
          <span class="text-left text-primary w"></span>
          <input v-model="formData.company" type="text" class="flex-1 rounded border border-gray-border py-xs px-sm" placeholder="请输入您的公司名称">
        </div>
        <div class=" mb-lg flex items-center">
          <span class=" w-25 font-bold text-justify">联系邮箱</span>
          <span class="text-left text-primary w"></span>
          <input v-model="formData.email" type="text" class="flex-1 rounded border border-gray-border py-xs px-sm" placeholder="请输入您的邮箱">
        </div>
        <div class=" mb-lg flex items-center">
          <span class=" w-25 font-bold text-justify">联系地址</span>
          <span class="text-left text-primary w"></span>
          <input v-model="formData.address" type="text" class="flex-1 rounded border border-gray-border py-xs px-sm" placeholder="请输入您的地址">
        </div>
        <input type="submit" value="提交" class="w-full bg-primary flex items-center justify-center text-white rounded py-xs text-lg">
      </form>
    </div>
    <sany-footer></sany-footer>
  </div>
  <overlay :show="flag">
    <div class="loading" v-show="flag">
      <loading vertical text-color="red" color="red">提交中...</loading>
    </div>
  </overlay>
</template>

<script setup lang="ts">
import SanyFooter from '@/components/Footer.vue'
import {ref,reactive} from 'vue';
import {rentalContactFormSubmit} from '@/apis/contact'
import {Dialog,Loading,Overlay} from 'vant'

// 自定义表单数据类型
type RentalContactFormData = {
  username:string,
  telephone:string,
  company:string,
  email:string,
  address:string
}

// 绑定表单数据
const formData = reactive<RentalContactFormData>({
  username:'',
  telephone:'',
  company:'',
  email:'',
  address:''
})

// 获取表单对象，用于验证必填字段
const form = ref()
// 控制loading是否显示
const flag = ref(false)
function submit(e:Event){

  if(form.value.checkValidity()){
    // 显示loading
    flag.value = true
    rentalContactFormSubmit(formData).then(respData=>{
      // 关闭loading
      flag.value = false
      Dialog.alert({message:'提交成功！'})
    }).catch(err=>{
      // 关闭loading
      flag.value = false
      Dialog.alert({message:`提交失败！${err.data.msg}`})
    })
  }

  e.preventDefault();

}


</script>

<style scoped lang="scss">
  .banner{
    height:10.24rem;
    display: block;
  }

  .rental-contact{
    background: #f5f4f9;
  }
  .loading{
    position: fixed;
    top: 30%;
    left: 0;
    width: 100%;
  }
</style>
