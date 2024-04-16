<template>
  <CustomNumberInput :value="row.qty" :id="`qty-${row.id}`" />
</template>

<script setup>
import CustomNumberInput from "./UI/CustomNumberInput.vue";

const { row } = defineProps({
  row: Object,
});
</script>
