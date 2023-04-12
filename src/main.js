import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 引入element-plus组件
import Element from 'element-plus'
// 引入element-plus样式
import "element-plus/dist/index.css"
// 引入windi
import 'virtual:windi.css'
// router
import router from './router'


import './permission'
const  app = createApp(App)
//使用element-plus组件
app.use(Element)
//使用router组件
//  全局引入 Element Plus
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 引入pinia
import { createPinia } from 'pinia'
app.use(createPinia())

app.use(router)
app.mount('#app')
