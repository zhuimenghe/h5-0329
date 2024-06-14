<template>
  <div class="buy-contact">
    <img src="~@/assets/imgs/repair/repair.png" alt="" class="banner">
    <div class="bg-gray-bg pb">
      <form class=" px py-xl bg-white" ref="form" @submit="submit">
        <div class=" mb-lg flex items-center">
          <span class=" w-25 font-bold text-justify">故障类型</span>
          <span class="text-left text-primary w"></span>
          <!-- <input type="text" class="flex-1 rounded border border-gray-border py-xs px-sm"> -->
          <select v-model="formData.faultType" class="flex-1 rounded border border-gray-border py-xs px-sm">
            <option value="0">发动机故障</option>
            <option value="1">操作故障</option>
            <option value="2">其他故障</option>
          </select>
        </div>

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
          <span class=" w-25 font-bold text-justify">故障描述</span>
          <span class="text-left text-primary w"></span>
          <!-- <input type="text" class="flex-1 rounded border border-gray-border py-xs px-sm"> -->
          <textarea v-model="formData.faultDesc" class="flex-1 rounded border border-gray-border py-xs px-sm" placeholder="请简要描述设备发生的故障情况"></textarea>
        </div>
        <div class=" mb-lg flex items-center">
          <span class=" w-27 font-bold text-justify">现场照片</span>
          <span class="text-left text-primary w"></span>
          <uploader v-model="fileList" :after-read="afterRead" :before-delete="beforeDelete" multiple :max-count="5" capture="camera">
            <template #preview-cover="{ file }">
              <div class="preview-cover van-ellipsis">预览</div>
            </template>
          </uploader>
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
import {repairContactFormSubmit} from '@/apis/contact'
import {Dialog,Loading,Overlay,Uploader, UploaderFileListItem} from 'vant'
import {fileUpload} from '@/apis/upload'


// 上传文件实体类型
type RentalFile = {
  id?: string,
  name: string,
  filePath: string,
  fileDesc: string,
  type: string,
  uploadType: string,
  url: string,
  bucket: string,
  businessId?: string
}

// 自定义表单数据类型
type RentalFormData = {
  username:string,
  telephone:string,
  faultType:string,
  faultDesc:string
  faultImg?:RentalFile[]
}

// 绑定表单数据
const formData = reactive<RentalFormData>({
  username:'',
  telephone:'',
  faultType:'0',
  faultDesc:'',
  faultImg:[]
})

// 默认值
const defaulFormDate = {
  username:'',
  telephone:'',
  faultType:'0',
  faultDesc:'',
  faultImg:[]
}

const fileList = ref<any>([
      // { url: 'https://cdn.jsdelivr.net/npm/@vant/assets/leaf.jpeg' },
      // Uploader 根据文件后缀来判断是否为图片文件
      // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
      // { url: 'https://cloud-image', isImage: true },
])


// 获取表单对象，用于验证必填字段
const form = ref()
// 控制loading是否显示
const flag = ref(false)

function submit(e:Event){
  if(form.value.checkValidity()){

    // 显示loading
    flag.value = true

    repairContactFormSubmit(formData).then(_respData=>{
      // 关闭loading
      flag.value = false
      Dialog.alert({message:'提交成功！'})
      // 2参数--赋值-->1参数
      // 表单中的值提交后设置为默认值
      Object.assign(formData,defaulFormDate)
      fileList.value.length = 0

    })
    .catch(err=>{
      // 关闭loading
      flag.value = false
      Dialog.alert({message:`提交失败！${err.data.msg}`})
    })
  }
  e.preventDefault()
}

// 添加上传图片后
const afterRead = (file:any)=>{

  let items:UploaderFileListItem[];
  // 参数file 可能是数组页可能不是数组
  // 看afterRead中的源码可知
  // 这里不管是不是数组都处理成数组，下面好操作
  if(Array.isArray(file)){
    items = file as UploaderFileListItem[]
  }else{
    items = [file as UploaderFileListItem]
  }

  // 单独上传图片的表单数据
  let uploadData = new FormData()
  // 设置俩个参数，oss中创建bucket时，用于组成路径
  // uploadType的值一般固定为attachment
  // type的值根据当前业务来指定名字
  uploadData.append('uploadType','attachment')
  uploadData.append('type','awp_repair')

  // 循环拿到每一个上传文件
  items.forEach(item=>{
    // 把文件添加到【单独上传图片的表单】的表单中
    // 参数名字files，和后端接口接收参数的名字一致
    uploadData.append('files',item.file as File)
    // 设置上传文件的status和message
    // 用户显示上传过程的效果（vant3）
    item.status = 'uploading'
    item.message = '上传中...'
  })

  // 上传图片
  fileUpload(uploadData).then((_respData:Array<any>)=>{

    // _respData：后端接口返回的数据是List<Rental>
    // 循环拿到每一个上传文件对象
    // 设置status和message属性，表示上传完成
    // 设置url设置，后面用于比对url是否相等进行删除
    for (let index = 0; index < items.length; index++) {
      items[index].status = 'done'
      items[index].message = '上传成功'
      items[index].url = _respData[index].url
    }

    // 整个 上报保修表单 中，添加本次接口后端的数据（解构）
    formData.faultImg?.push(..._respData)

  })
  .catch(err=>{
    items.forEach(item=>{
      item.status = 'failed'
      item.message = '上传失败'
    })
  })

}


// vant上传组件中，点击叉号删除图片
const beforeDelete = (args:any)=>{
  // args参数是当前要删除的图片对象
  // 对比要删除的图片的url（上面专门给url赋值了），和formData表单中的图片是否有相等的，有的话返回索引
  const index = formData.faultImg?.findIndex(obj=>obj.url === args.url) as number
  // 删除值的位置后的1个元素，包括指定位置
  formData.faultImg?.splice(index,1)

  // 返回false表示取消本次vant组件的删除操作
  return true
}


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
  textarea{
    height: 8rem;
    resize: none;
  }
  .preview-cover {
    position: absolute;
    bottom: 0;
    box-sizing: border-box;
    width: 100%;
    padding: 4px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    background: rgba(0, 0, 0, 0.3);
  }
</style>
