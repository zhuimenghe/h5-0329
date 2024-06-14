<template>
  <div class="flex flex-col products">
    <div class="products-show">
      <img :src="data.machineImg[0].url" v-if="data.machineImg" alt="">
    </div>
    <div class="products-args">
      <div class="products-args-header">
        <p class="p1">{{ data.machineType }}</p>
        <p class="p2">{{ data.machineName }}</p>
      </div>
      <hr class="hr1">
      <div class="products-args-middle">
        <img src="~@/assets/imgs/products/detail/zdgd.png">
        <p>最大平台高度: {{ data.maxPlatHeight }}</p>
      </div>
      <div class="products-args-middle">
        <img src="~@/assets/imgs/products/detail/zdsj.png">
        <p>最大水平伸距: {{ data.maxHorizontalExt }}</p>
      </div>
      <div class="products-args-middle">
        <img src="~@/assets/imgs/products/detail/edzh.png">
        <p>额定载荷: {{ data.ratedLoad }}</p>
      </div>
      <div class="products-args-middle">
        <img src="~@/assets/imgs/products/detail/zjzl.png">
        <p>整机重量: {{ data.machineWeight }}</p>
      </div>
      <hr class="hr2">
      <div class="products-args-footer">
        <p @click="manualDownload" class="products-args-footer-p1">产品手册下载</p> <img src="~@/assets/imgs/products/detail/download.png">
        <p @click="showVideo" class="products-args-footer-p2">视频</p> <img src="~@/assets/imgs/products/detail/video.png">
      </div>
    </div>
    <div class="products-info">
      <tabs :data="data"></tabs>
    </div>
    <sany-footer></sany-footer> 
  </div>
  <my-popup v-model:show="show"></my-popup>

  <router-link :to="{name:'buy-contact'}" class="item">
    <div class="machine-contact">
      <button>购车咨询</button>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import SanyFooter from '@/components/Footer.vue'
import Tabs from '@/views/Tabs.vue'
import { useRoute } from 'vue-router';

import { getProductByType } from "../apis/product";
import { Machine } from '@/assets/ts/Machine'
import { reactive, ref } from 'vue';
import MyPopup from '@/components/MyPopup.vue'
import { Dialog } from 'vant';

const data:Machine = reactive<Machine>({})


const router = useRoute()
const machineType:string = router.query.machineType as string

getProductByType(machineType).then(respData=>{
  if(respData){
      Object.assign(data,respData)
    }
})

let show = ref<boolean>(false)
// 删除手册下载
const manualDownload = ()=>{
  // show.value = true
  
  if(data.machineManual && data.machineManual[0] && data.machineManual[0].url){
    let url = data.machineManual[0].url;
    Dialog.confirm({
      title:"下载提示",
      message:"确认要下载当前设备手册？"
    }).then(()=>{
      handleDownload(url)
    }).catch(()=>{
      // cancel
    })
    
  }else{
    show.value = true
  }
}

/* 下载文件 */
const handleDownload = (url:string)=>{
  // console.log(file.url);
  handleGetBlob(url)
    .then(blob => {
      let _url = url.split('?')[0]
      let index = _url.lastIndexOf("/");
      let name = _url.substring(index+1, _url.length);
      handleSaveAs((blob) as Blob, name);
    })
    .catch(err => {
      console.error(err);
    });
}

/* 下载文件 辅助方法 */
const handleGetBlob = (url:string)=> {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response);
      }
    };
    xhr.send();
  });
}
/* 下载文件 辅助方法 */
const handleSaveAs = (blob:Blob, filename:string)=>{
  // console.log(window.navigator);
  
  // if (window.navigator.msSaveOrOpenBlob) {
  //   navigator.msSaveBlob(blob, filename);
  // } else {
  // }
    const link = document.createElement("a");
    const body = document.querySelector("body") as HTMLBodyElement;
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    // fix Firefox
    link.style.display = "none";
    body.appendChild(link);
    link.click();
    body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
}


// 展示视频
const showVideo = ()=>{
  show.value = true
}


</script>

<style scoped lang="scss">
  .products{
    background: #f5f4f9;
    
    div{
      margin-bottom: 1.36rem;
      background: white;
    }

    .products-show{
      width: 30rem;
      height: 20.92rem;

      img{
        width: 22rem;
        height: 19.88rem;
        margin-top: 0.36rem;
        margin-left: 3.88rem;
      }
    }

    .products-args{
      width: 30rem;
      // height: 23rem;
      display: flex;
      flex-direction: column;
      div{
        display: flex;
        margin-left: 0.96rem;
      }
      img{
        width: 1.2rem;
        height: 1.2rem;
        margin-right: 0.92rem;
      }
      hr{
        width: 30rem;
        height: 0.04rem;
        border: 0.04rem solid #E6E6E6;
      }
      .hr1{
        margin-top: 1rem;
        margin-bottom: 1rem;
      }

      .hr2{
        margin-top: 0rem;
        margin-bottom: 0rem;
      }

      &-header{
        margin-top: 1.16rem;
        margin-bottom: 0rem;
        .p1{
          width: 7.04rem;
          height: 2.24rem;
          font-size: 1.6rem;
          font-weight: 500;
          color: #181818;
          line-height: 2.24rem;
          margin-right: 1.28rem;
        }
        .p2{
          margin-left: 1.28rem;
          margin-top: 0.2rem;
          width: 6.76rem;
          height: 1.68rem;
          font-size: 1.2rem;
          font-weight: 500;
          color: #F08200;
          line-height: 1.68rem;
        }
      }

      &-middle{
        color: #8c8c8c;
        font-size: 1.12rem;
        font-weight: 400;
      }

      &-footer{
        margin-top: 1rem;
        p{
          height: 1.8rem;
          font-size: 1.28rem;
          font-weight: 400;
          color: #E60000;
          line-height: 1.8rem;
        }
        .products-args-footer-p1{
          margin-right: 0.64rem;
        }
        .products-args-footer-p2{
          margin-left: 1.64rem;
          margin-right: 0.64rem;
        }
        img{
          margin-top: 0.3rem;
          width: 1.72rem;
          height: 1.4rem;
        }
      }

    }

  }
  .machine-contact{
    margin: 1.2rem;
    button{
      width: 26.96rem;
      height: 2.56rem;
      background: #E60000;
      border-radius: 0.24rem;
      color: #ffffff;
      font-weight: 500;
      font-size: 1.12rem;
    }
  }
</style>