<template>
  <div class="page bg-gray-bg">
    <img src="~@/assets/imgs/main/banner.jpg" alt="" class="banner" />
    <div class="menus flex bg-white">
      <router-link :to="{ name: 'news' }" class="item">
        <img src="~@/assets/imgs/main/news.png" alt="" class="icon" />
        <span class="text text-gray-dark">企业资讯</span>
      </router-link>
      <router-link :to="{ name: 'products' }" class="item">
        <img src="~@/assets/imgs/main/product.png" alt="" class="icon" />
        <span class="text text-gray-dark">产品中心</span>
      </router-link>
      <router-link
        :to="{ name: 'rental-contact' }"
        class="item"
        @click="t_click"
      >
        <img src="~@/assets/imgs/main/contact.png" alt="" class="icon" />
        <span class="text text-gray-dark">租赁咨询</span>
      </router-link>
      <router-link
        :to="{ name: 'repair-contact' }"
        class="item"
        @click="t_click"
      >
        <img src="~@/assets/imgs/main/repair.png" alt="" class="icon" />
        <span class="text text-gray-dark">设备报修</span>
      </router-link>
      <router-link
        :to="{
          name: 'construction-list',
          query: { licenseId: !!licenseId ? licenseId : sn },
        }"
        class="item"
        @click="t_click"
      >
        <img src="~@/assets/imgs/shigong.png" alt="" class="icon" />
        <span class="text text-gray-dark">施工设备</span>
      </router-link>
      <router-link :to="{ name: 'sub-list' }" class="item" @click="t_click">
        <img src="~@/assets/imgs/dingyue.png" alt="" class="icon" />
        <span class="text text-gray-dark">订阅列表</span>
      </router-link>
    </div>
    <div class="detail p bg-gray-bg">
      <div class="shadow-lg rounded-lg bg-white overflow-hidden">
        <div class="header text-white">设备信息</div>
        <div class="pt-lg pb px top">
          <div class="flex items-center mb">
            <img
              :src="mechine.machineImg?.[0]?.url ?? ''"
              alt=""
              class="icon mr object-contain"
            />
            <view class="flex-1">
              <div class="sub-box">
                <div class="sub-box-machine font-bold text-2xl mb-xs">
                  {{ sn }}
                </div>
                <!-- 查询的sn有结果，当前已经获取到了用户的微信openId，此时才可以显示订阅按钮 -->
                <div class="sub-wrap" v-if="hasResult && openId">
                  <div @click="subYes" v-if="!sub" class="sub sub-yes">
                    订阅
                  </div>
                  <div @click="subNo" v-else class="sub sub-no">取消订阅</div>
                </div>
              </div>
              <div class="text-gray" v-if="hasResult">
                {{ mechine.machineName }}
                <span v-if="mechine.machineName">｜</span>
                {{ mechine.maxPlatHeight }}
                <span v-if="mechine.maxPlatHeight">｜</span>
                {{ mechine.machineType }}
              </div>
            </view>
          </div>
          <div class="flex justify-between">
            <div class="flex flex-col items-center">
              <!--              <span class=" text-xl font-bold">168h</span>-->
              <span class="text-xl font-bold"
                >{{ mechine.totalWorktime }}
              </span>
              <span class="text-gray mt-xs">总工作时长</span>
            </div>
            <div class="flex flex-col items-center">
              <!--              <span class=" text-xl font-bold">350kg</span>-->
              <span class="text-xl font-bold">{{ mechine.batteryPower }}</span>
              <span class="text-gray mt-xs"
                >{{
                  oilMachine.includes(mechine.machineType) ? "油量" : "电量"
                }}状态
              </span>
            </div>
            <div class="flex flex-col items-center">
              <!--              <span class=" text-xl font-bold">12m</span>-->
              <span class="text-xl font-bold">{{ mechine.lockLevel }}</span>
              <span class="text-gray mt-xs">锁车状态</span>
            </div>
            <div class="flex flex-col items-center">
              <!--              <span class=" text-xl font-bold text-success">正常</span>-->
              <span class="text-xl font-bold">{{ mechine.machineStatus }}</span>
              <span class="text-gray mt-xs">工作状态</span>
            </div>
          </div>
        </div>
        <div class="specs px-sm" v-if="hasResult">
          <template v-for="(v, i) in mechine.customData" :key="v.key">
            <div
              class="line"
              v-show="collapsed ? i < 14 : true"
              v-if="
                v.show &&
                !(
                  v.name === '车辆识别代码' &&
                  (mechine.machineType === 'SPT26AC-Li' ||
                    mechine.machineType === 'SPT26AC-G（Li）' ||
                    mechine.machineType === 'SPT26AC')
                )
              "
            >
              <span class="text-gray">{{ v.name }}</span>
              <span v-html="v.value"></span>
              <!--              <button v-if="v.name === '环保代码'" class="ep-code" :data-clipboard-text="v.value" @click="copy">点击复制</button>-->
            </div>
          </template>
        </div>
        <div
          v-if="hasResult"
          @click="collapsed = !collapsed"
          class="btn rounded my-lg mx-sm p-sm bg-gray-bg flex items-center justify-center text-primary text-lg"
        >
          {{ collapsed ? "展开" : "收起" }}
          <i
            class="iconfont text-2xl"
            :class="[collapsed ? 'icon-arrow-down' : 'icon-arrow-up']"
          ></i>
        </div>
      </div>
      <img
        src="~@/assets/imgs/main/gzh-banner.png"
        alt=""
        class="gongzhonghao rounded-lg mt block"
      />
    </div>
    <sany-footer></sany-footer>
  </div>
  <my-popup v-model:show="show"></my-popup>
  <my-overlay v-model:show="weixinShow"></my-overlay>
