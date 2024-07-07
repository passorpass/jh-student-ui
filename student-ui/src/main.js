
import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/router.js";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// main.js:注册所有图标
import * as ElIcon  from '@element-plus/icons'

const app = createApp(App)

Object.keys(ElIcon).forEach((key) => {
    app.component(key, ElIcon[key])
})

app.use(router)
app.use(ElementPlus)
app.mount('#app')




