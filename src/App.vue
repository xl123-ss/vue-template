<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <router-view/>
</template>

<style >


#nprogress .bar {
  background-color: #3cb6ea !important;
  height: 5px !important;
}

.f-center {
  @apply flex justify-center items-center
}

.f-around {
  @apply flex justify-around items-center
}

.f-between {
  @apply flex justify-between items-center
}

.v-center {
  @apply flex items-center
}

</style>
