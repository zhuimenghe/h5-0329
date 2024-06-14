<template>
	<div></div>
</template>

<script lang="ts">

	import { defineComponent } from 'vue'

	const Component = defineComponent({
		beforeRouteEnter (to, from, next) {
			next(vm => {
				// 通过 `vm` 访问组件实例
				vm.sn = to.query.sn
			})
		},
		data() {
			return {
				sn: ''
			}
		},
	})
	export default Component
</script>

<style scoped>
#admin {
	width: 100%;
	min-height: 100vh;
	height: 100vh;
}
.top {
	height: 20px;
}

.main {
	height: calc(100% - 40px);
}
.main .nav {
	width: 200px;
}
.main .tabs {
	width: calc(100% - 200px);
}
</style>
