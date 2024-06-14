<template>
   <div class="bg-gray-100 p-4 text-right">
        <span class="text-gray-600 font-semibold">交互提示信息相对应位置</span>
    </div>

    <!-- 主要内容区域 -->
    <div class="p-4">
        <!-- 轮播图占位符 -->
        <div class="bg-gray-300 h-40 rounded-lg mb-4">
            <img src="https://placehold.co/600x150" alt="主视觉图标，包含几种工程车辆和公司logo" class="rounded-lg">
        </div>

        <!-- 功能图标 -->
        <div class="flex justify-around mb-4">
            <div class="text-center">
                <div class="w-16 h-16 bg-teal-300 rounded-full mb-2"></div>
                <span>功能1</span>
            </div>
            <div class="text-center">
                <div class="w-16 h-16 bg-yellow-300 rounded-full mb-2"></div>
                <span>功能2</span>
            </div>
            <div class="text-center">
                <div class="w-16 h-16 bg-blue-300 rounded-full mb-2"></div>
                <span>功能3</span>
            </div>
        </div>

        <!-- 联系信息 -->
        <div class="bg-white p-4 rounded-lg mb-4">
            <div class="flex justify-between items-center">
                <span class="font-bold text-lg">咨询电话：18989899898</span>
                <span class="text-red-500 text-lg">
                    <i class="fas fa-phone"></i>
                </span>
            </div>
        </div>

        <!-- 卡片信息 -->
        <div class="bg-white p-4 rounded-lg mb-4">
            <div class="mb-2">
                <span class="text-gray-800 font-bold">设备信息</span>
            </div>
            <div class="flex justify-between items-center mb-2">
                <span class="bg-red-200 text-red-800 px-4 py-1 rounded">型号1</span>
                <span class="bg-red-200 text-red-800 px-4 py-1 rounded">型号2</span>
                <span class="bg-red-200 text-red-800 px-4 py-1 rounded">型号3</span>
            </div>
            <!-- 重复的设备信息 -->
            <div class="text-sm">
                <span>其他相关设备信息</span>
            </div>
        </div>

        <!-- 底部横幅占位符 -->
        <div class="bg-orange-500 p-4 rounded-lg mb-4 text-center">
            <span class="text-white font-bold">底部横幅信息</span>
        </div>
    </div>

    <!-- 底部二维码 -->
    <div class="fixed inset-x-0 bottom-0 p-4 bg-gray-100 text-center">
        <img src="https://placehold.co/100x100" alt="底部二维码图像，用于扫描" class="mx-auto">
    </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

interface EquipmentItem {
  code: string;
  details: string;
  status: string;
  timestamp: string;
}

export default defineComponent({
  name: 'ConstructionEquipmentRental',
  setup() {
    const equipmentList = ref<EquipmentItem[]>([
      // Populate with equipment data
      { code: 'ZPM0024', details: '详情', status: '可租', timestamp: '2022-09-23 12:23:34' },
      // Add more items here
    ]);

    const qrCodeBase64 = ref(''); // Placeholder for QR code base64 data

    // Fetch QR code or generate dynamically
    // This would be replaced with actual logic to fetch or generate the QR code.
    qrCodeBase64.value = '...';

    return {
      equipmentList,
      qrCodeBase64
    };
  }
});
</script>

<style>
/* Add custom styles here if necessary */
</style>