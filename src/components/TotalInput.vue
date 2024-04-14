<template>
  <CustomNumberInput :value="row.price * row.qty" :id="`total-${row.id}`" />
</template>

<script setup>
import CustomNumberInput from "./UI/CustomNumberInput.vue";

const { row } = defineProps({
  row: Object,
});
</script>
