import React from "react";
import { useDroppable } from "@dnd-kit/core";

const InventorySlot = ({ id, children }) => {
  const { setNodeRef } = useDroppable({
    id: id,
    data: {
        type: 'item'
    }
  });

  return <div ref={setNodeRef} style={{ border: '1px solid white', height: '50px' }}>{children}</div>;
};

export default InventorySlot;
