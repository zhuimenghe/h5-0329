declare module '*.vue' {
	import { DefineComponent } from 'vue'
	const component: DefineComponent<{}, {}, any>
	export default component
}


declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'
declare module '*.json'

interface AnyObject {
	[key: string]: any
}

// 声明 vite 环境变量
declare interface ImportMetaEnv {
  readonly VITE_API_DOMAIN: string;
  // 更多环境变量...
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}