import router from '~/router'

import { getToken } from '~/composables/token'
import { toast,showFullLoading, hideFullLoading} from '~/composables/util'

// 全局路由前置守卫
router.beforeEach((to, from, next) => {

    // 显示进度条
    showFullLoading()

    const token = getToken()
    // console.log("AA")
    // console.log("请求路径:"+to.path+"--"+!token)
    console.log(to.path != '/login')
    // 目标页面不是登录页，且没有token，跳回登录页面
    if (!token && to.path != '/login') {
        toast('请先登录', 'error')
        return next({ path: '/login' })
    }


    // // // 防止重复登录
    if (to.path == '/login' && token) {
        toast('请勿重复登录', 'error')
        return next({ path: from.path || '/' })
    }

    //设置信息

    // 设置页面标题
    let title = `admin - ${to.meta.title || ''}`
    document.title = title

    next()

})

// 路由的后置守卫
router.afterEach((to, from) => {
    hideFullLoading()
})
