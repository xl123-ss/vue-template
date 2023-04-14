<template>
  <div class="side" :style="{width:sideWith}">
    <h2>侧边菜单</h2>
  </div>


</template>

<script setup>


import {useAdminStore} from '~/store';
import {storeToRefs} from 'pinia';

const store = useAdminStore()
const {sideWith} = storeToRefs(store)

</script>

<style scoped>
.side {
  width: 22px;
  @apply h-screen bg-blue-200;
}
</style>
