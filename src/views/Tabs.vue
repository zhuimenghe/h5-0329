<template>
  <div>
    <tabs v-model:active="active" @click-tab="clickTab" type="card" line-width="100px" animated>
      <tab title="产品介绍">
        <div class="introduce tab-div" v-html="data.machineDesc">
        </div>
      </tab>
      <tab title="产品参数">
        <div class="args tab-div">
          <table>
            <thead>
              <tr>
                <td>型号</td>
                <td>{{ data.machineType}}</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>类型</td>
                <td>{{data.machineName}}</td>
              </tr>
              <tr>
                <td>最大工作高度</td>
                <td>{{data.maxPlatHeight}}</td>
              </tr>
              <tr>
                <td>最大水平伸距</td>
                <td>{{data.maxHorizontalExt}}</td>
              </tr>
              <tr>
                <td>额定载荷</td>
                <td>{{data.ratedLoad}}</td>
              </tr>
              <tr>
                <td>整机重量</td>
                <td>{{data.machineWeight}}</td>
              </tr>
              <template v-for="(item,i) in data.customData" :key="item.key">
                <tr v-show="!collapsed" v-if="item.show">
                  <td>{{item.name}}</td>
                  <td>{{item.value}}</td>
                </tr>
              </template>
              <!-- <tr v-for="(item,i) in data.customData" :key="item.key" v-show="!collapsed">
                <td>{{item.name}}</td>
                <td>{{item.value}}</td>
              </tr> -->
               <tr>
                 <td colspan="2" style="padding: 4px;">
                  <div @click="collapsed=!collapsed" class="more btn rounded my-lg mx-sm p-sm bg-gray-bg flex items-center justify-center text-primary text-lg">
                    {{collapsed?'展开':'收起'}}
                    <i class="iconfont text-2xl" :class="[collapsed?'icon-arrow-down':'icon-arrow-up']"></i>
                  </div>
                 </td>
              </tr>
             
            </tbody>
          </table>
        </div>
      </tab>
      <tab title="相关产品">
        <div class="other tab-div">
          <i @click="left" class="left iconfont icon-arrow-right"></i>
          <i @click="right" class="right iconfont icon-arrow-right"></i>
          <Swipe ref="swipeRef" :autoplay="5000" :show-indicators="false">
            <SwipeItem v-for="item in otherList" :key="item.id">
              <div class="other-product">
                <div class="other-product-img">
                  <img :src="item.machineImg[0].url" v-if="item.machineImg">
                  <!-- <img src="http://test-h5-awp-sany.oss-cn-beijing.aliyuncs.com/attachment/awp_repair/46fa868e-23ef-45f4-9610-ee5840c254a1.png?Expires=3231372627&OSSAccessKeyId=LTAI5tD3VwhDGdKLEvp1thh7&Signature=g19YcXQPEhO00wPw%2FMKbVEnz3C0%3D"> -->
                </div>
                <div class="other-product-name">{{item.machineType}}</div>
                <hr class="other-product-hr">
                <div class="other-product-args flex flex-wrap">
                  <p>最大平台高度：{{item.maxPlatHeight}}</p>
                  <p>最大水平伸距：{{item.maxHorizontalExt}}</p>
                  <p>额定载荷：{{item.ratedLoad}}</p>
                  <p>整机重量：{{item.machineWeight}}</p>
                </div>
              </div>
            </SwipeItem>
          </Swipe>
        </div>
      </tab>
    </tabs>
  </div>
</template>

<script setup lang="ts">
import { Machine } from '@/assets/ts/Machine'
import { Tab,Tabs,Swipe,SwipeItem, Dialog } from "vant";
import type { SwipeInstance } from "vant";
import { reactive, ref } from "vue";
import {getOtherProductListByType} from '@/apis/product'

let active = ref(0)

// 其他相关产品列表
const otherList:Machine[] = reactive<Machine[]>([])
// 点击tab标签页时触发
const clickTab = (event:any)=>{
  //如果是相关产品tab
  if(event.name == 2){
    // 如果otherList没有值
    if(otherList.length==0){
      // console.log(props.data.machineType);
      getOtherProductListByType(props.data.machineType as string).then(respData=>{
        Object.assign(otherList,respData)
      }).catch(err=>{
         Dialog.alert({message:`数据获取失败！${err.data.msg}`})
      })
    }
  }
  
}

// 获取swiper实例
const swipeRef = ref<SwipeInstance>()

const left = ()=>{
  swipeRef.value?.prev()
}

const right = ()=>{
  swipeRef.value?.next()
}



type Props = {
  data:Machine
}

// 子组件获取父组件的传值
const props = defineProps<Props>()

const collapsed = ref(true)


</script>

<style scoped lang="scss">
  ::v-deep(.van-tabs__nav){
    margin-left: 0px;
    margin-right: 0px;
  }

  .tab-div{
    // height: 31.24rem;
    padding: 1rem;
  }
  .introduce, .other{
    height: 25.77rem;
    
  }
  .introduce{
    overflow: auto;
  }

  /*这里可以修改富文本中的样式*/
  ::v-deep(.introduce a){
    text-decoration: underline;
  }

  .args table{
    width: 28.08rem;
    height: 20.4rem;
    background: #FFFFFF;
    border: 1px solid #E6E6E6;
    color: #8C8C8C;

    thead td{
      background: #F5F5F5;
      font-size: 1.28rem;
      font-weight: bold;
      padding-left: 0.76rem;
      width: 13rem;
      height: 3.36rem;
      border: 1px solid #E6E6E6;
      text-align: center;
    }

    tbody td{
      font-size: 1.12rem;
      font-weight: 400;
      padding-left: 0.76rem;
      height: 3.36rem;
      border: 1px solid #E6E6E6;
    }

  }


  .other{
    position: relative;
    .iconfont{
      height:2.24rem;
      width:2.24rem;
      @include flex(row,center,center);
      background-color: #e6e6e6;
      border-radius: 100%;
      color:#fff;
      font-size: 2rem;
      font-weight: bold;
    } 
    .left{
      transform: rotate(180deg);
      position: absolute;
      left: 30px;
      top: 140px;
      z-index: 1;
    }
    .right{
      position: absolute;
      right: 30px;
      top: 140px;
      z-index: 1;
    }
  }

  .other-product{
    margin: 0 auto;
    width: 27rem;
    height: 23rem;
    background: #FFFFFF;
    box-shadow: 0rem 0rem 0.32rem 0rem rgba(0,0,0,0.29);
    border-radius: 0.64rem;
    margin-bottom: 1rem;
  }

  .other-product-img{
    width: 15.12rem;
    height: 13.64rem;
    margin-top: 1.2rem;
    margin-left: 6.5rem;
    img{
      width: 15.12rem;
      height: 13.64rem;
    }
  }
  .other-product-name{
    font-size: 1.44rem;
    font-weight: 500;
    color: #222222;
    text-align: center;
    line-height: 2rem;
    margin-top: 0.6rem;
    margin-bottom: 0.6rem;
  }

  .other-product-hr{
    height: 0.04rem;
    border: 1px solid #E6E6E6;
  }

  .other-product-args{
    font-size: 0.96rem;
    font-weight: 400;
    color: #222222;
    line-height: 1.32rem;
    text-align: left;
    p{
      width: 13.5rem;
      height: 1.32rem;
      padding-left: 1.56rem;
      margin-top: 0.96rem;
    }
  }

  .more{
    margin: 0;
  }

  // ::v-deep(.van-swipe-item){
  //   color: #000;
  //   font-size: 20px;
  //   line-height: 150;
  //   text-align: center;
  //   // background-color: #39a9ed;
  // }

</style>