<template>
    <el-drawer v-model="showDrawer" :title="title " :size="size" :destroy-on-close="true" :close-on-click-modal="false">
        <div class="form-drawer">
            <div class="body">
                <slot></slot>
            </div>
            <div class="actions">
                <el-button type="primary" @click="onSubmit" :loading="loading">{{ confirmText }}</el-button>
                <el-button type="default" @click="close" >取消</el-button>
            </div>
        </div>
    </el-drawer>
</template>

<script setup>
import { ref } from 'vue'
const showDrawer = ref(false)
const loading = ref(false)
const props = defineProps({
    title: {
        type: String,
        default: '标题'
    },
    size: {
        type: String,
        default: "45%"
    },
    destroyOnClose: {
        type: Boolean,
        default: false
    },
    confirmText: {
        type: String,
        default: "提交"
    }
})
//打开
const open = () => {
  showDrawer.value = true
}
const close = () => showDrawer.value = false

const showLoading = () => loading.value = true
const closeLoading = () => loading.value = false


const emit = defineEmits(["submit"])
const onSubmit = () => emit("submit")
//向父组件暴露以下方法
defineExpose({
    open, close,showLoading,closeLoading
})
</script>

<style scoped>
.form-drawer {
    width: 100%;
    height: 100%;
    position: relative;
    @apply flex flex-col;
}

.form-drawer .body {
    flex: 1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    overflow-y: auto;
}

.form-drawer .actions {
    height: 60px;
    @apply mt-auto flex items-center;

}
</style>