</template>
<script setup lang="ts">
import SanyFooter from "@/components/Footer.vue";
import { reactive, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getProductSpec } from "@/apis/product";
import { Machine } from "@/assets/ts/Machine";

import MyPopup from "@/components/MyPopup.vue";
import MyOverlay from "@/components/MyOverlay.vue";
import { Dialog } from "vant";
import { getWeixinOpenId } from "@/apis/weixin";
import { machineSubOps, machineSubJudge } from "@/apis/subscribe";
import Clipboard from "clipboard";

const mechine = reactive<Machine>({
  totalWorktime: "-",
  maxPlatHeight: "-",
  ratedLoad: "-",
  machineStatus: "-",
  batteryPower: "-",
  lockLevel: "-",
  showMsg: "",
});

let licenseId = ref("");

let oilMachine = ["SPT26", "SPT22"];

localStorage.setItem("oilMachine", oilMachine);

const route = useRoute();
const router = useRouter();
// 当前页面查询的机器号
// const sn = ref('SPS04CC04688');
let sn = ref(route.query.sn);
// 判断sn后端查询是否有结果
const hasResult = ref(false);
// 控制页面中的展开和收起
const collapsed = ref(true);
// 是否已经订阅了该设备
const sub = ref(false);
// popup是否显示
const show = ref<boolean>(false);
// overlay是否显示，里面是微信公众号的图片和订阅成功的提示
const weixinShow = ref<boolean>(false);

// 如果sn不为空
if (sn.value && typeof sn.value == "string") {
  getProductSpec(sn.value).then((respData) => {
    if (respData) {
      hasResult.value = true;
      Object.assign(mechine, respData);

      if (mechine.showMsg) {
        Dialog.alert({
          message: mechine.showMsg,
          theme: "round-button",
        });
      }

      if (mechine.totalWorktime && mechine.totalWorktime != "-") {
        mechine.totalWorktime = mechine.totalWorktime + "h";
      }

      if (mechine.batteryPower && mechine.batteryPower != "-") {
        mechine.batteryPower = mechine.batteryPower + "%";
      }

      if (mechine.lockLevel) {
        mechine.lockLevel = mechine.lockLevel === "0" ? "解锁" : "锁机";
      } else {
        mechine.lockLevel = "-";
      }

      if (mechine.machineStatus) {
        mechine.machineStatus =
          mechine.machineStatus === "0" ? "不工作" : "工作";
      } else {
        mechine.machineStatus = "-";
      }
    } else {
      Dialog.alert({
        message: `EVI工况数据中不存在该机号：【${sn.value}】`,
        theme: "round-button",
      });
    }
  });
}
onMounted(() => {
  if (route.query.licenseId) {
    licenseId.value = route.query.licenseId;
    sn.value = route.query.licenseId;

    machineSubJudge(openId.value, sn.value as string).then((res) => {
      console.log(res);

      sub.value = res;
    });

    getProductSpec(licenseId.value).then((respData) => {
      if (respData) {
        hasResult.value = true;

        Object.assign(mechine, respData);
        mechine.totalWorktime = mechine.totalWorktime + "h";
        mechine.machineStatus =
          mechine.machineStatus === "0" ? "不工作" : "工作";
        mechine.batteryPower = mechine.batteryPower + "%";
        mechine.lockLevel = mechine.lockLevel === "0" ? "解锁" : "锁机";
      } else {
        Dialog.alert({
          message: `EVI工况数据中不存在该机号：【${sn.value}】`,
          theme: "round-button",
        });
      }
    });
  }
});

