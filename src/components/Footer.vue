<template>
  <div class="footer bg-white">
    <div class="px py-sm hairline-b">
      <img src="~@/assets/imgs/logo-h.png" alt="" class="logo">
    </div>
    <div class=" px">
      <div class="py-sm">
        <span class="text-lg font-bold">联系我们</span>
      </div>
      <div class="pl">
        <div @click="telephoneClick('4008878318')" class="text-gray mb">
          <i class="iconfont icon-telephone mr-xs"></i>服务电话：<span>4008 87 8318 - 6</span>
        </div>
        <div @click="telephoneClick('4008879318')" class="text-gray mb"><i class="iconfont icon-shoujihao mr-xs"></i>投诉电话：4008 87 9318</div>
        <div class="text-gray mb"><i class="iconfont icon-zl--zuobiao mr-xs"></i>公司地址：浙江省湖州市吴兴区高新区工业路18号-688</div>
      </div>
    </div>
  </div>
  <div class="copyright">
    <p>Copyright@2022 三一高空机械装备有限公司</p>
  </div>
</template>

<script setup lang="ts">
import { Dialog } from "vant";
const telephoneClick = (telephone:string)=>{
  Dialog.confirm({
    title: '提示',
    message:`确定拨打电话：${telephone} 吗？`
  }).then(()=>{
    // on confirm
    const a = document.createElement("a");
    a.href = "tel:"+ telephone
    a.click();
  }).catch(()=>{
    // on cancel
  })
}
</script>

<style scoped lang="scss">
  .logo{
    width:6.38rem;
    height:1.72rem;
  }

  .footer{
    height: 13.33rem
  }

  .copyright{
    height: 2.12rem;
    font-size: 0.8rem;
    font-weight: 400;
    font-family: PingFangSC-Regular, PingFang SC;
    color: #8C8C8C;
    line-height: 2.12rem;
    text-align: center;
  }
</style>