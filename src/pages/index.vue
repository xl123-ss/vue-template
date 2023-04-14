<template>
<!--  <div class="p-3 flex space-x-5">-->
<!--    <h2>{{ adminInfo.username }}</h2>-->
<!--    <img :src="adminInfo.avatar" alt="" class="w-32 h-32 rounded-full" />-->
<!--    <el-button type="primary" @click="handleLogout">退出登录</el-button>-->
<!--  </div>-->
  <div>首页</div>
</template>

<script setup>

import { getToken, removeToken } from '~/composables/token.js'
import { ref } from 'vue';

import { useAdminStore } from '~/store'
import { storeToRefs } from 'pinia'
import router from '~/router'
import { toast } from '~/composables/util';

const store = useAdminStore()
const tokenStr = ref(getToken())
const { adminInfo } = storeToRefs(store)
const { getInfo, adminLogout } = store
//把值取出来
getInfo()
const handleLogout = () => {
  adminLogout()
  toast("退出登录")
  router.push("/login")
}

</script>
