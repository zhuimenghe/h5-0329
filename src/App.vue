<template>
  <router-view />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { version, buildTime } from "../build/info.json"

console.log(`%c Release Build Info 
%cVersion			v${version}
BuildTime		${buildTime}`
  , "background:#000;color:#FFF;font-weight:bold;"
  , "background:#FFF;color:#000;"
)

</script>

<style>
#app {
  font-family: "Microsoft YaHei",Avenir, Helvetica, Arial, sans-serif, PingFangSC-Regular;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #222;
  height:100vh;
}
:root{
  
}
</style>
