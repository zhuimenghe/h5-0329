import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from "./store";
import "./apis/http";
import './index.css'
import { Toast } from 'vant';

import "./assets/css/setting.css"
import "./assets/css/global.css"
import "./assets/scss/main.scss"


const app = createApp(App);

app.use(router);
app.use(store);
app.use(Toast);

//@ts-ignore
!(function(doc, win) {
  var docEle = doc.documentElement,
      evt = "onorientationchange" in window ? "orientationchange" : "resize",
      fn = function() {
        var width = docEle.clientWidth;
        width && (docEle.style.fontSize = 25 * (width / 750) + "px");
      };
   
  win.addEventListener('resize', fn, false);
  // win.onload=fn
  doc.addEventListener("DOMContentLoaded", fn, false);

}(document, window))

app.mount('#app')

export default app;
