<!-- Альтенативная версия селекта, использующая нативный HTML Select элемент. В ней нельзя стилизовать список опций, но, по моему мнению, она предпочтительнее с точки зрения доступности и оптимизации -->

<template>
  <div class="box">
    <select :id="id" v-model="val" class="select">
      <option v-for="option in options">{{ option.name }}</option>
    </select>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  value: String,
  id: String,
  options: Array,
});

const val = ref(props.value || "");
</script>

<style scoped>
.box {
  position: relative;
}

.select {
  min-height: 35px;
  width: 100%;
  padding-inline: 15px 25px;
  border-radius: 5px;
  border: solid 1px var(--color-border-2);
  outline: none;
  text-overflow: clip;
  white-space: nowrap;
  overflow: hidden;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-image: linear-gradient(var( --color-controls-1), var( --color-controls-1)) ;
  background-repeat: no-repeat;
  background-position: right top;
  background-size: 21px 100% ;
}

.box::after {
  content: "◥";
  transform: rotate(45deg);
  color: var(--color-controls-4);
  font-size: 6px;
  position: absolute;
  right: 11px;
  top: 13px;
}
</style>
