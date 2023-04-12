<template>
    <div>
        <el-row class="box-border w-screen h-screen">
            <el-col :span="16" class="bg-blue-400 text-white col-center">
                <span class="text-5xl font-bold mb-10">管 理 系 统</span>
                <span class="text-3xl">shop-admin</span>
            </el-col>
            <el-col :span="8" class="col-center">
                <h2 class="text-3xl font-bold">登录</h2>
                <div class="text-sm text-gray-500 flex w-full justify-center items-center p-5">
                    <span class="h-[1px] w-1/5 bg-gray-200"></span>
                    <span class="mx-2 ">账号密码登录</span>
                    <span class="h-[1px] w-1/5 bg-gray-200"></span>
                </div>
                <!-- model 绑定表单内容对象 、 rules 绑定规则 、 ref 绑定表单元素 -->
                <el-form :model="form" label-width="120px" label-position="left" ref="formRef" :rules="rules">
                    <!-- prop 绑定表单规则对象 -->
                    <el-form-item label="Username" prop="username">
                        <el-input type="text" placeholder="请输入账号" v-model="form.username">
                            <template #prefix>
                                <el-icon>
                                    <user />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <!-- prop 绑定表单规则对象 -->
                    <el-form-item label="Password" prop="password">
                        <el-input type="password" placeholder="请输入密码" v-model="form.password">
                            <template #prefix>
                                <el-icon>
                                    <lock />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <!-- 绑定点击事件 -->
                    <el-button type="primary" class="w-80" @click="onSubmit">登 录</el-button>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { adminLogin } from '~/api/admin'
// 消息提示组件
import { ElNotification } from 'element-plus'
import router from '~/router'

// 引入useCookies
import { useCookies } from '@vueuse/integrations/useCookies'
// 提示组件
import { toast } from '~/utils/toast'

import { useAdmin } from '~/store'
import { setToken } from '~/utils/token'
const store = useAdmin()

const { setStoreToken } = store

// 定义表单提交对象
const form = reactive({
    username: 'admin',
    password: 'admin'
})


// 绑定表单规则
const rules = {
    username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' }
    ]
}

// 定义表单元素dom
const formRef = ref(null)
// 旋转加载
const loading = ref(false)
// 点击事件
const onSubmit = () => {
    formRef.value.validate((valid) => {
        if (!valid) {
            // 校验失败
            return
        }
        // 开始加载
        loading.value = true
        adminLogin(form.username, form.password)
            .then((res) => {
            if (res.code === 200) {
                // 将登录成功返回 token 存入 cookie

                setToken(res.data.token)
                setStoreToken(res.data.token)
                toast(res.msg)
                router.push('/')
            } else {
                toast(res.msg || '登录失败', 'error')
            }

        })
        .finally(() => {
            // 加载结束
            loading.value = false
        })


    })
}
</script>

<style scoped>
.col-center {
    @apply flex flex-col justify-center items-center
}
</style>