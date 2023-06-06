import React from "react";
import { useDroppable } from "@dnd-kit/core";

const InventorySlot = ({ id, children, isDragging }) => {
  const { setNodeRef } = useDroppable({
    id: id,
    data: {
      type: "item",
    },
  });

  return (
    <div
      className="overflow-visible w-14 rounded-md border border-gray-500 shadow-lg"
      ref={setNodeRef}
      style={{ height: "60px"}}
    >
      {children}
    </div>
  );
};

export default React.memo(InventorySlot);
