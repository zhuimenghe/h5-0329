<template>
  <div class="page bg-gray-bg">
    <img src="~@/assets/imgs/products/product.png" alt="" class="banner" />
    <div class="bg-white flex">
      <input v-model="queryParam" class="search-input" type="text" placeholder="机号、型号" >
      <button @click="searchProducts" class="search-btn">搜索</button>
    </div>
    <div class="flex flex-wrap">
      <div class="product" v-for="(item,index) in data" :key="index" v-show="collapsed?index<2:true">
        <router-link :to="{name:'productsDetail',query:{machineType:item.machineType}}">
          <div class="product-top">
              <div class="product-top-img"><img :src="item.machineImg[0].url" v-if="item.machineImg" alt=""></div>
            <p class="product-top-type">{{ item.machineType }}</p>
            <p class="product-top-name">{{ item.machineName }}</p>
          </div>
        </router-link>
        <hr>
        <div class="product-bottom">
          <p>最大平台高度：{{ item.maxPlatHeight }}</p>
          <p>最大水平延伸：{{ item.maxHorizontalExt }}</p>
          <p>额定载荷：{{ item.ratedLoad }}</p>
        </div>
      </div>

      <div v-if="hasResult" @click="collapsed=!collapsed" class="more btn rounded my-lg mx-sm p-sm bg-gray-bg flex items-center justify-center text-primary text-lg">
        {{collapsed?'展开':'收起'}}
        <i class="iconfont text-xs" :class="[collapsed?'icon-arrow-down':'icon-arrow-up']"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref,reactive,} from "vue";
import {getProductList} from '@/apis/product'
import { Machine } from '@/assets/ts/Machine'
import { Dialog } from "vant";


const collapsed = ref(false)
const hasResult = ref(false)


const data:Machine[] = reactive<Machine[]>([])

let queryParam = ref<string>('')
const searchProducts = ()=>{
  getProductList(queryParam.value).then(respData=>{
    hasResult.value = false
    if(respData && respData.length!=0){
      // console.log(respData);
      hasResult.value = true
      collapsed.value = true;
      data.length = 0;
      Object.assign(data,respData)
    }else{
      data.length = 0;
      Dialog.alert({message:`抱歉！没有找到相关车辆信息：【${queryParam.value}】`})
    }
  });
}

searchProducts()


</script>

<style scoped lang="scss">
  .p-title{
    font-size: 1.28rem;
    font-weight: 500;
    color: #181818;
    line-height: 1.8rem;
  }

  .bg-white{
    @include hairline-surround-radius(0.32rem);
  }
  .search-input{
    width: 23.04rem;
    height: 2.56rem;
    margin: 1.12rem 0rem 1.12rem 0.96rem;
    background: #ffffff;
    border-radius: 0.32rem;
    border: 0.04rem solid #CECECE;

    padding: 0.44rem 0rem 0.44rem 1.12rem;
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 1.68rem;
    color: #8c8c8c;
  }
  .search-btn{
    width: 4.08rem;
    height: 2.56rem;
    border-radius: 0.32rem;
    background: #E60000;
    color: white;
    font-size: 1.2rem;
    font-weight: 400;
    margin: 1.12rem 0.96rem 1.12rem 1rem;
  }

  .product{
    width: 13.52rem;
    height: 18.58rem;
    border: 1px solid #E6E6E6;
    background: #fff;
    margin-left: 0.96rem;
    margin-top: 0.96rem;

    div {
      display: flex;
      flex-direction: column;
    }
    hr{
      width: 11.48rem;
      height: 0.04rem;
      color: #E6E6E6;
      margin-left: 1.12rem;
      margin-top: 0.44rem;
      margin-bottom: 1.16rem;

    }
  }
  .product-top{
    text-align: center;
    .product-top-img{
      // width: 8.44rem;
      height: 7.64rem;
      //margin-top: 0.44rem;
      margin: 0.2rem auto 0.44rem;
      img{
        // width: 4.64rem;
        height: 100%;
      }
    }
    .product-top-type{
      margin: 0 auto;
      // width: 6.32rem;
      height: 2rem;
      font-size: 1.44rem;
      font-weight: 500;
      color: #222222;
      line-height: 2rem;
    }
    .product-top-name{
      width: 5.4rem;
      height: 1.32rem;
      font-size: 0.96rem;
      font-weight: 400;
      color: #F08200;
      line-height: 1.32rem;
      margin: 0 auto;
    }
  }

  .product-bottom{
    margin-left: 1.12rem;
    margin-top: -0.32rem;
    p{
      height: 1.12rem;
      font-size: 0.8rem;
      font-weight: 400;
      color: #8C8C8C;
      line-height: 1.12rem;
      margin-bottom: 0.64rem;
    }
  }

  .more{
    width: 100%;
  }


</style>