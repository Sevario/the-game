import React, { useEffect, useState, useRef, useContext } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDroppable, useDraggable } from "@dnd-kit/core";
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

function Slot(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
    data: {
      index: props.index,
    }
  });
  const style = {
    opacity: isOver ? 1 : 0.5,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}

function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
  };

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
}

const Inventory = () => {
  const [inventory, setInventory] = useState(null);
  const [items, setItems] = useState(itemsArr);
  const [parent, setParent] = useState(null);
  const [extraSpace, setExtraSpace] = useState(0);

  const [userId, setUserId] = useState(null);
  const ws = useContext(WebSocketContext);
  const { data: session } = useSession();

  const draggable = <Draggable id="draggable">Item</Draggable>;

  const { data, invSpace, inventoryOrder, isLoading, error, refreshData } =
    getInventory(
      userId ? `https://sevario.xyz:6969/api/inventory/${userId}` : null,
      [userId, ws]
    );

  // useEffect(() => {
  //   if (inventoryOrder) {
  //     const orderedItems = inventoryOrder.map((itemId) =>
  //     itemsArr.find((item) => item.id === itemId)
  //     );
  //     setItems(orderedItems);
  //   }
  // }, [inventoryOrder]);

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
      // addItemToInventory(items[0]); // This adds an item from items array above and currently it's just static (currently it adds 5th el from array)
    }
  }, [invSpace]);

  // const addItemToInventory = (item) => {
  //   // setItems((prevItems) => [item, ...prevItems]);
  //   console.log(item, "the item");
  //   setInventory((prevInventory) => [item, ...prevInventory]);
  // };


  if (data && inventory) {
    return (
      <>
        <div className="text-center">Inventory space: {inventory.length}</div>
        <DndContext onDragEnd={handleDragEnd}>
          <div className="grid max-w-xl grid-cols-6 md:grid-cols-12 lg:grid-cols-12">
            {inventory.map((invSlot, i) => (
              // <div>slot</div>
              <Slot id={invSlot}>
                  test
              </Slot>
            ))}
          </div>
          {!parent ? draggable : null}
        </DndContext>
      </>
    );

    function handleDragEnd({ over }) {
      setParent(over ? over.id : null);
    }
  }
};

export default Inventory;
