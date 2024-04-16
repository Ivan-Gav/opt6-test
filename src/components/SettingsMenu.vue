<template>
  <CustomContextMenu v-bind="props" @close-context-menu="handleClose">
  
  <nav v-if="!show" class="settings-menu">
    <button @click="show = 'col_show'" class="menu-item arrow">
      <p>Отображение столбцов</p>
      <ChevronSVG />
    </button>
    <button @click="show = 'col_order'" class="menu-item arrow">
      <p>Порядок столбцов</p>
      <ChevronSVG />
    </button>
  </nav>

  <nav v-if="show === 'col_show'" class="settings-menu">
    <button @click="show = null" class="menu-item arrow active">
      <ChevronSVG :style="{ transform: 'rotate(180deg)' }" />
      <p>Отображение столбцов</p>
    </button>
    <label
      v-for="col in columns"
      class="menu-item checkbox"
      :for="`column-show-checkbox-${col.key}`"
    >
      <input
        type="checkbox"
        v-model="col.show"
        :id="`column-show-checkbox-${col.key}`"
      />
      <span>{{ col.name }}</span>
    </label>
  </nav>

  <nav v-if="show === 'col_order'" class="settings-menu">
    <button @click="show = null" class="menu-item arrow active">
      <ChevronSVG :style="{ transform: 'rotate(180deg)' }" />
      <p>Порядок столбцов</p>
    </button>
    <div v-for="(col, i) in visibleColumns" class="menu-item movable">
      <div class="move-btns">
        <button @click="() => handleUp(col, i)" :disabled="!i" class="up">
          ▲
        </button>

        <button
          @click="() => handleDown(col, i)"
          :disabled="i === visibleColumns.length - 1"
          class="down"
        >
          ▼
        </button>
      </div>

      <p>{{ col.name }}</p>
    </div>
  </nav>

</CustomContextMenu>
</template>

<script setup>
import { ref, computed, inject, reactive } from "vue";
import ChevronSVG from "./SVG/ChevronSVG.vue";
import CustomContextMenu from "./UI/CustomContextMenu.vue";

const props = defineProps({
  show: Boolean,
  x: Number,
  y: Number,
})

const emit = defineEmits(['closeContextMenu'])

const { columns, visibleColumns } = inject("table");

const show = ref(null);

const handleUp = (col, i) => {
  const thisI = columns.value.indexOf(col);
  const prevI = columns.value.indexOf(visibleColumns.value[i-1]);
  [columns.value[thisI], columns.value[prevI]] = [
    columns.value[prevI],
    columns.value[thisI],
  ];
};

const handleDown = (col, i) => {
  const thisI = columns.value.indexOf(col);
  const nextI = columns.value.indexOf(visibleColumns.value[i+1]);
  
  [columns.value[thisI], columns.value[nextI]] = [
    columns.value[nextI],
    columns.value[thisI],
  ];
};

const handleClose = () => {
  show.value = null 
  emit('closeContextMenu')
}
</script>

<style scoped>
.settings-menu {
  width: 100%;
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  box-shadow: var(--shadow-select);
  background-color: #fff;
  color: var(--color-main);
}

.menu-item {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 7px;
  padding: 7px 10px;
  font-size: 14px;
  cursor: pointer;
  background-color: transparent;
  transition: background-color 0.3s ease-in;
  text-overflow: clip;
  white-space: nowrap;
  overflow: hidden;
}

.menu-item.arrow {
  justify-content: space-between;
}

.active {
  font-family: var(--font-semibold);
}

.movable {
  cursor: unset;
}

.menu-item:hover {
  background-color: var(--color-bg-5);
}

.menu-item:active {
  opacity: 0.7;
}

.move-btns {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2px;
}

.up,
.down {
  line-height: 8px;
  font-size: 10px;
  cursor: pointer;
}

.up:hover,
.down:hover {
  color: red;
}

.up:disabled,
.down:disabled {
  color: var(--color-controls-4);
  pointer-events: none;
}
</style>