// 点击租赁咨询和设备保养 暂时简单弹出个提示
const t_click = () => {
  show.value = true;
};
// 点击订阅
const subYes = () => {
  Dialog.confirm({
    title: "设备订阅",
    message: `确定要订阅设备【${sn.value}】？`,
  })
    .then(() => {
      // on confirm
      const formData = new FormData();
      formData.append("openId", openId.value);
      formData.append("machineCode", sn.value as string);
      // 0-订阅
      formData.append("ops", "0");
      machineSubOps(formData)
        .then((_respData) => {
          // 显示订阅成功图片
          weixinShow.value = true;
          // 切换按钮显示
          sub.value = !sub.value;
        })
        .catch((err) => {
          Dialog.alert({
            message: `取消订阅失败：【${err}】`,
            theme: "round-button",
          });
        });
    })
    .catch(() => {
      // on cancel
    });
};

// 点击取消订阅
const subNo = () => {
  Dialog.confirm({
    title: "取消订阅",
    message: `确定要取消【${sn.value}】订阅？`,
  })
    .then(() => {
      // on confirm
      const formData = new FormData();
      formData.append("openId", openId.value);
      formData.append("machineCode", sn.value as string);
      // 1-取消订阅
      formData.append("ops", "1");
      machineSubOps(formData)
        .then((_respData) => {
          Dialog.alert({
            message: `您已经取消订阅：【${sn.value}】`,
            theme: "round-button",
          });
          // 切换按钮显示
          sub.value = !sub.value;
        })
        .catch((err) => {
          Dialog.alert({
            message: `取消订阅失败：【${err}】`,
            theme: "round-button",
          });
        });
    })
    .catch(() => {
      // on cancel
    });
};

// 后端json中传回有button按钮以及点击事件的函数调用，为了函数调用，这里把函数挂到全局上
window.copy = () => {
  let clipboard = new Clipboard(".ep-code");
  clipboard.on("success", (e) => {
    Dialog.alert({
      message: `复制成功`,
      theme: "round-button",
    });
    // 释放内存
    clipboard.destroy();
  });
  clipboard.on("error", (e) => {
    // 不支持复制
    Dialog.alert({
      message: `该浏览器不支持自动复制`,
      theme: "round-button",
    });
    // 释放内存
    clipboard.destroy();
  });
};

// 获取当前url中的查询参数的对象
const getSearchParam = (windowLocationSearch: string) => {
  // 创建一个URLSearchParams实例
  const urlSearchParams = new URLSearchParams(windowLocationSearch);
  // 把键值对列表转换为一个对象
  const params = Object.fromEntries(urlSearchParams.entries());

  return params;
};

// ?sn=SPS10CC00338&code=061P4v0w3e2GIY29m92w3mN3b61P4v0A&state=123'
const code = getSearchParam(window.location.search).code;
console.log(code, "getSearchParam");

// const code = "SPS04CC04708";
if (!!code) {
  localStorage.setItem("licenseId", code);
}
const openId = ref("");
// openId.value = localStorage.getItem("openId") as string

if (code && !openId.value) {
  (async function () {
    // 先获取openId
    openId.value = await getWeixinOpenId(code);

    if (!openId.value) {
      openId.value = localStorage.getItem("openId") as string;
    }

    localStorage.setItem("openId", openId.value);
    // 如果openId和sn都不为空
    // 再查询下当前的订阅情况
    if (openId.value && sn.value) {
      // localStorage.setItem('openId',openId.value)
      sub.value = await machineSubJudge(openId.value, sn.value as string);
      console.log(sub.value);
    }
  })();
} else {
  (async function () {
    openId.value = localStorage.getItem("openId") as string;
    // 如果openId和sn都不为空
    // 再查询下当前的订阅情况
    if (openId.value && sn.value) {
      sub.value = await machineSubJudge(openId.value, sn.value as string);
      console.log(sub.value);
    }
  })();
}
</script>
<style lang="scss">
.page {
  min-height: 100vh;
}
.banner {
  width: 100%;
  height: 14.44rem;
}
.menus {
  display: grid;
  grid-template-columns: repeat(4, 25%);
  padding: 1rem;
  .item {
    @include flex(column, center);
    margin: 0.5rem 0.7rem;
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
    width: 4.64rem;
    height: 4.64rem;
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
.gongzhonghao {
  width: 28rem;
  margin-left: 0;
}

.sub-box {
  height: 2.9rem;
  display: flex;
  justify-content: space-between;
}

.sub-box-machine {
  line-height: 2.9rem;
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
