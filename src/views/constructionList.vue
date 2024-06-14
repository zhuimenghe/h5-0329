<template>
  <div class="constructionList">
    <div class="map">
      <div id="container"></div>
    </div>
    <div class="content_box">
      <p class="title">当前位置</p>
      <p style="color: #8c8c8c; margin-left: 20px">{{ address }}</p>
    </div>
    <div class="radio_box">
      <p class="title">围栏半径</p>
      <config-provider :theme-vars="themeVars">
        <radio-group
          v-model="checked"
          direction="horizontal"
          class="myRadio"
          @change="radioChange"
        >
          <radio name="100">100米</radio>
          <radio name="200">200米</radio>
          <radio name="500">500米</radio>
          <radio name="1000">1000米</radio>
        </radio-group>
      </config-provider>
    </div>
    <div class="subscribe">
      <p>设备列表({{ markerList.length }})</p>
      <button @click="subscribe()">全部订阅</button>
    </div>
    <div v-if="markerList.length > 0" class="list">
      <div
        class="list_card"
        v-for="(item, index) in markerList"
        :key="index"
        @click="goto(item)"
      >
        <div class="first">
          <div class="left">
            <p style="color: #181818; font-size: 15px; font-weight: 500">
              {{ item.licenseId }}
            </p>
            <p>
              <span style="margin-left: 0px">{{ item.machineName }}</span
              >| <span>{{ item.height }}</span
              >|
              <span>{{ item.machineType }}</span>
              <span v-if="item.driveType">| {{ item.driveType }}</span>
            </p>
          </div>
          <button
            :class="item.sub == '1' ? 'sub' : '_sub'"
            @click.stop="showDialog(item.sub, item.licenseId)"
          >
            {{ item.sub == "1" ? "订阅" : "取消订阅" }}
          </button>
        </div>
        <div class="second">
          <p>
            状态：<span
              :style="{
                color: item.machineStatus == 0 ? '#FE931F' : '#52C41A',
              }"
              >{{ item.machineStatus == 0 ? "离线" : "在线" }}</span
            ><span
              v-if="item.machineStatus != 0"
              :style="{
                color: item.machineStatus == 0 ? '#FE931F' : '#52C41A',
              }"
              >-{{ item.ecuStatus == 0 ? "断电中" : "运行中" }}</span
            >
          </p>
          <p>
            电量：<span style="color: #1278ff">{{ item.batteryPower }}%</span>
          </p>
          <p v-if="item.totalWorktime">
            电机总工时：{{ parseInt(item.totalWorktime).toFixed() }}h
          </p>
        </div>
        <div class="three">
          <p>最近回传时间：{{ item.lastLocationTime }}</p>
        </div>
      </div>
    </div>
    <div v-else class="none">附近暂无设备</div>

    <van-dialog
      v-model:show="show"
      show-cancel-button
      @cancel="cancel"
      @confirm="confirm"
      message="您要取消订阅当前设备么？ 取消后将无法获取设备预警信息！"
    >
      <div style="padding: 18px">
        订阅后将为您推送设备电量相关信息， 您确定订阅当前设备吗？
      </div>
      <div class="tip-box">
        <van-checkbox v-model="cancelFrame" shape="square" icon-size="15px">
          <span>下次订阅不显示当前提示</span>
        </van-checkbox>
      </div>
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  onMounted,
  reactive,
  ref,
  defineProps,
  shallowRef,
  watch,
  onBeforeMount,
} from "vue";
import { mapSearch, subBatch, reverseGeo } from "../apis/product";
import {
  RadioGroup,
  Radio,
  Button,
  ConfigProvider,
  Dialog,
  Checkbox as VanCheckbox,
  Notify,
} from "vant";
import AMapLoader from "@amap/amap-jsapi-loader";
import { useRoute, useRouter } from "vue-router";
import jiancha_1 from "../assets/imgs/1.png";
import jiancha_2 from "../assets/imgs/2.png";
import jiancha_3 from "../assets/imgs/3.png";
import qubi_1 from "../assets/imgs/4.png";
import qubi_2 from "../assets/imgs/5.png";
import qubi_3 from "../assets/imgs/6.png";
import zhibi_1 from "../assets/imgs/7.png";
import zhibi_2 from "../assets/imgs/8.png";
import zhibi_3 from "../assets/imgs/9.png";
const VanDialog = Dialog.Component;
// 取消订阅时候的确认弹框

const route = useRoute();
const router = useRouter();
let show = ref(false);

let my_licenseId = ref("");

let cancelFrame = ref(false);
// 附近设备数组
let markerList = ref([]);

let address = ref("");
// 当前设备
let centerMachine = ref({});

let checked = ref("100");

const themeVars = {
  radioCheckedIconColor: "#E60000",
};

