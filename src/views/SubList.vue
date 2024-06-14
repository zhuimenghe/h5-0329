<template>
  <div class="page bg-gray-bg">
    <img src="~@/assets/imgs/main/banner.jpg" alt="" class="banner" />
    <div class="header bg-white flex">
      <form class="form-line"></form>
      <p>订阅列表</p>
    </div>
    <div class="boxing">
      <van-list
        v-if="showVanList"
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        offset="100"
        @load="onLoad"
        ref="vanListObj"
      >
        <!-- <transition-group name="list" tag="p"> -->
        <transition-group
          enter-active-class="animate__animated animate__jackInTheBox"
          leave-active-class="animate__animated animate__zoomOutDown"
        >
          <div
            class="sub-info"
            v-for="(item, index) in list"
            :key="item.id"
            @click="goto(item)"
          >
            <div class="sub-info-r r1">
              <p>{{ item.machineCode }}</p>
            </div>
            <div class="sub-info-r r2">
              <p>{{ item.machineName }}</p>
              <p style="margin: 0 0.3rem">|</p>
              <p>{{ item.maxPlatHeight }}</p>
              <p style="margin: 0 0.3rem">|</p>
              <p>{{ item.machineType }}</p>
            </div>
            <div class="sub-info-r r3">
              <div>
                <p>状态:&nbsp;&nbsp;</p>
                <p style="color: #e60000" v-if="item.machineStatus == '0'">
                  离线
                </p>
                <p style="color: #25c41a" v-else-if="item.machineStatus == '1'">
                  在线
                </p>
                <p style="color: #25c41a" v-else>未知</p>
              </div>
              <div>
                <p>
                  {{
                    oilMachine.includes(item.machineType) ? "油量" : "电量"
                  }}:&nbsp;&nbsp;
                </p>
                <p style="color: #1278ff" v-if="item.batteryPower">
                  {{ item.batteryPower + "%" }}
                </p>
                <p style="color: #1278ff" v-else>-</p>
              </div>
              <div>
                <p>电机总工时:&nbsp;&nbsp;</p>
                <p style="color: #668cff" v-if="item.totalWorktime">
                  {{ item.totalWorktime + "h" }}
                </p>
                <p style="color: #668cff" v-else>-</p>
              </div>
              <!-- <div>
                <p>低电量预警次数:&nbsp;&nbsp;</p>
                <p style="color: #E60000;">16次</p>
              </div> -->
            </div>
            <div class="sub-info-r r4">
              <p>最近回传时间:&nbsp;&nbsp;</p>
              <p>{{ item.lastUploadTime }}</p>
            </div>
            <div class="sub-btns">
              <div @click.stop="subYes(item)" v-if="false" class="sub sub-yes">
                订阅
              </div>
              <div @click.stop="subNo(item)" v-else class="sub sub-no">
                取消订阅
              </div>
            </div>
          </div>
        </transition-group>
      </van-list>
    </div>
    <div>
      <van-dialog
        v-model:show="show"
        show-cancel-button
        @cancel="cancel"
        @confirm="confirm"
        title="取消订阅"
        message="您要取消订阅当前设备么？ 取消后将无法获取设备预警信息！"
      >
        <div style="padding: 1rem">
          您要取消订阅当前设备么？ 取消后将无法获取设备预警信息！
        </div>
        <div class="tip-box">
          <van-checkbox v-model="cancelFrame" shape="square" icon-size="15px">
            <span>下次取消订阅不显示当前提示</span>
          </van-checkbox>
        </div>
      </van-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onBeforeMount } from "vue";
import { List as VanList, Notify, Dialog, Checkbox as VanCheckbox } from "vant";
import { machineSubOps, findMachineSubInfoToMobile } from "@/apis/subscribe";
import { useRoute, useRouter } from "vue-router";
import { getWeixinOpenId } from "@/apis/weixin";
import { SubInfo } from "@/assets/ts/SubInfo";
import "animate.css";
const VanDialog = Dialog.Component;

const route = useRoute();
const router = useRouter();
const code = ref(route.query.code);

let oilMachine = localStorage.getItem("oilMachine").split(",");

const openId = ref<string>("");
// 偏移量
const offset = ref<number>(0);
// 获取后面的10条
const limit = 10;
// 是否要显示vanList组件
const showVanList = ref<boolean>(false);
// openId.value = localStorage.getItem("openId") as string
// 如果code不为空，openId为空的话，就调接口，用code换openId
if (code.value && !openId.value) {
  (async function () {
    // 获取openId
    openId.value = await getWeixinOpenId(code.value as string);
    if (!openId.value) {
      openId.value = localStorage.getItem("openId") as string;
    }

    localStorage.setItem("openId", openId.value);

    // 如果openId有值，那么在显示出vanList
    if (openId.value) {
      showVanList.value = true;
    }
  })();
} else {
  openId.value = localStorage.getItem("openId") as string;
  if (openId.value) {
    showVanList.value = true;
  }
}

// 列表中的数据
const list = reactive<Array<SubInfo>>([]);

// VanList组件所需控制变量
const loading = ref(false);
const finished = ref(false);

// 取消订阅时候的确认弹框
const show = ref(false);

