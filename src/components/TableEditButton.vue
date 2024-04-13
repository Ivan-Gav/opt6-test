<template>
  <div class="box">
    <button>
      <EllipsisSVG class="ellipsis"/>
    </button>
  </div>
</template>

<script setup>
import EllipsisSVG from "./SVG/EllipsisSVG.vue";
</script>

<style scoped>
.box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.ellipsis {
  color: var(--color-controls-2);
}
</style>