let a_map: any = null;
// 地图
let map = shallowRef(null);

onBeforeMount(() => {
  initMap();
});

onMounted(() => {
  initMap().then(() => {
    getList(checked.value);
  });
});

// 获取附近设备
const getList = (scope: string) => {
  let params = {
    licenseId: route.query.licenseId,
    openId: localStorage.getItem("openId") as string,
    scope,
  };

  mapSearch(params).then((res) => {
    if (res.list.length > 0) {
      markerList.value = res.list;
      centerMachine.value = res.centerMachine;
      getAddress([centerMachine.value.longitude, centerMachine.value.latitude]);
      draw();
    }
  });
};
// 全部订阅
const subscribe = () => {
  let machineCodeList: any[] = [];
  markerList.value.forEach((e) => {
    if (e.sub == 1) {
      machineCodeList.push(e.licenseId);
    }
  });
  let params = {
    openId: localStorage.getItem("openId") as string,
    ops: 0, //0 订阅 1取消订阅
    machineCodeList,
  };
  subBatch(params).then((res) => {
    getList(checked.value);
    Notify({ type: "success", message: `订阅成功！` });
  });
};
const cancel = () => {
  // 防止用户在弹框中打钩，然后又点击了弹框中的取消
  cancelFrame.value = false;
};

const radioChange = (val: any) => {
  getList(val);
};

//
const showDialog = (type: number, licenseId) => {
  console.log(licenseId, "licenseId");
  my_licenseId.value = licenseId;

  if (cancelFrame.value) {
    sub(type, licenseId);
  } else if (type == 1) {
    show.value = true;
  } else {
    sub(type, licenseId);
  }
};

const confirm = () => {
  sub(1, my_licenseId.value);
};
// 订阅
const sub = (type: number, licenseId) => {
  console.log(licenseId, "licenseId");

  let params = {
    openId: localStorage.getItem("openId") as string,
    ops: type == 1 ? 0 : 1, //0 订阅 1取消订阅
    machineCodeList: [licenseId],
  };
  subBatch(params).then((res) => {
    if (type == 1) {
      Notify({ type: "success", message: `订阅成功！` });
    } else {
      Notify({ type: "success", message: `取消成功！` });
    }
    getList(checked.value);
  });
};
const goto = (item) => {
  console.log(item, "item");

  router.push({
    path: "/",
    query: { licenseId: item.licenseId, sub: item.sub == 1 ? false : true },
  });
};

// 初始化地图
const initMap = () => {
  return new Promise((resolve, rej) => {
    AMapLoader.load({
      key: "52b5cdf515a4c52bdea0125cf3046c36", // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ["AMap.ToolBar", "AMap.Driving"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap) => {
        a_map = AMap;
        map = new AMap.Map("container", {
          zoom: 13, //级别
          center: [116.397428, 39.90923], //中心点坐标
          viewMode: "2D", //使用3D视图
        });
        resolve();
      })
      .catch((e) => {
        rej();
      });
  });
};
// 获取地址
const getAddress = (lnglat: any[]) => {
  a_map.plugin("AMap.Geocoder", function () {
    var geocoder = new a_map.Geocoder({
      radius: 1000, //范围，默认：500
      extensions: "base",
    });
    console.log(geocoder, "geocoder");

    geocoder.getAddress(
      lnglat,
      function (
        status: string,
        result: { info: string; regeocode: { formattedAddress: string } }
      ) {
        console.log(status, result);

        if (status === "complete" && result.info === "OK") {
          address.value = result.regeocode.formattedAddress;
        }
      }
    );
  });
};
const drawMarker = (map: ShallowRef<null>, AMap) => {
  let list: any[] = [];
  let marker = new AMap.Marker({
    offset: new AMap.Pixel(-10, -14), // 图大小决定类似 tranformcss 一半
    title: centerMachine.value.machineName,
    position: [centerMachine.value.longitude, centerMachine.value.latitude], //位置
    icon: new AMap.Icon({
      image: pic(centerMachine.value) ? pic(centerMachine.value) : jiancha_1,
      size: new AMap.Size(20, 26.5),
      imageSize: new AMap.Size(20, 26.5), //图标大小
    }),
  });
  markerList.value.forEach((e: any) => {
    let marker = new AMap.Marker({
      position: new AMap.LngLat(e.longitude, e.latitude),
      icon: new AMap.Icon({
        image: pic(e),
        size: new AMap.Size(20, 26.5),
        imageSize: new AMap.Size(20, 26.5), //图标大小
      }),
      offset: new AMap.Pixel(-10, -10),
    });
    list.push(marker);
  });

  // 将创建的点标记添加到已有的地图实例：
  map.add([marker, ...list]);
};

