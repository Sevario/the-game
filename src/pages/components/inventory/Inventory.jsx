import React, { useEffect, useState, useContext } from "react";
import Loader from "@components/elements/Loader";
import Item from "@components/inventory/Item";
import InventorySlot from "./InventorySlot";
import { DndContext } from "@dnd-kit/core";
import { getInventory } from "@hooks/useInventory";
import { useSession } from "next-auth/react";
import WebSocketContext from "@context/WebSocketContext";

const Inventory = () => {
  const [userId, setUserId] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [itemLocation, setItemLocation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const ws = useContext(WebSocketContext);
  const { data: session } = useSession();
  const { data, invSpace, inventoryOrder, isLoading, error, refreshData } =
    getInventory(
      userId ? `https://sevario.xyz:6969/api/inventory/${userId}` : null,
      [userId, ws]
    );

  useEffect(() => {
    if (session?.user?.id) {
      setUserId(session?.user.id);
      setInventory(invSpace);
      console.log(invSpace, "invSPace");
    }
  }, [session, invSpace]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (
      over &&
      active.id &&
      active.data.current.supports.includes(over.data.current.type)
    ) {
      setItemLocation(parseInt(over.id));
    }
  };

  if (isLoading || !inventory) {
    return <Loader />;
  }

  return (
    <>
      <div className="text-center text-white">You currently have {inventory.length} inventory slots</div>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="my-10 flex justify-center">
          <div className="grid max-w-3xl grid-cols-6 gap-1 bg-gray-800 p-3 md:grid-cols-12 lg:grid-cols-12">
            {inventory.map((invSlot, i) => (
              <InventorySlot isDragging={isDragging} id={i.toString()} key={i}>
                {itemLocation === i && <Item setIsDragging={setIsDragging} />}
              </InventorySlot>
            ))}
          </div>
        </div>
      </DndContext>
    </>
  );
};

export default Inventory;
