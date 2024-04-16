<template>
  <div class="table-box" @mouseup="stopResize">
    <div class="table-controls">
      <button class="save-btn">Сохранить изменения</button>
      <button class="settings-btn" @click="handleSettingsClick">
        <CogSVG />
      </button>
      <SettingsMenu v-bind="contMenuParams" @close-context-menu="handleOutsideClick"/>
    </div>

    <table v-if="visibleColumns.length" class="table">
      <thead>
        <tr>
          <th
            v-for="col in columns"
            v-show="col.show"
            ref="thRefs"
            :key="col.key"
            class="th"
            :class="isResizing && isResizing.i === col.i && 'th-resize'"
            :style="!!col.width && { width: col.width + 'px' }"
            :draggable="!isResizing"
            @dragstart="(event) => handleDragColStart(col, event)"
            @dragenter.prevent="() => handleDragColEnter(col)"
            @dragover.prevent
            @dragend="handleDragColEnd"
            @drop="handleColDrop"
            @mousemove="() => handleResize(col)"
          >
            {{ myColumns[col.i].header }}

            <div
              v-if="visibleColumns.indexOf(col) !== visibleColumns.length - 1"
              class="th-resizer"
              @mousedown="() => startResize(col)"
            ></div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in table"
          :key="row.id"
          class="tr"
          draggable="true"
          :class="draggedRow && row.id === draggedRow.id && 'dragged-row'"
          @dragstart="(event) => handleDragRowStart(row, event)"
          @dragenter.prevent="() => true"
          @dragover.prevent="() => handleDragRowOver(row)"
          @dragend="handleDragRowEnd"
          @drop="handleRowDrop"
        >
          <td
            v-for="col in visibleColumns"
            :key="`${col.id}-${row.id}`"
            class="td"
            :class="isResizing && isResizing.i === col.i && 'td-resize'"
          >
            <component
              :key="`cell-content-${col.id}-${row.id}`"
              :is="myColumns[col.i].cell"
              v-bind="myColumns[col.i].getCellProps(row)"
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

const { table ,columns, myColumns, visibleColumns } = inject('table')

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

const { contMenuParams,  handleOutsideClick, handleSettingsClick} = useSettingsMenu()

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
  table-layout: fixed;
  overflow-x: hidden;
}
.th {
  position: relative;
  min-height: 44px;
  padding: 14px 10px;
  font-family: var(--font-semibold);
  font-size: 16px;
  border: solid 1px var(--color-border-1);
  text-align: left;
  cursor: move;
  text-overflow: clip;
  white-space: nowrap;
  overflow: hidden;
}

.th-resize,
.td-resize {
  border-right: solid 1px var(--color-border-2);
}

.th-resizer {
  position: absolute;
  z-index: 10;
  right: 0;
  top: 0;
  bottom: 0;
  width: 10px;
  background-color: transparent;
  cursor: col-resize;
}

.tr {
  height: 45px;
}

.tr.dragged-row {
  border: dashed 2px var(--color-controls-2);
}

.tr.dragged-row * {
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
