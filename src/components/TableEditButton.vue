<template>
  <div class="box">
    <button @click="handleEditClick">
      <EllipsisSVG class="ellipsis"/>
    </button>
  </div>

  <CustomContextMenu
    @close-context-menu="handleOutsideClick"
    :show="contMenuParams.show"
    :x="contMenuParams.x"
    :y="contMenuParams.y"
  >
    <div class="edit-menu">
      <button class="del" @click="() => deleteRow(row)">Удалить столбец</button>
    </div>
  </CustomContextMenu>
</template>

<script setup>
import { reactive, inject } from "vue";
import EllipsisSVG from "./SVG/EllipsisSVG.vue";
import CustomContextMenu from "./UI/CustomContextMenu.vue";

defineProps({
  row: Object
})

const emit = defineEmits(['pressDrag']); // isn't used here, added to get rid of vue warning

const { deleteRow } = inject('table')

const contMenuParams = reactive({
  show: false,
  x: 0,
  y: 0,
});

const handleEditClick = (e) => {
  contMenuParams.x = e.clientX + 250;
  contMenuParams.y = e.clientY;
  contMenuParams.show = !contMenuParams.show;
}

const handleOutsideClick = () => {
  contMenuParams.show = false
}

</script>

<style scoped>
.box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.ellipsis {
  color: var(--color-controls-2);
}

.edit-menu {
  width: 100%;
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  box-shadow: var(--shadow-select);
  background-color: #fff;
}

.del {
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

.del:hover {
  background-color: var(--color-bg-5);
}

.del:active {
  color: red;
}
</style>
