<template>
  <CustomSelect
    :id="`item-${row.id}`"
    :value="row.itemName"
    :options="options"
  />
</template>

<script setup>
import { inject, computed } from "vue";
import CustomSelect from "./UI/CustomSelect.vue";

const { row } = defineProps({
  row: Object,
});

const { products } = inject("data");

const options = computed(() => {
  const product = products.value.find((p) => p.id === row.productID);
  if (product && "items" in product) {
    return [...product.items];
  } else {
    return []
  }
})

</script>
