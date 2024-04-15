import { ref } from "vue";

export default function useDragAndDropCol(columns) {
  const draggedCol = ref(null);
  const targetCol = ref(null);

  const handleDragColStart = (col, event) => {
    draggedCol.value = col;
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDragColEnter = (col) => {
    if (targetCol.value && targetCol.value.key === col.key) {
      return;
    }

    targetCol.value = col;
    if (!draggedCol.value || draggedCol.value.key === targetCol.value.key) {
      targetCol.value = null;
      return;
    }

    const dI = columns.value.indexOf(draggedCol.value);
    const tI = columns.value.indexOf(targetCol.value);

    const newColumns = [...columns.value];

    [newColumns[dI], newColumns[tI]] = [newColumns[tI], newColumns[dI]];

    columns.value = [...newColumns];
  };

  const handleDragColEnd = () => {
    draggedCol.value = null;
    targetCol.value = null;
  };

  const handleColDrop = () => {
    draggedCol.value = null;
    targetCol.value = null;
  };

  return { handleDragColStart, handleDragColEnter, handleDragColEnd, handleColDrop }
}
