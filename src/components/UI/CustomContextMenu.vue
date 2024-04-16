<template>
  <div ref="ccmRef" v-if="show" class="box" :style="{ left: x - xOffset + 'px', top: y + yOffset + 'px' }">
    <slot></slot>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { onClickOutside } from '@vueuse/core'
  
  const ccmRef = ref(null)
  
  const props = defineProps({
    show: Boolean,
    x: Number,
    y: Number,
    ignore: Array
  })

  const emit = defineEmits(['closeContextMenu'])

  const xOffset = 250;
  const yOffset = 10;


  onClickOutside(ccmRef, (e) => {
    e.stopPropagation()
    emit('closeContextMenu')
  })

</script>

<style scoped>
.box {
  position: absolute;
  width: 250px;
  max-height: 350px;
  overflow-x: hidden;
  padding: 5px;
  z-index: 50;
  display: flex;
  justify-content: flex-end;
}

</style>