<template>
  <div>
    <overlay :show="show" >
      <div class="wrapper" >
        <div class="block">
          <img src="~@/assets/imgs/main/sub-success-2.png" alt="">
        </div>
        <div class="close" @click="close">
            <van-icon name="close" size="2rem" color="#E60000" />
        </div>
      </div>
    </overlay>
  </div>
</template>

<script setup lang="ts">
import { Overlay } from "vant";
import { Icon as VanIcon } from 'vant';

type Props = {
  show: boolean;
};
let props = defineProps<Props>();

let emit = defineEmits(["update:show"]);
const close = () => {
  emit("update:show", false);
};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  background-color: #fff;
  width: 90%;
}
.close{
    margin-top: 3rem;
}
</style>
