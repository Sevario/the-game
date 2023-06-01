import React, { useEffect, useState, useContext } from "react";
import Loader from "@components/elements/Loader";
import Item from "./Item";
import InventorySlot from "./InventorySlot";
import { DndContext } from "@dnd-kit/core";
import { getInventory } from "@hooks/useInventory";
import { useSession } from "next-auth/react";
import WebSocketContext from "@context/WebSocketContext";

const Inventory = () => {
  const [userId, setUserId] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [itemLocation, setItemLocation] = useState(0);

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
      <div className="text-center">Inventory space: {inventory.length}</div>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid max-w-xl grid-cols-6 md:grid-cols-12 lg:grid-cols-12">
          {inventory.map((invSlot, i) => (
            <InventorySlot id={i.toString()} key={i}>
              {itemLocation === i && <Item />}
            </InventorySlot>
          ))}
        </div>
      </DndContext>
    </>
  );
};

export default Inventory;
