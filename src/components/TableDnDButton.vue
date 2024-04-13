<template>
  <div class="box">
    <button>
      <BurgerSVG class="burger"/>
    </button>
    <p class="index">{{ index }}</p>
  </div>
</template>

<script setup>
import BurgerSVG from "./SVG/BurgerSVG.vue";
defineProps({
  index: Number,
});
</script>

<style scoped>
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}
.burger {
  color: var(--color-controls-2)
}
.index {
  font-size: 16px;
}
</style>
