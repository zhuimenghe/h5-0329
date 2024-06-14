<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router'
import { useStore } from 'vuex'
import bannerUrl from '@/assets/imgs/share/banner.jpg'
import Tel from '@/components/TelLine.vue'

const licenseId = useRouteQuery('licenseId','').value
const schema = useRouteQuery('schema','').value

const store = useStore()
store.dispatch('share/init',{licenseId,schema})

const d = computed<ShareMachine>(() => store.state.share.device)

const icon = computed(()=>{
  let deviceIcons = {
    '3': 'icon-zl--zhibiche',
    '4': 'icon-zl--jianchache1',
    '2': 'icon-zl--jianchache',
    '1': 'icon-zl--jianchache1'
  }
  return deviceIcons[d.value.machineTypeId!]
})
const showLow = computed(_=>Number(d.value.lowPowerDays)>0)
const showClose = computed(_=>Number(d.value.closeDays)>=30)
const showOff = computed(_=>Number(d.value.offLineDays)>=30)

</script>

<template>
  <div class="page bg-gray-bg">
    <img :src="d.picList?.length ? d.picList[0] : bannerUrl" alt="" class="banner" />
    <div class="menus flex bg-white justify-around">
      <router-link
        :to="{ name: 'shareWorkin' }"
        class="item"
      >
        <img src="~@/assets/imgs/main/contact.png" alt="" class="icon" />
        <span class="text text-gray-dark">租赁咨询</span>
      </router-link>
      <router-link :to="{ name: 'shareWorkout' }" class="item">
        <img src="~@/assets/imgs/main/product.png" alt="" class="icon" />
        <span class="text text-gray-dark">退车申请</span>
      </router-link>
      <router-link :to="{ name: 'shareRepair' }" class="item">
        <img src="~@/assets/imgs/main/repair.png" alt="" class="icon" />
        <span class="text text-gray-dark">设备报修</span>
      </router-link>
    </div>
    <tel :tel="d.contactphone"></tel>
    <div class="detail p bg-gray-bg">
      <div class="shadow-lg rounded-lg bg-white overflow-hidden">
        <div class="header text-white">设备信息</div>
        <div class="pt-lg pb px top">
          <div class="flex items-center mb">
            <i class="iconfont text-primary text-5xl p-2 border border-gray-100 rounded-xl" :class="[icon]"></i>
            <view class="flex-1 ml-2">
              <div class="flex items-center ">
                <div class="font-bold text-2xl mb-xs">
                  {{d.printcode}}
                </div>
                <span class="bg-primary/20 ml-2 text-primary h-5 px-3 rounded-full flex items-center leading-none">{{d.licenseId}}</span>
                <!-- 查询的sn有结果，当前已经获取到了用户的微信openId，此时才可以显示订阅按钮 -->
              </div>
              <div class="text-gray">
                {{d.machineTypeDesc}}
                <span>｜</span>
                {{d.machineHeightDesc}}
                <span>｜</span>
                {{d.machineTypeName}}
                <span>｜</span>
                {{d.machineBrand}}
              </div>
            </view>
          </div>
        </div>
        <div class="specs py-3 px-3" v-if="showLow||showClose||showOff">
          <div class="text-xl font-bold">异常项</div>
          <div class="flex mt-2">
            <span class="bg-primary rounded text-white text-lg px-2 mr-3" v-if="showLow">低电量{{d.lowPowerDays}}天</span>
            <span class="bg-primary rounded text-white text-lg px-2 mr-3" v-if="showClose">关机{{d.closeDays}}天</span>
            <span class="bg-primary rounded text-white text-lg px-2 mr-3" v-if="showOff">离线超{{d.offLineDays}}天</span>
          </div>
        </div>
        <div class="specs px-sm">
          <div class="line">
            <span class="text-gray">当前电量</span>
            <span class="text-warning" v-if="d.batteryPower">{{d.batteryPower}}%</span>
            <span v-else>-</span>
          </div>
          <div class="line">
            <span class="text-gray">关机时长</span>
            <span class="text-warning" v-if="d.closeDays">{{d.closeDays}}天</span>
            <span v-else>-</span>
          </div>
          <div class="line">
            <span class="text-gray">最近关机日期</span>
            <span >{{ d.closeDate || '-' }}</span>
          </div>
          <div class="line">
            <span class="text-gray">定位时间</span>
            <span >{{d.locateDate || '-'}}</span>
          </div>
        </div>
      </div>
      <img
        src="~@/assets/imgs/share/gzh.jpg"
        alt=""
        class="w-full rounded-lg mt block"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.page {
  min-height: 100vh;
}
.banner {
  width: 100%;
  height: 8.44rem;
}
.menus {
  .item {
    @include flex(column, center);
    margin: 0.5rem 0.7rem;
    padding-bottom:0.5rem;
  }
  .icon {
    width: 5.2rem;
    height: 5.2rem;
  }
  .text {
    margin-top: -0.5rem;
  }
}
.detail {
  .header {
    height: 2.88rem;
    background: linear-gradient(360deg, #ff4c4c 0%, #ffb351 100%);
    @include flex(row, center, center);
  }
  .icon {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 0.32rem;
    overflow: hidden;
    // @include hairline-surround-radius(0.32rem,#e9e9e9);
  }
  .specs {
    @include hairline-top(#e6e6e6, dashed);
    .line {
      @include flex(row, center, space-between);
      height: 3.16rem;
      @include hairline-bottom(#e6e6e6);
    }
  }
}

.sub-box {
  height: 2.9rem;
  display: flex;
  justify-content: space-between;
}


.sub {
  color: #e60000;
  text-align: center;
  font-weight: 600;
}
.sub-yes {
  width: 4rem;
  border: 0.04rem solid #e60000;
  border-radius: 0.12rem;
}
.ep-code {
  color: red;
}
.sub-wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>