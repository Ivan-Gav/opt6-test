<template>
  <main class="main">
    
    <h1 class="pageheading">Проведение ТО и мелкий ремонт</h1>
    
    <NavBar />
    
    <div class="box">
      <button class="add-btn">
        <PlusSVG />
        <span>Добавить строку</span>
      </button>
    </div>

    <TableComponent :table="table" />

  </main>
</template>

<script setup>
import { onBeforeMount, provide, ref } from "vue";
import goods from "./mockdata/goods.json"; // mock data to emulate products from backend
import orderItems from "./mockdata/orderItems.json"; // mock data to emulate order info from backend
import NavBar from "./components/NavBar.vue";
import PlusSVG from "./components/SVG/PlusSVG.vue";
import TableComponent from "./components/TableComponent.vue";

const products = ref([])
const orderRows = ref([])

const table = ref([]);

onBeforeMount(() => {
  // get data from backend

  if (!goods || !orderItems) {
    throw new Error(`Can't fetch data from server`)
  }

  products.value = goods;
  orderRows.value = orderItems;

  table.value = orderItems.map((item, i) => {
    const { productID, itemID, qty, deliveryDate, deliveryAddress, phone, manager } = item
    
    const product = goods.find((p) => (p.id = productID));
    const prodItem = product
      ? product.items.find((itm) => itm.id === itemID)
      : null;
       
    return {
      index: i + 1,
      id: `tr-${i}`,
      productID: product.id,
      productName: product.name,
      itemID: prodItem.id,
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
});

provide('data', { products, orderRows })

</script>

<style scoped>
.main {
  width: 100%;
  max-width: 1500px;
  min-height: 100dvh;
  margin-left: auto;
  background-color: var(--color-bg-3);
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.pageheading {
  margin: 0;
  padding: 0;
  font-size: 30px;
}

.box {
  width: 100%;
  padding: 20px 25px;
  border-radius: 10px;
  box-shadow: var(--shadow);
  border: solid 1px var(--color-border-1);
  background-color: white;
}

.add-btn {
  width: max-content;
  padding: 9px 15px 9px 10px;
  border-radius: 5px;
  background-color: var(--color-controls-3);
  gap: 7px;
  color: white;
  font-size: 14px;
}
</style>
