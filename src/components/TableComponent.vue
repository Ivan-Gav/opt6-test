<template>
  <div class="table-box">
    <div class="table-controls">
      <button class="save-btn">Сохранить изменения</button>
      <button class="settings-btn">
        <CogSVG />
      </button>
    </div>
    
    <table class="table">
      <thead>
        <tr
          v-for="headerGroup in vueTable.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <th v-for="header in headerGroup.headers" :key="header.id" class="th">
            <FlexRender
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in vueTable.getRowModel().rows" :key="row.id" class="tr">
          <td v-for="cell in row.getVisibleCells()" :key="cell.id" class="td">
            <FlexRender
              :render="cell.column.columnDef.cell"
              :props="cell.getContext()"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <div class="table-total-details">
      <div class="table-total-legend">Сумма:</div>
      <div class="table-total-value">152 212 руб</div>
      <div class="table-total-legend">Кол-во:</div>
      <div class="table-total-value">42 шт</div>
      <div class="table-total-legend">Общий вес:</div>
      <div class="table-total-value">2 322 кг</div>
    </div>

    <div class="table-total-details">
      <div class="table-total-bottomline-legend">Общая сумма:</div>
      <div class="table-total-bottomline-value">152 212 руб</div>
    </div>
  </div>
</template>

<script setup>
import { computed, h, onMounted, ref, watch, inject } from "vue";
import { useVueTable, FlexRender, getCoreRowModel } from "@tanstack/vue-table";
import CogSVG from "./SVG/CogSVG.vue";
import TableEditButton from "./TableEditButton.vue";
import TableDnDButton from "./TableDnDButton.vue";
import TableInputNumber from "./TableInputNumber.vue";
import TableSelect from "./TableSelect.vue";

const props = defineProps({
  table: Array,
});

const tableContent = ref(props.table);

const { products, orderRows } = inject('data')

// const fields = computed(() =>
//   !!tableContent.value.length ? Object.keys(tableContent.value[0]) : []
// );

const myColumns = [
  {
    accessorKey: "index",
    header: "",
    cell: ({ row }) => h(TableDnDButton, { index: row.original.index }),
  },
  {
    accessorKey: "edit",
    header: "",
    cell: () => h(TableEditButton),
  },
  {
    accessorKey: "itemName",
    header: "Наименование единицы",
    cell: ({ row }) => {
      let options = []
      const product = products.value.find((p) => p.id === row.original.productID)
      if (product && 'items' in product) {
        options = [...product.items]
      } else {
        console.log(row.original.productID)
      }
      return h(TableSelect, { id: `item-${row.original.id}`, value: row.original.itemName, options: options })
    }
  },
  ,
  {
    accessorKey: "price",
    header: "Цена",
    cell: ({ row }) => h(TableInputNumber, { value: row.original.price, id: `price-${row.original.id}` }),
  },
  ,
  {
    accessorKey: "qty",
    header: "Кол-во",
    cell: ({ row }) => h(TableInputNumber, { value: row.original.qty, id: `qty-${row.original.id}` }),
  },
  ,
  {
    accessorKey: "productName",
    header: "Название товара",
    cell: ({ row }) => {
            return h(TableSelect, { id: `product-${row.original.id}`, value: row.original.productName, options: products.value })
    }
  },
  {
    accessorKey: "totalPrice",
    header: "Итого",
    cell: ({ row }) => h(TableInputNumber, { value: row.original.price * row.original.qty, id: `total-${row.original.id}` }),
  },
];

const vueTable = useVueTable({
  data: tableContent.value,
  columns: myColumns,
  getCoreRowModel: getCoreRowModel(),
});
</script>

<style scoped>
.table-box {
  width: 100%;
  border-radius: 10px;
  box-shadow: var(--shadow);
  border: solid 1px var(--color-border-1);
  background-color: white;
  padding-bottom: 25px;
}
.table-controls {
  min-height: 32px;
  padding-inline: 15px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  color: var(--color-controls-2);
}
.save-btn {
  width: max-content;
  font-size: 12px;
}

.table {
  width: 100%;
}
.th {
  min-height: 44px;
  padding: 10px;
  font-family: var(--font-semibold);
  font-size: 16px;
  border: solid 1px var(--color-border-1);
  text-align: left;
}
.tr {
  height: 45px;
}
.td {
  padding: 5px 10px;
}

.table-total-details {
  max-width: 304px;
  display: grid;
  grid-template-columns: auto auto;
  row-gap: 15px;
  padding: 15px;
  border-radius: 5px;
  border: solid 1px var(--color-border-1);
  background-color: var(--color-bg-3);
  font-size: 14px;
  margin: 5px 15px 0 auto;
}

.table-total-legend {
  color: var(--color-text-dim)
}

.table-total-value {
  justify-self: right;

}

.table-total-bottomline-value {
  justify-self: right;
  font-family: var(--font-semibold);
  font-weight: 600;
}

</style>

<!-- 
index: i,
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
-->
