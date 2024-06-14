import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"
import { changePackageVersion } from "./build/plugins"
import { readdirSync } from 'fs';
import { viteMockServe } from 'vite-plugin-mock'
import AutoImport from 'unplugin-auto-import/vite'

// 1 安装：npm install vant
// 2 引入组件
// 2.1 安装插件（vite项目）：npm i vite-plugin-style-import@1.4.1 -D
// 2.2 配置插件
import styleImport,{VantResolve} from 'vite-plugin-style-import'
// export const vant = {
//   plugins: [
//     vue(),
//     styleImport({
//       resolves: [VantResolve()]
//     })
//   ]
// };
// 3 引入组件，在main.ts中（全局），也可以当前组件中编写（局部）


/**
 * 获取多入口文件
 * @returns 
 */
export function getPages() {
  let pagePath = resolve(__dirname, "./src/pages");
  let files: string[] = readdirSync(pagePath);
  let pages: { [key: string]: string } = {
    main: resolve(__dirname, 'index.html'),
    weixin: resolve(__dirname, 'weixin.html')
  };
  for (let i = 0; i < files.length; i++) {
    let key = files[i].replace('.html', '');
    // if (key === 'index') continue;
    pages[key] = resolve(__dirname, `src/pages/${files[i]}`);
  }
  return pages;
}

// https://vitejs.dev/config/

const pathSrc = resolve(__dirname, 'src')
// @ts-ignore
export default ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
 
  return defineConfig({
    base: process.env.VITE_BASE_URL,
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src")
      }
    },
    server: {
      host: mode !== "prod",
      proxy:{
        '/api': {
          target: 'http://api-rental-test.sany.com.cn/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
          configure: (proxy, options) => {
            // proxy 是 'http-proxy' 的实例
          }
        },
        // '/rental_api': {
        //   target: 'https://rental-test.sany.com.cn/',
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/rental_api/, "api"),
        //   configure: (proxy, options) => {
        //     // proxy 是 'http-proxy' 的实例
        //   }
        // },
        '/rental_api': {
          target: 'https://awp-test.sany.com.cn/',
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/rental_api/, "api"),
          configure: (proxy, options) => {
            // proxy 是 'http-proxy' 的实例
          }
        }
      }
    },
    plugins: [
      changePackageVersion(),
      vue(),
      AutoImport({
        dirs: ['src/shared'],
        // Auto import functions from Vue, e.g. ref, reactive, toRef...
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ['vue', 'vue-router', '@vueuse/core'],

        // eslintrc: {
        //   enabled: true, // Default `false`
        //   filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        //   globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        // },

        dts: resolve(pathSrc, 'types/auto-imports.d.ts'),
      }),
      mode == "development" ? 
      viteMockServe({
        mockPath: './mock',
        supportTs:true
      }):null,
      styleImport({
        resolves: [{
          libraryName: "vant",
          esModule: true,
          resolveStyle: (name) => `../es/${name}/style`
        }]
      }),
      // styleImport({
      //   libs:[
      //     {
      //       libraryName:'vant',
      //       esModule:true,
      //       resolveStyle:(name) => `/node_modules/vant/es/${name}/style`
      //     }
      //   ]
      // })
    ],
    build: {
      rollupOptions: {
        input: getPages(),
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/assets/scss/mixins/_index.scss";
          `
        }
      }
    }
  })
  
}
