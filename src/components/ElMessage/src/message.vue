<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useEventListener, useResizeObserver, useTimeoutFn } from '@vueuse/core'
import { messageEmits, messageProps } from './types'
import { getLastOffset } from './instance'
import { useNamespace } from '@/hooks/use-namespace'

const props = defineProps(messageProps)

defineEmits(messageEmits)

const visible = ref(false)
const ns = useNamespace('message')
const messageRef = ref<HTMLDivElement>()
const height = ref(0)
let stopTimer: (() => void) | undefined

const EVENT_CODE = {
  tab: 'Tab',
  enter: 'Enter',
  space: 'Space',
  left: 'ArrowLeft', // 37
  up: 'ArrowUp', // 38
  right: 'ArrowRight', // 39
  down: 'ArrowDown', // 40
  esc: 'Escape',
  delete: 'Delete',
  backspace: 'Backspace',
  numpadEnter: 'NumpadEnter',
  pageUp: 'PageUp',
  pageDown: 'PageDown',
  home: 'Home',
  end: 'End',
}

const typeClass = computed(() => {
  const type = props.type
  return { [ns.bm('icon', type)]: type }
})

const lastOffset = computed(() => getLastOffset(props.id))
const offset = computed(() => props.offset + lastOffset.value)
const bottom = computed((): number => height.value + offset.value)
const customStyle = computed<CSSProperties>(() => ({
  top: `${offset.value}px`,
  zIndex: props.zIndex,
}))

function startTimer() {
  if (props.duration === 0)
    return
  ;({ stop: stopTimer } = useTimeoutFn(() => {
    close()
  }, props.duration))
}
function clearTimer() {
  stopTimer?.()
}
function close() {
  visible.value = false
}
function keydown({ code }: KeyboardEvent) {
  if (code === EVENT_CODE.esc)
    close()
}
onMounted(() => {
  startTimer()
  visible.value = true
})
watch(
  () => props.repeatNum,
  () => {
    clearTimer()
    startTimer()
  },
)
useEventListener(document, 'keydown', keydown)
useResizeObserver(messageRef, () => {
  height.value = messageRef.value!.getBoundingClientRect().height
})
defineExpose({
  visible,
  bottom,
  close,
})
</script>

<template>
  <transition
    :name="ns.b('fade')" @before-leave="onClose"
    @after-leave="$emit('destroy')"
  >
    <div
      v-show="visible" ref="messageRef" :class="[
        ns.b(),
        { [ns.m(type)]: type },
        ns.is('center', center),
        ns.is('closable', showClose),
        customClass,
      ]"
      :style="customStyle"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <slot>
        <p v-if="!dangerouslyUseHTMLString" :class="ns.e('content')">
          {{ message }}
        </p>
        <p v-else :class="ns.e('content')" v-html="message" />
      </slot>
    </div>
  </transition>
</template>

<style>

</style>