// list列表中加载数据
const onLoad = () => {
  if (finished.value || !openId.value) {
    finished.value = true;
    return;
  }

  // 异步更新数据
  findMachineSubInfoToMobile(openId.value, offset.value, limit)
    .then((_respData) => {
      console.log(_respData);
      if (_respData.length > 0) {
        list.push(..._respData);
        offset.value = _respData.length;
        // 加载状态结束
        loading.value = false;
      } else {
        finished.value = true;
      }
    })
    .catch((err) => {});

  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  // setTimeout(() => {
  //   for (let i = 0; i < 5; i++) {
  //     list.push({
  //       id:list.length+1+'',
  //       sub:false,
  //       height:list.length+1+'m',
  //       machineCode:"SPS10CC0033"+(list.length+1)
  //     });
  //   }

  //   // 加载状态结束
  //   loading.value = false;

  //   // 数据全部加载完成
  //   if (list.length >= 50) {
  //     finished.value = true;
  //   }

  // }, 1000);
};
const goto = (item) => {
  console.log(item, "item");

  router.push({
    path: "/",
    query: { licenseId: item.machineCode, sub: item.sub == 1 ? false : true },
  });
};
// 订阅
const subYes = (item: SubInfo) => {
  // item.sub = !item.sub
};

// 临时变量，局部变量item赋值给全局变量bar，以便其他地方使用
let bar: SubInfo = {};
// 是否取消 取消订阅时的 确认弹框， true表示取消
let cancelFrame = ref(false);
// 是否正在执行取消订阅的操作
let subNoing = false;
// 获取当前vanList的对象引用
const vanListObj = ref();

// 取消订阅
const subNo = (item: SubInfo) => {
  if (subNoing) {
    Dialog.alert({ message: `请稍等后操作`, theme: "round-button" });
    return;
  }
  // 设置为true，避免此时用户在点击其他取消订阅操作
  // 取消订阅异步交互成功或失败后，再设置为false
  subNoing = true;

  show.value = !cancelFrame.value;
  // 如果没有弹出确认框的，那么就直接删除
  if (cancelFrame.value) {
    // removeItem(item)
    // Notify({ type: 'success', message: `设备【${item.machineCode}】取消订阅成功` });
    machineCancelSub(item);
  } else {
    // 说明弹出了确认框，把item传出去，让confirm方法使用
    bar = item;
  }
};

// 根据对象找出它在数组中的下标
const indexOf = (item: SubInfo) => {
  for (let index = 0; index < list.length; index++) {
    const element = list[index];
    if (item.id == element.id) {
      return index;
    }
  }
  return -1;
};
// 移除数组的元素
const removeItem = (item: SubInfo) => {
  var index = indexOf(item);
  list.splice(index, 1);
  // 删除一个后，检查滚动条离底部的距离，如果小于offset，那么就触发load函数
  // 防止用户没有使用滚动条，在那一直取消订阅的行为
  // 先判断下数据是否已经加载完成,如果没有完成，那么就可以调用check方法
  if (!finished.value) {
    vanListObj.value.check();
  }
};

// 取消订阅时候 点击确定
const confirm = () => {
  machineCancelSub(bar);
};
// 取消订阅时候 点击取消
const cancel = () => {
  // 防止用户在弹框中打钩，然后又点击了弹框中的取消
  cancelFrame.value = false;
  subNoing = false;
};

// 取消订阅对接后端接口
const machineCancelSub = (item: SubInfo) => {
  const formData = new FormData();
  formData.append("openId", openId.value);
  formData.append("machineCode", item.machineCode as string);
  // 1-取消订阅
  formData.append("ops", "1");
  machineSubOps(formData)
    .then((_respData) => {
      removeItem(item);
      Notify({
        type: "success",
        message: `设备【${item.machineCode}】取消订阅成功！`,
      });
      subNoing = false;
      bar = {};
    })
    .catch((err) => {
      Notify({
        type: "warning",
        message: `设备【${item.machineCode}】取消订阅失败！`,
      });
      subNoing = false;
      bar = {};
    });
};
</script>

<style scoped lang="scss">
.p-title {
  font-size: 1.28rem;
  font-weight: 500;
  color: #181818;
  line-height: 1.8rem;
}

.bg-white {
  @include hairline-surround-radius(0.32rem);
}

.header {
  height: 3.3rem;
  line-height: 3.3rem;
  background-color: #f5f4f9;
  font-size: 1.2rem;
  color: #181818;
  font-weight: 600;
}
.form-line {
  width: 0.4rem;
  height: 1.4rem;
  background-color: #e60000;
  margin-top: 0.95rem;
  margin-right: 0.5rem;
}

.sub-info {
  position: relative;
  height: 8.58rem;
  border: 1px solid #e6e6e6;
  background: #fff;
  margin-bottom: 0.66rem;
}

.sub {
  color: #e60000;
  height: 2.84rem;
  font-weight: 600;
  border-radius: 0.5rem;
  border: 0.04rem solid #e60000;
  padding: 0.5rem;
}
.sub-btns {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}

.sub-info-r {
  display: flex;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 0.5rem;
  color: #8c8c8c;
  font-weight: 400;
  font-size: 0.96rem;
}

.r1 {
  color: #181818;
  font-size: 1.2rem;
  font-weight: 500;
}

.r3 {
  justify-content: space-between;
  div {
    display: flex;
  }
}

.tip-box {
  display: flex;
  justify-content: center;
  font-size: 1rem;
  margin-bottom: 1rem;
  span {
    color: #f08200;
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
