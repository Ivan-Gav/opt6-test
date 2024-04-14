<template>
  <div class="box">
    <button @mousedown="emit('pressDrag')">
      <BurgerSVG class="burger" />
    </button>
    <p class="index">{{ row.index }}</p>
  </div>
</template>

<script setup>
import BurgerSVG from "./SVG/BurgerSVG.vue";
defineProps({
  row: Object,
});

const emit = defineEmits(['pressDrag']);
</script>

<style scoped>
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}
.burger {
  color: var(--color-controls-2);
  cursor: move;
}
.index {
  font-size: 16px;
}
</style>
