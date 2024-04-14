<template>
  <div class="table-box">
    <div class="table-controls">
      <button class="save-btn">Сохранить изменения</button>
      <button class="settings-btn">
        <CogSVG />
      </button>
    </div>

    <table v-if="myColumns.length" class="table">
      <thead>
        <tr>
          <th v-for="col in myColumns" :key="col.accessorKey" class="th">
            {{ col.header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in tableContent"
          :key="row.id"
          class="tr"
          draggable="true"
          :class="draggedRow && row.id === draggedRow.id && 'dragged-row'"
          @dragstart="(event) => handleDragRow(row, event)"
          @dragenter.prevent="() => true"
          @dragover.prevent="() => handleDragRowOver(row)"
          @dragend="handleDragRowEnd"
          @drop="handleRowDrop"
        >
          <td
            v-for="col in myColumns"
            :key="`${col.accessorKey}-${row.id}`"
            class="td"
          >
            <component
              :is="col.cell"
              :row="row"
              @press-drag="() => (isDragButtonUsed = true)"
            ></component>
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
import { h, ref, inject } from "vue";
import CogSVG from "./SVG/CogSVG.vue";
import TableEditButton from "./TableEditButton.vue";
import TableDnDButton from "./TableDnDButton.vue";
import ProductItemSelect from "./ProductItemSelect.vue";
import PriceInput from "./PriceInput.vue";
import QtyInput from "./QtyInput.vue";
import TotalInput from "./TotalInput.vue";
import ProductSelect from "./ProductSelect.vue";

const props = defineProps({
  table: Array,
});

const { products, orderRows } = inject("data");

const tableContent = ref(props.table);

const isDragButtonUsed = ref(false);
const draggedRow = ref(null);
const targetRow = ref(null);

const myColumns = [
  {
    accessorKey: "index",
    header: "",
    cell: TableDnDButton,
  },
  {
    accessorKey: "edit",
    header: "",
    cell: TableEditButton,
  },
  {
    accessorKey: "itemName",
    header: "Наименование единицы",
    cell: ProductItemSelect,
  },
  {
    accessorKey: "price",
    header: "Цена",
    cell: PriceInput,
  },
  {
    accessorKey: "qty",
    header: "Кол-во",
    cell: QtyInput,
  },
  {
    accessorKey: "productName",
    header: "Название товара",
    cell: ProductSelect,
  },
  {
    accessorKey: "totalPrice",
    header: "Итого",
    cell: TotalInput,
  },
];

const handleDragRow = (row, event) => {
  if (!isDragButtonUsed.value) {
    event.preventDefault();
    return;
  }
  draggedRow.value = row;
  console.log(isDragButtonUsed.value);
  event.dataTransfer.effectAllowed = "move";
  console.log(`drag row #${row.id}`);
};

const handleDragRowEnd = () => {
  targetRow.value = null;
  draggedRow.value = null;
  isDragButtonUsed.value = false;
};

const handleDragRowOver = (row) => {
  if (row.id === draggedRow.value.id) {
    targetRow.value = null;
    return;
  }
  targetRow.value = row;

  const newTableContent = [...tableContent.value];
  const draggedIndex = newTableContent.indexOf(draggedRow.value);
  const targetIndex = newTableContent.indexOf(targetRow.value);

  [newTableContent[targetIndex], newTableContent[draggedIndex]] = [
    newTableContent[draggedIndex],
    newTableContent[targetIndex],
  ];
  tableContent.value = [...newTableContent];
};

const handleRowDrop = () => {
  tableContent.value.forEach((row, i) => row.index = i+1)

  targetRow.value = null;
  draggedRow.value = null;
  isDragButtonUsed.value = false;
};
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

.tr.dragged-row {
  border: dashed 2px var(--color-controls-2);
}

.tr.dragged-row * {
  /* visibility: hidden; */
  opacity: 0.5;
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
  color: var(--color-text-dim);
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