<template>
  <div>
      {{ tokenStr }}
  </div>
  <div>
      {{ token }}
      
      <button @click="back">退出</button>
  </div>

 
</template>

<script setup>

import { getToken,removeToken } from '~/utils/token.js'
import { ref } from 'vue';

import { useAdmin } from '~/store'
import { storeToRefs } from 'pinia'
import router from '~/router'

const store = useAdmin()
const tokenStr = ref(getToken())
const back = ()=>{

  console.log("aa")
  router.push("/")
  removeToken()
 
}
const { token, admin } = storeToRefs(store)
</script>