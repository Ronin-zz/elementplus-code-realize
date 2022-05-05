<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const sss = ref<HTMLDivElement>();
onMounted(() => {
  sss.value?.click()
});

function handleClick() {
  console.log('per');

}
</script>

<template>
  <div ref="sss" @click="handleClick"></div>
</template>