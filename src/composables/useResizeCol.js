import { ref } from "vue";
import { useMouse, useElementBounding } from "@vueuse/core";

const MIN_WIDTH = 70;

export default function useResizeCol(thRefs, columns) {
  const isResizing = ref(null);

  const i = ref(null);

  const { x } = useMouse();

  const startResize = (col) => {
    isResizing.value = col;
  };

  const handleResize = () => {
    if (!isResizing.value) {
      return;
    }

    const { left } = useElementBounding(thRefs.value[isResizing.value.i]);
    const col = columns.value.find(
      (column) => column.key === isResizing.value.key
    );
    if (col.editable) {
      col.width = x.value - left.value < MIN_WIDTH ? MIN_WIDTH : x.value - left.value;
    }
  };

  const stopResize = () => {
    isResizing.value = null;
  };

  return { startResize, handleResize, stopResize, isResizing };
}
