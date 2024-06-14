<template>
  <div class="buy-contact">
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
          <span class=" w-25 font-bold text-justify">产品系列</span>
          <span class="text-left text-primary w"></span>
          <!-- <input type="text" class="flex-1 rounded border border-gray-border py-xs px-sm"> -->
          <select v-model="formData.index" @change="change" class="flex-1 rounded border border-gray-border py-xs px-sm">
            <option value="0">自行剪叉式</option>
            <option value="1">自行曲臂式</option>
            <option value="2">自行直臂式</option>
          </select>
        </div>
        <!-- <div class=" mb-lg flex items-center">
          <span class=" w-25 font-bold text-last-justify">动力类型</span>
          <span class="text-left text-primary w"></span>
          <select type="text" required class="flex-1 rounded border border-gray-border py-xs px-sm">
            <option value="">HA(液压)</option>
            <option value="">AC(交流)</option>
            <option value="">DC(直流)</option>
          </select>
        </div> -->
        <div class=" mb-lg flex items-center">
          <span class=" w-25 font-bold text-justify">车辆型号</span>
          <span class="text-left text-primary w"></span>
          <select v-model="formData.machineType"  class="flex-1 rounded border border-gray-border py-xs px-sm">
            <option v-for="item in data" :key="item.index" :value="item.machineType">{{item.alias}}</option>
          </select>
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
import {ref,reactive,toRaw} from 'vue';
import {buyContactFormSubmit} from '@/apis/contact'
import {Dialog,Loading,Overlay} from 'vant'

// 自定义表单数据类型
type BuyContactFormData = {
  username:string,
  telephone:string,
  index:number,
  machineType:string,
  machineName:string
}

// 绑定表单数据
const formData = reactive<BuyContactFormData>({
  username:'',
  telephone:'',
  index:0,
  machineType:'',
  machineName:''  // 最后提交时给这个属性赋值
})


// 获取表单对象，用于验证必填字段
const form = ref()
// 控制loading是否显示
const flag = ref(false)

function submit(e:Event){
  if(form.value.checkValidity()){
    // const q = "username=tom&telephone=123"

    // 显示loading
    flag.value = true

    // 提交表单前，设置下车辆的名称系列
    formData.machineName = machineNameList[formData.index]

    buyContactFormSubmit(formData).then(respData=>{
      // 关闭loading
      flag.value = false
      Dialog.alert({message:'提交成功！'})
    })
    .catch(err=>{
      // 关闭loading
      flag.value = false
      Dialog.alert({message:`提交失败！${err.data.msg}`})
    })
  }
  e.preventDefault()
}

// 定义类型，表示三种车辆的一些共有信息
type SP = {
  index:number,// 序号
  machineName:string, // 车辆名称
  machineType:string,// 车辆类型
  alias:string // 车辆别名
}

const machineNameList = [
  '自行剪叉式',
  '自行曲臂式',
  '自行直臂式'
];

const SPS:SP[] = [
  {index:0,machineName:'自行剪叉式',machineType:'SPS1012HA' ,alias:'SPS1012HA(10米)'},
  {index:1,machineName:'自行剪叉式',machineType:'SPS1212HA' ,alias:'SPS1212HA(12米)'},
  {index:2,machineName:'自行剪叉式',machineType:'SPS1012AC' ,alias:'SPS1012AC(10米)'},
  {index:3,machineName:'自行剪叉式',machineType:'SPS1212AC' ,alias:'SPS1212AC(12米)'},
  {index:4,machineName:'自行剪叉式',machineType:'SPS0407DC' ,alias:'SPS0407DC(4米)'},
  {index:5,machineName:'自行剪叉式',machineType:'SPS0507DC' ,alias:'SPS0507DC(5米)'},
]

const SPA:SP[] = [
  {index:6,machineName:'自行曲臂式',machineType:'SPA14AC',alias:'SPA14AC(14米)'},
  {index:7,machineName:'自行曲臂式',machineType:'SPA16AC',alias:'SPA16AC(16米)'},
  {index:8,machineName:'自行曲臂式',machineType:'SPA20AC',alias:'SPA20AC(20米)'},
]

const SPT:SP[] = [
  {index:9 ,machineName:'自行直臂式',machineType:'SPT22',alias:'SPT22(22米)'},
  {index:10,machineName:'自行直臂式',machineType:'SPT26',alias:'SPT26(26米)'},
]

// 二维数组，管理一级菜单和二级菜单的关系
const data_:SP[][] = [SPS,SPA,SPT]

let data = reactive<SP[]>([])

// 切换一级菜单 改变 二级菜单的选项
const change = ()=>{
  // data.length = 0;
  // data = data_[index.value] // 这样没有响应式
  // data_[index.value].forEach(e=>{
    //   data.push(e)
  // })

  // 清空原有下拉列表
  data.splice(0)
  // 更新下拉列表
  data.push(...data_[formData.index])
  // 默认选择第一个选项
  formData.machineType = data[0].machineType
}

// 进入页面先调用一次，给个默认值
change()

</script>

<style scoped lang="scss">
  .banner{
    height:10.24rem;
    display: block;
  }

  .buy-contact{
    background: #f5f4f9;
  }

  .loading{
    position: fixed;
    top: 30%;
    left: 0;
    width: 100%;
  }
</style>
