import React, { useEffect, useState, useRef, useContext } from "react";
import { useDroppable } from "@dnd-kit/core";
import Item from "./Item";
import InventorySlot from "./InventorySlot";
import { CSS } from "@dnd-kit/utilities";
import { DndContext } from "@dnd-kit/core";
import { getInventory } from "@hooks/useInventory";
import { useSession } from "next-auth/react";
import WebSocketContext from "@context/WebSocketContext";

const itemsArr = [
  {
    id: 0,
    name: "Sword",
    description: "A sharp, durable sword.",
    image: "https://via.placeholder.com/25",
  },
  {
    id: 1,
    name: "Shield",
    description: "A sturdy shield.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    name: "Potion",
    description: "A healing potion that restores health.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 3,
    name: "Bow",
    description: "A ranged weapon used for shooting arrows.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 4,
    name: "Arrow",
    description: "A projectile used with a bow.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 5,
    name: "Staff",
    description: "A magical staff for casting spells.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 6,
    name: "Robe",
    description: "A lightweight robe for spellcasters.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 7,
    name: "Helmet",
    description: "A protective headgear.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 8,
    name: "Gauntlets",
    description: "Armored gloves for hand protection.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 9,
    name: "Boots",
    description: "Footwear for improved mobility.",
    image: "https://via.placeholder.com/50",
  },
];

const Inventory = () => {
  const [inventory, setInventory] = useState(null);
  const [itemLocation, setItemLocation] = useState(0);
  const [extraSpace, setExtraSpace] = useState(0);

  const [userId, setUserId] = useState(null);
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
    }
  }, [session]);

  useEffect(() => {
    if (invSpace) {
      const parsedString = eval(invSpace);
      console.log(parsedString);
      setInventory(parsedString);
    }
  }, [invSpace]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (
      over &&
      active.id &&
      active.data.current.supports.includes(over.data.current.type)
    ) {
      console.log(active);
      setItemLocation(parseInt(over.id));
    }
  };

  if (data && inventory) {
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
  }
};

export default Inventory;
