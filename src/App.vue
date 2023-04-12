<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <router-view/>
</template>

<style scoped>
.btn {
  @apply bg-red-500 text-white px-10 py-2 rounded-full hover: (bg-red-700) focus:(ring-8 ring-red-400) transition-all duration-500;
}
</style>