<template>
  <div class="box" ref="selectRef">
    <div class="select" :class="isOpen && 'open'" @click="handleSelectClick">{{ model }}</div>
    <ul class="options" v-if="isOpen">
      <li class="option" v-for="option in options" :key="`${id}-${option.id}`" @click="() => handleOptionClick(option)">
        {{ option.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import useOutsideClick from "../../composables/useOutsideClick.js";

const props = defineProps({
  value: String,
  id: String,
  options: Array,
});

const model = defineModel()

const selectRef = ref(null)
const isOpen = ref(false);
// const val = ref(props.value || "");

const handleSelectClick = () => {
  isOpen.value = !isOpen.value;
};

const handleOptionClick = (option) => {
  model.value = option.name
  closeOptions()
}

const closeOptions = () => {
  if (isOpen.value) {
    isOpen.value = false;
  }
}

useOutsideClick(selectRef, closeOptions);
</script>

<style scoped>
.box {
  position: relative;
  width: 100%;
}

.select {
  position: relative;
  display: flex;
  align-items: center;
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
  cursor: pointer;
}

.select.open {
  background-image: none;
}

.select::after {
  content: "▶";
  color: var(--color-controls-4);
  font-size: 6px;
  position: absolute;
  right: 0;
  top: 0;
  width: 21px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-controls-1);
  opacity: 1;
  transition: opacity 0.3s ease-in;
}

.select.open::after {
  opacity: 0;
}

.options {
  position: absolute;
  z-index: 10;
  width: 100%;
  list-style: none;
  margin-top: 10px;
  padding: 0;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  box-shadow: var(--shadow-select);
  background-color: #fff;
}

.option {
  cursor: pointer;
  background-color: transparent;
  transition: background-color 0.3s ease-in;
  padding: 7px 10px;
  text-overflow: clip;
  white-space: nowrap;
  overflow: hidden;
}

.option:hover {
  background-color: var(--color-bg-5);
}

.option:active {
  opacity: 0.7;
}
</style>
