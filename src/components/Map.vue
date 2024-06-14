<template>
  <div class="map">
    <div id="container"></div>
  </div>
</template>

<script setup lang="ts">
import AMapLoader from "@amap/amap-jsapi-loader";
import {
  onBeforeMount,
  shallowRef,
  onUpdated,
  ref,
  ShallowRef,
  watch,
  onUnmounted,
  onMounted,
  defineExpose,
} from "vue";

import jiancha_1 from "../assets/imgs/1.png";
import jiancha_2 from "../assets/imgs/2.png";
import jiancha_3 from "../assets/imgs/3.png";
import qubi_1 from "../assets/imgs/4.png";
import qubi_2 from "../assets/imgs/5.png";
import qubi_3 from "../assets/imgs/6.png";
import zhibi_1 from "../assets/imgs/7.png";
import zhibi_2 from "../assets/imgs/8.png";
import zhibi_3 from "../assets/imgs/9.png";

let a_map: any = null;
// 地图
let map = shallowRef(null);

const props = defineProps({
  markerList: Array,
  centerMachine: Object,
  checked: String,
});


onBeforeMount(() => {
  initMap();
  console.log(props.centerMachine, "checked");
});
onMounted(() => {});
onUpdated(() => {});

onUnmounted(() => {
  a_map = null;
  console.log("destory");
});

watch(
  () => props.markerList,

  (x) => {
    console.log(111111111111111, "--------------1");
    draw();
  }
);

const draw = () => {
    console.log(2222222);
    
  map.clearMap();
  let Zoom = 13;
  let radius = 100;
  switch (props.checked) {
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
    props.centerMachine.longitude,
    props.centerMachine.latitude,
  ]);
  //   画点
  drawMarker(props.markerList, map, a_map);

  // 画圆
  drawCircle(radius);
};
const drawMarker = (
  markerList: any[] | undefined,
  map: ShallowRef<null>,
  AMap
) => {
  let list: any[] = [];
  let marker = new AMap.Marker({
    offset: new AMap.Pixel(-10, -14), // 图大小决定类似 tranformcss 一半
    title: props.centerMachine.machineName,
    position: [props.centerMachine.longitude, props.centerMachine.latitude], //位置
    icon: new AMap.Icon({
      image: pic(props.centerMachine) ? pic(props.centerMachine) : jiancha_1,
      size: new AMap.Size(20, 26.5),
      imageSize: new AMap.Size(20, 26.5), //图标大小
    }),
  });
  markerList.forEach((e: any) => {
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
      props.centerMachine.longitude,
      props.centerMachine.latitude
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
  console.log(centerPosition, "centerPosition");

  //设置中心点
  var position = new a_map.LngLat(centerPosition[0], centerPosition[1]);
  map.setZoomAndCenter(Zoom, position);
};
const initMap = () => {
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
    })
    .catch((e) => {});
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

defineExpose({ draw });

</script>

<style scoped lang="scss">
#container {
  width: 100%;
  height: 232px !important;
}
</style>