const drawCircle = (radius) => {
  var circle = new a_map.Circle({
    center: new a_map.LngLat(
      centerMachine.value.longitude,
      centerMachine.value.latitude
    ), // 圆心位置
    radius, //半径
    strokeColor: "#F33", //线颜色
    strokeOpacity: 1, //线透明度
    strokeWeight: 1, //线粗细度
    fillColor: "#ee2200", //填充颜色
    fillOpacity: 0.35, //填充透明度
  });
  map.add([circle]);
};

const setCenter = (Zoom, centerPosition) => {
  //设置中心点
  var position = new a_map.LngLat(centerPosition[0], centerPosition[1]);
  map.setZoomAndCenter(Zoom, position);
};

const draw = () => {
  map.clearMap();

  let Zoom = 13;
  let radius = 100;
  switch (checked.value) {
    case "100":
      Zoom = 17;
      radius = 100;
      break;
    case "200":
      Zoom = 16;
      radius = 200;
      break;
    case "500":
      Zoom = 14;
      radius = 500;
      break;
    case "1000":
      Zoom = 13;
      radius = 1000;
      break;

    default:
      break;
  }
  setCenter(Zoom, [
    centerMachine.value.longitude,
    centerMachine.value.latitude,
  ]);
  //   画点
  drawMarker(map, a_map);

  // 画圆
  drawCircle(radius);
};
const pic = (e) => {
  let image = "";
  switch (e.machineName) {
    case "自行剪叉车":
      if (e.machineStatus == 1 && e.ecuStatus == 1) {
        //工作并且通电
        image = jiancha_1;
      } else if (e.machineStatus == 1 && e.ecuStatus == 0) {
        //工作并且断电电
        image = jiancha_2;
      } else {
        image = jiancha_3;
      }
      break;
    case "自行曲臂车":
      if (e.machineStatus == 1 && e.ecuStatus == 1) {
        //工作并且通电
        image = qubi_1;
      } else if (e.machineStatus == 1 && e.ecuStatus == 0) {
        //工作并且断电电
        image = qubi_2;
      } else {
        image = qubi_3;
      }
      break;
    case "自行直臂车":
      if (e.machineStatus == 1 && e.ecuStatus == 1) {
        //工作并且通电
        image = zhibi_1;
      } else if (e.machineStatus == 1 && e.ecuStatus == 0) {
        //工作并且断电电
        image = zhibi_2;
      } else {
        image = zhibi_3;
      }
      break;
    default:
      break;
  }

  return image;
};
</script>

<style scoped lang="scss">
.list {
  height: 108px;
  background: #ffffff;
  .list_card {
    padding: 10px;
    border-bottom: 1px solid #e6e6e6;
    .first {
      display: flex;
      justify-content: space-between;
      padding: 1px;
      .left {
        color: #8c8c8c;

        span {
          margin: 5px;
          font-size: 12px;
          font-weight: 400;
        }
      }
      .sub {
        height: 32px;
        background: #ffffff;
        border-radius: 4px;
        color: #e60000;
        font-weight: 400;
        padding: 5px 10px;
        border: 1px solid #e60000;
      }
      ._sub {
        height: 32px;
        background: #ffffff;
        border-radius: 4px;
        color: #fe931f;
        font-weight: 400;
        padding: 5px 10px;
        border: 1px solid #fe931f;
      }
    }
    .second {
      padding: 1px;
      display: grid;
      grid-template-columns: repeat(3, 33%);
      color: #8c8c8c;
    }
    .three {
      padding: 1px;
      display: grid;
      color: #8c8c8c;
    }
  }
}
.map {
  width: 100%;
  height: 3rpx !important;
}
.content_box {
  margin: 0 15px;
  border-bottom: 1px solid #e6e6e6;
}
.radio_box {
  height: 70px;
  margin: 0 15px;
}

.none {
  height: 50px;
  text-align: center;
  line-height: 50px;
}
.title {
  color: #181818;
  font-size: 14px;
  font-weight: 600;
  margin: 10px 0;
}
.myRadio {
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
}
.subscribe {
  background-color: #f5f4f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 8px;
  p {
    height: 21px;
    color: #181818;
    font-size: 15px;
    border-left: 5px solid #e60000;
    padding: 0 5px;
  }
  button {
    width: 79px;
    height: 32px;
    background: #e60000;
    border-radius: 3px;
    background: #e60000;
    color: white;
    font-weight: 400;
    margin: 10px 0;
    padding: 5px 10px;
  }
}

.search {
  width: 79px;
  height: 32px;
  background: #e60000;
  border-radius: 3px;
  background: #e60000;
  color: white;
  font-weight: 400;
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
#container {
  width: 100%;
  height: 232px !important;
}
</style>
