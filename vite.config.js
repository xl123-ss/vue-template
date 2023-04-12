import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
// WindiCSS
import WindiCSS from 'vite-plugin-windicss'
// path
import path from 'path'
export default defineConfig({
    plugins: [
        vue(),
        WindiCSS()
    ],

    resolve: {
        alias: {
             // 用 ~ 表示 src 更目录别名
            "~": path.resolve(__dirname, "src")
        }
    }

})