<template>
  <main :class="{main: true, mobile: isMobile}">
    <section class="heading-box">
      <button v-if="isMobile" class="burger-btn" @click="() => console.log('эта кнопка что-то делает...')">
        <BurgerSVG />
      </button>
      <h1 class="heading">Проведение ТО и мелкий ремонт</h1>
    </section>
    

    <NavBar />

    <section class="box">
      <button class="add-btn" @click="addRow">
        <PlusSVG />
        <span>Добавить строку</span>
      </button>
    </section>

    <TableComponentMobile
      v-if="isMobile"
      :table="table"
    />

    <TableComponent
      v-else
      :table="table"
    />
  </main>
</template>

<script setup>
import { onBeforeMount, provide, ref, computed } from "vue";
import { useMediaQuery } from '@vueuse/core'

import goods from "./mockdata/goods.json"; // mock data to emulate products from backend
import orderItems from "./mockdata/orderItems.json"; // mock data to emulate order info from backend
import NavBar from "./components/NavBar.vue";
import PlusSVG from "./components/SVG/PlusSVG.vue";
import BurgerSVG from "./components/SVG/BurgerWideSVG.vue";
import TableComponent from "./components/TableComponent.vue";
import TableComponentMobile from "./components/TableComponentMobile.vue";
import TableEditButton from "./components/TableEditButton.vue";
import TableDnDButton from "./components/TableDnDButton.vue";
import ProductItemSelect from "./components/ProductItemSelect.vue";
import CustomSelect from "./components/UI/CustomSelect.vue";
import CustomNumberInput from "./components/UI/CustomNumberInput.vue";
import CustomTextInput from "./components/UI/CustomTextInput.vue";
import useTableUpdate from "./composables/useTableUpdate";
import formatNr from "./utils/formatNr";

const products = ref([]);
const orderRows = ref([]);

const table = ref([]);

onBeforeMount(() => {
  // get data from backend

  if (!goods || !orderItems) {
    throw new Error(`Can't fetch data from server`);
  }

  products.value = goods;
  orderRows.value = orderItems;

  table.value = orderItems.map((item, i) => {
    const {
      productID,
      itemID,
      qty,
      deliveryDate,
      deliveryAddress,
      phone,
      manager,
    } = item;

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
      manager,
    };
  });
});

const addRow = () => {
  const newRow = {
    index: table.value.length + 1,
    id: `tr-${table.value.length}`,
    productID: products.value[0].id,
    productName: products.value[0].name,
    itemID: products.value[0].items[0].id,
    itemName: products.value[0].items[0].name,
    qty: 0,
    price: products.value[0].items[0].price,
    totalPrice: 0,
    weight: products.value[0].items[0].weight,
    totalWeight: 0,
    deliveryDate: "",
    deliveryAddress: "",
    phone: "",
    manager: "",
  };

  table.value.push(newRow);
};

const deleteRow = (row) => {
  table.value.splice(table.value.indexOf(row), 1);
};

const myColumns = [
  {
    accessorKey: "index",
    header: "Номер строки",
    cell: TableDnDButton,
    getCellProps: (row) => ({ row }),
    initialWidth: 50,
    initialShow: true,
    editable: false,
  },
  {
    accessorKey: "edit",
    header: "Действие",
    cell: TableEditButton,
    getCellProps: (row) => ({ row }),
    initialWidth: 24,
    initialShow: true,
    editable: false,
  },
  {
    accessorKey: "itemName",
    header: "Наименование единицы",
    cell: ProductItemSelect,
    getCellProps: (row) => ({ row }),
    initialWidth: 0,
    initialShow: true,
    editable: true,
  },
  {
    accessorKey: "price",
    header: "Цена",
    cell: CustomNumberInput,
    getCellProps: (row) => ({ id: `price-${row.id}` }),
    initialWidth: 0,
    initialShow: true,
    editable: true,
  },
  {
    accessorKey: "qty",
    header: "Кол-во",
    cell: CustomNumberInput,
    getCellProps: (row) => ({ id: `qty-${row.id}` }),
    initialWidth: 0,
    initialShow: true,
    editable: true,
  },
  {
    accessorKey: "productName",
    header: "Название товара",
    cell: CustomSelect,
    getCellProps: (row) => ({
      id: `product-${row.id}`,
      options: products.value,
    }),
    initialShow: true,
    editable: true,
  },
  {
    accessorKey: "totalPrice",
    header: "Итого",
    cell: CustomNumberInput,
    getCellProps: (row) => ({ id: `total-${row.id}` }),
    initialShow: true,
    editable: true,
  },
  {
    accessorKey: "weight",
    header: "Вес",
    cell: CustomNumberInput,
    getCellProps: (row) => ({ id: `weight-${row.id}` }),
    initialShow: false,
    editable: true,
  },
  {
    accessorKey: "totalWeight",
    header: "Общий вес",
    cell: CustomNumberInput,
    getCellProps: (row) => ({ id: `total-weight-${row.id}` }),
    initialShow: false,
    editable: true,
  },
  {
    accessorKey: "deliveryDate",
    header: "Дата поставки",
    cell: CustomTextInput,
    getCellProps: (row) => ({ id: `delivery-date-${row.id}` }),
    initialShow: false,
    editable: true,
  },
  {
    accessorKey: "deliveryAddress",
    header: "Адрес доставки",
    cell: CustomTextInput,
    getCellProps: (row) => ({ id: `delivery-address-${row.id}` }),
    initialShow: false,
    editable: true,
  },
  {
    accessorKey: "phone",
    header: "Телефон",
    cell: CustomTextInput,
    getCellProps: (row) => ({ id: `phone-${row.id}` }),
    initialShow: false,
    editable: true,
  },
  {
    accessorKey: "manager",
    header: "Менеджер",
    cell: CustomTextInput,
    getCellProps: (row) => ({ id: `manager-${row.id}` }),
    initialShow: false,
    editable: true,
  },
];

const columns = ref(
  myColumns.map((col, i) => ({
    key: col.accessorKey,
    i,
    width: col.initialWidth || 0,
    name: col.header || col.accessorKey,
    show: col.initialShow || false,
    editable: col.editable || false,
  }))
);

const visibleColumns = computed(() => columns.value.filter((col) => col.show));

const totalPrice = computed(() =>
  formatNr(table.value.reduce((total, row) => total + row.price * row.qty, 0))
);
const totalQty = computed(() =>
  formatNr(table.value.reduce((total, row) => total + row.qty, 0))
);
const totalWeight = computed(() =>
  formatNr(table.value.reduce((total, row) => total + row.weight * row.qty, 0))
);

useTableUpdate(table, products);

const isMobile = useMediaQuery('(max-width: 768px)')

provide("table", {
  table,
  columns,
  myColumns,
  visibleColumns,
  totalPrice,
  totalQty,
  totalWeight,
  deleteRow,
});
provide("data", { products, orderRows });
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

.main.mobile {
  padding: 10px;
}

.heading-box {
  display: flex;
  align-items: baseline;
  gap: 25px
}

.burger-btn {
  color: var(--color-controls-2);
}

.heading {
  margin: 0;
  padding: 0;
  font-size: 30px;
  line-height:  100%;
}

.box {
  width: 100%;
  padding: 19px 25px;
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
