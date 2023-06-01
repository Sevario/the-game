import React from "react";
import { useDroppable } from "@dnd-kit/core";

const InventorySlot = ({ id, children, isDragging }) => {
  const { setNodeRef } = useDroppable({
    id: id,
    data: {
        type: 'item'
    }
  });

  return <div className="shadow-lg rounded-md border border-gray-500 overflow-hidden" ref={setNodeRef} style={{ height: '60px', overflow: isDragging ? 'visible' : 'hidden' }}>{children}</div>;
};

export default InventorySlot;
