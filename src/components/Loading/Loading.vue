<script lang='ts'>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'Loading',
  props: {
    lock: { type: Boolean, default: true },
  },
  setup(props) {
    const circle = ref(['circle_1', 'circle_2', 'circle_3', 'circle_4', 'circle_5'])
    return {
      circle,
    }
  },
})
</script>

<template>
  <div class="lock">
    <div class="chunk">
      <div v-for="item in circle" :key="item" :class="item" />
    </div>
  </div>
</template>

<style lang='less'>
.circle_1,.circle_2,.circle_3,.circle_4,.circle_5{
  position: absolute;
  animation: item 1.2s infinite;
}
.circle_1{
  background-color: aqua;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  top: 0;
  left: 0;
}
.circle_2{
  background-color: #5a9d38;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  top: 0;
  right: 0;
}
.circle_3{
  background-color: #b36523;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  bottom: 0;
  right: 0;
}
.circle_4{
  background-color: #1c8787;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  bottom: 0;
  left: 0;
}
.circle_5{
  background-color: #c4cf1e;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  bottom: 0;
  left: 0;
}
.chunk{
  position: relative;
  width: 150px;
  height: 150px;
  flex-wrap: wrap;
  animation: ani 1.2s linear infinite;
  transition: all 0.5s;
  transform: rotate(45deg);
}
@keyframes ani {
  0%{
    transform: rotate(0);
    .circle_1{
      display: none;
    }
  }

  100%{
    transform: rotate(359deg);
    .circle_1{
      display: none;
    }
  }
}
@keyframes item {
  0%{
   transform: scale(1) translateX(-50%);
  }
  30%{
    transform: scale(1.5);
    transform: scale(1) translateX(-80%);
  }
  60%{
    transform: scale(1.5);
    transform: scale(1) translateX(50%);
  }
  100%{
     transform: scale(1);
     transform: scale(1) translateX(0);
  }
}
.lock{
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0,0.5);
}
</style>
