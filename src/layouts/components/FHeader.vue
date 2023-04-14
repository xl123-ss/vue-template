<template>
  <div>头部</div>
  <div class="v-center bg-indigo-700 text-light-50 fixed top-0 left-0 right-0 h-16">
    <div class="v-center text-xl w-48 ml-2" :style="{width:sideWith}">
      <el-icon class="mr-1 text-3xl">
        <ElementPlus/>
      </el-icon>
      <div v-if="sideWith == '220px'">
        极客空间
      </div>

    </div>
    <el-icon class="icon-btn" @click="handleSideWith">
      <Fold/>
    </el-icon>
    <div class="v-center ml-auto">
      <el-icon class="icon-btn">
        <Refresh/>
      </el-icon>
      <el-icon class="icon-btn" @click="toggle">
        <FullScreen v-if="!isFullscreen"/>
        <!--        全局的非全局的图标变化-->
        <Aim v-else/>
      </el-icon>
      <el-icon class="icon-btn">
        <Printer/>
      </el-icon>
      <el-icon class="icon-btn">
        <Setting/>
      </el-icon>

      <el-dropdown class="f-center mx-5 h-64 cursor-pointer">
                <span class="v-center text-light-50">
                    <el-avatar class="mr-2" :size="25" :src="adminInfo.avatar"/>
                    {{ adminInfo.username }}
                    <el-icon class="el-icon--right">
                        <arrow-down/>
                    </el-icon>
                </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="openRePassword">修改密码</el-dropdown-item>
            <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>


  <FormDrawer ref="formDrawerRef" destroyOnClose @submit="onSubmit">
    <el-form :model="form" label-width="80px" ref="formRef" :rules="rules">
      <el-form-item label="旧密码" prop="oldpassword">
        <el-input placeholder="请输入旧密码" v-model="form.oldpassword"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input placeholder="请输入新密码" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="repassword">
        <el-input placeholder="请确认密码" v-model="form.repassword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit" class="bg-indigo-500 text-light-50 w-full p-4 rounded-full">提交
        </el-button>
      </el-form-item>
    </el-form>

  </FormDrawer>
</template>

<script setup>
import {storeToRefs} from 'pinia';
import {useAdminStore} from '~/store'
import {useRouter} from 'vue-router';
import {useFullscreen} from '@vueuse/core'
import FormDrawer from "../../components/FormDrawer.vue"
import {uselogout, useRepassword} from "../../composables/useAdmin"

const store = useAdminStore()
// const token = ref(cookie.get('admin-token'))
const {adminInfo} = storeToRefs(store)
const {getInfo, handleSideWith} = store
const {handleLogout} = uselogout()
const {formDrawerRef, form, rules, formRef, openRePassword, onSubmit,} = useRepassword()
const router = useRouter()
const {
  // 是否全屏状态
  isFullscreen,
  // 切换全屏
  toggle
} = useFullscreen()
getInfo()
const {sideWith} = storeToRefs(store)
</script>

<style>
.icon-btn {
  @apply flex justify-center items-center items-center mx-1 cursor-pointer;
}

.icon-btn:hover {
  @apply bg-indigo-300
}
</style>
