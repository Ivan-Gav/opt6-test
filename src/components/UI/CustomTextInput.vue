<template>
  <input :id="id" type="text" v-model="val" class="input" />
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  value: String,
  id: String,
});

const val = ref(props.value || '');
</script>

<style scoped>
.input {
  min-height: 35px;
  width: 100%;
  padding-inline: 15px;
  border-radius: 5px;
  border: solid 1px var(--color-border-2);
  outline: none;
  text-overflow: clip;
  white-space: nowrap;
  overflow: hidden;
  -moz-appearance: textfield;
  -webkit-appearance: textfield;
  appearance: textfield;
}

.input::-webkit-outer-spin-button,
.input::-webkit-inner-spin-button {
  display: none;
}


.input:focus-visible {
  outline: solid 1px;
  outline-color: var(--color-border-2);
}
</style>
