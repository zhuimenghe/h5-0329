<template>
  <div>
    <popup
        :show="show"
        position="bottom"
        :style="{ height: '10rem' }"
        @close="close"
    >
    <div class="popup-content">
      <span>敬请期待</span>
    </div>
    </popup>
  </div>
</template>

<script setup lang="ts">
import { Popup } from 'vant';


type Props = {
    show:boolean
}

defineProps<Props>()

let emit = defineEmits(['update:show'])
const close = ()=>{
  emit('update:show',false)
}


</script>

<style scoped lang="scss">
.popup-content{
    height: 100%;
    text-align: center;
    line-height: 10rem;
}
</style>
