<template>
  <h1>Hello OPT6!</h1>
  <p v-for="item in goods">{{ item.name }}</p>
</template>

<script setup>
import { onMounted, ref } from "vue";
import goods from "./mockdata/goods.json";
import orderItems from "./mockdata/orderItems.json";

const table = ref([]);

onMounted(() => {
  //get data from backend

  if (!goods || !orderItems) {
    throw new Error(`Can't fetch data from server`)
  }

  table.value = orderItems.map((item, i) => {
    const { productID, itemID, qty, deliveryDate, deliveryAddress, phone, manager } = item
    
    const product = goods.find((p) => (p.id = productID));
    const prodItem = product
      ? product.items.find((itm) => itm.id === itemID)
      : null;
       
    return {
      index: i,
      id: `tr-${i}`,
      productName: product.name,
      itemName: prodItem.name,
      qty,
      price: prodItem.price,
      totalPrice: prodItem.price * qty,
      weight: prodItem.weight,
      totalWeight: prodItem.weight * qty,
      deliveryDate,
      deliveryAddress,
      phone,
      manager
    };
  });
  console.log(table.value);
});
</script>

<style scoped></style>
