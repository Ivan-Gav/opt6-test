<template>
  <section v-if="visibleColumns.length" class="table">
    <div
      v-for="row in table"
      :key="row.id"
      class="tr"
      draggable="true"
      :class="{ draggedrow: draggedRow && row.id === draggedRow.id }"
      @dragstart="(event) => handleDragRowStart(row, event)"
      @dragenter.prevent="() => true"
      @dragover.prevent="() => handleDragRowOver(row)"
      @dragend="handleDragRowEnd"
      @drop="handleRowDrop"
    >
      <div
        v-for="col in visibleColumns"
        :key="`${col.id}-${row.id}`"
        class="td"
      >
        <p class="label">{{ myColumns[col.i].header }}</p>
        <component
          v-if="col.editable"
          :key="`cell-content-${col.id}-${row.id}`"
          :is="myColumns[col.i].cell"
          v-bind="myColumns[col.i].getCellProps(row)"
          v-model="row[col.key]"
        ></component>
        <component
          v-else
          :key="`cell-controls-${col.id}-${row.id}`"
          :is="myColumns[col.i].cell"
          v-bind="myColumns[col.i].getCellProps(row)"
          @press-drag="() => (isDragButtonUsed = true)"
        ></component>
      </div>
    </div>
  </section>

  <div>
    <div class="table-total-details">
      <div class="table-total-legend">Сумма:</div>
      <div class="table-total-value">{{ totalPrice }} руб</div>
      <div class="table-total-legend">Кол-во:</div>
      <div class="table-total-value">{{ totalQty }} шт</div>
      <div class="table-total-legend">Общий вес:</div>
      <div class="table-total-value">{{ totalWeight }} кг</div>
    </div>

    <div class="table-total-details">
      <div class="table-total-bottomline-legend">Общая сумма:</div>
      <div class="table-total-bottomline-value">{{ totalPrice }} руб</div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";
import CogSVG from "./SVG/CogSVG.vue";
import useDragAndDropRow from "../composables/useDragAndDropRow";
import useDragAndDropCol from "../composables/useDragAndDropCol";
import useResizeCol from "../composables/useResizeCol";
import useSettingsMenu from "../composables/useSettingsMenu";
import SettingsMenu from "./SettingsMenu.vue";

const props = defineProps({
  table: Array,
});

const {
  table,
  columns,
  myColumns,
  visibleColumns,
  totalPrice,
  totalQty,
  totalWeight,
} = inject("table");

const thRefs = ref([]);

const {
  handleDragRowStart,
  handleDragRowEnd,
  handleDragRowOver,
  handleRowDrop,
  draggedRow,
  isDragButtonUsed,
} = useDragAndDropRow(table);

const {
  handleDragColStart,
  handleDragColEnter,
  handleDragColEnd,
  handleColDrop,
} = useDragAndDropCol(columns);

const { startResize, handleResize, stopResize, isResizing } = useResizeCol(
  thRefs,
  visibleColumns
);

const { contMenuParams, handleOutsideClick, handleSettingsClick } =
  useSettingsMenu();

const handleDataSave = () => {
  // process saving data
  console.log("Оправка данных на сервер");
  console.log(table.value);
};
</script>

<style scoped>
.table {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow-x: hidden;
}

.tr {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 1px 5px 0 var(--color-shadow-1);
  border: solid 1px var(--color-border-1);
  background-color: white;
  padding: 12px 15px 25px;
}

.label {
  font-size: 10px;
  color: var(--color-text-dim);
  margin-bottom: 2px;
}

.tr.draggedrow {
  border: dashed 2px var(--color-controls-2);
}

.tr.draggedrow * {
  opacity: 0.5;
}

.td {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.table-total-details {
  width: 100%;
  display: grid;
  grid-template-columns: auto auto;
  row-gap: 12px;
  padding: 10px 15px 15px;
  border-radius: 5px;
  border: solid 1px var(--color-border-1);
  background-color: var(--color-bg-3);
  font-size: 16px;
  margin-bottom: 6px;
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
