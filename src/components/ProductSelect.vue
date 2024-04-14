<template>
  <CustomSelect
    :id="`product-${row.id}`"
    :value="row.productName"
    :options="products"
  />
</template>

<script setup>
import { inject, ref, onMounted } from "vue";
import CustomSelect from "./UI/CustomSelect.vue";

const { products } = inject('data')

const { row } = defineProps({
  row: Object,
});

</script>