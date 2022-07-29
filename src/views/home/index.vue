<script lang="ts" setup>
import { getCurrentInstance, onMounted, ref } from 'vue'
import message, { ElMessage } from '@/components/ElMessage'

function handleClick() {
  message({
    message: '测试新闻',
  })
}

const app = getCurrentInstance()!
</script>

<template>
  <button ref="sss" @click="handleClick">
    点击
  </button>
</template>
