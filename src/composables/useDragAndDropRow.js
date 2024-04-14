import { ref } from "vue";

export default function useDragAndDropRow(tableContent) {
  const isDragButtonUsed = ref(false);
  const draggedRow = ref(null);
  const targetRow = ref(null);

  const handleDragRowStart = (row, event) => {
    if (!isDragButtonUsed.value) {
      event.preventDefault();
      return;
    }
    draggedRow.value = row;
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDragRowEnd = () => {
    targetRow.value = null;
    draggedRow.value = null;
    isDragButtonUsed.value = false;
  };

  const handleDragRowOver = (row) => {
    if (!draggedRow.value || row.id === draggedRow.value.id || (targetRow.value && targetRow.value.id === row.id )) {
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
    if (!draggedRow.value) {
      return
    }
    tableContent.value.forEach((row, i) => (row.index = i + 1));

    targetRow.value = null;
    draggedRow.value = null;
    isDragButtonUsed.value = false;
  };

  return {
    handleDragRowStart,
    handleDragRowEnd,
    handleDragRowOver,
    handleRowDrop,
    draggedRow,
    isDragButtonUsed
  };
}
