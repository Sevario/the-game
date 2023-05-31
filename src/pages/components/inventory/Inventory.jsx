import React, { useEffect, useState, useRef, useContext } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrag, useDrop } from "react-dnd";
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

const DraggableItem = ({ item, id, index }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "item",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.1 : 1 }}>
      {item && <span>{item.name}</span>}
    </div>
  );
};

const DroppableInventorySpace = ({ children, index, moveItem }) => {
  const [, drop] = useDrop({
    accept: "item",
    drop: ({ index: dragIndex }) => moveItem(dragIndex, index),
  });

  return (
    <div
      ref={drop}
      className="col-auto border"
      style={{ width: "100%", maxWidth: "50px", height: "45px" }}
    >
      {children}
    </div>
  );
};

const Inventory = () => {
  const [inventory, setInventory] = useState(null);
  const [items, setItems] = useState(itemsArr);
  const [extraSpace, setExtraSpace] = useState(0);

  const [userId, setUserId] = useState(null);
  const ws = useContext(WebSocketContext);
  const { data: session } = useSession();

  const { data, invSpace, inventoryOrder, isLoading, error, refreshData } = getInventory(
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
      addItemToInventory(items[0]); // This adds an item from items array above and currently it's just static (currently it adds 5th el from array)
    }
  }, [invSpace]);
  
  const addItemToInventory = (item) => {
    // setItems((prevItems) => [item, ...prevItems]);
    console.log(item, 'the item')
    setInventory((prevInventory) => [item, ...prevInventory]);
  };

  const moveItem = async (dragIndex, hoverIndex) => {
    // Swap items
    const tempItems = [...items];
    const draggedItem = tempItems[dragIndex];
    tempItems.splice(dragIndex, 1);
    tempItems.splice(hoverIndex, 0, draggedItem);
    console.log(draggedItem, 'dragged item');
    console.log('Moving item from', dragIndex, 'to', hoverIndex);
    console.log('Items before move:', tempItems);

    setItems(tempItems);

    console.log(items, 'items right after setitems()');
    console.log('Items after move:', tempItems)


    const userId = "cle1u6wy00000z96c5ztdq08n";

    const response = await fetch(`https://sevario.xyz:6969/api/inventory/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: tempItems.map(item => item?.id) }),
    });

    if (!response.ok) {
      const data = await response.json();
      console.error(data.error);
    }
  };

  

  if (data && inventory) {
    return (
      <DndProvider backend={HTML5Backend}>
        <div className="text-center">Inventory space: {inventory.length}</div>
        <div className="grid max-w-xl grid-cols-6 md:grid-cols-12 lg:grid-cols-12">
          {inventory.map((invSlot, i) => (
            <DroppableInventorySpace key={i} index={i} moveItem={moveItem}>
              <DraggableItem
                item={invSlot}
                id={invSlot ? invSlot.id : null}
                index={i}
                // moveItem={moveItem}
              />
            </DroppableInventorySpace>
          ))}
        </div>
      </DndProvider>
    );
  }
};

export default Inventory;
