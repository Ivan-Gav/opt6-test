<template>
  <CustomNumberInput :value="row.price" :id="`price-${row.id}`" />
</template>

<script setup>
import CustomNumberInput from "./UI/CustomNumberInput.vue";

const { row } = defineProps({
  row: Object,
});
</script>
