import React, { useEffect, useState, useContext } from "react";
import Loader from "@components/elements/Loader";
import Item from "@components/inventory/Item";
import InventorySlot from "./InventorySlot";
import { DndContext } from "@dnd-kit/core";
import { getInventory, getItems } from "@hooks/useInventory";
import { useSession } from "next-auth/react";
import WebSocketContext from "@context/WebSocketContext";

const Inventory = () => {
  const [userId, setUserId] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [items, setItems] = useState([]);
  const [itemLocation, setItemLocation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [baseItems, setBaseItems] = useState([]);


  const ws = useContext(WebSocketContext);
  const { data: session } = useSession();
  const { data, invSpace, inventoryOrder, isLoading, error, refreshData } =
    getInventory(
      userId ? `https://sevario.xyz:6969/api/inventory/${userId}` : null,
      [userId, ws]
    );
  const { itemsData, itemsLoading, itemsError, refreshItemsData } = getItems(
    `https://sevario.xyz:6969/api/base_items_m/1`,
  );

  const updateInventoryOnServer = async (userId, inventory) => {
    const url = `https://sevario.xyz:6969/api/inventory/${userId}`;
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inventory: inventory }),
    };

    console.log(inventory, "on update inventory");

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  };

  useEffect(() => {
    if (session.user.id) {
      setUserId(session.user.id);
      setInventory(invSpace);
      // console.log(invSpace, 'invSpace');
      // console.log(itemsData, "itemsData");
    }
    // if (itemsData && itemsData.result) {
    //   setItems(itemsData.result);
    //   console.log(itemsData.result[0])
    // }
  }, [session, invSpace]);

  useEffect(() => {
    if (invSpace && items && items.length > 0) {
      const newInventory = [...invSpace];
      newInventory[0] = items[0];
      setInventory(newInventory);
    }
  }, [invSpace, items, itemsData]);

  const giveItem = () => {
    if (itemsData && itemsData.result) {
      setItems(itemsData.result);
      // console.log(itemsData.result[0])
    }
  }
  useEffect(() => {
    if (inventory) {
      const ids = inventory.filter(invSlot => invSlot !== null).map(invSlot => invSlot.id).join(',');
      if (ids.length > 0) {
        fetch(`https://sevario.xyz:6969/api/base_items_m/${ids}`)
          .then(response => response.json())
          .then(data => {
            const itemsById = data.results.reduce((acc, item) => {
              acc[item.id] = item;
              return acc;
            }, {});

            const newInventory = inventory.map(invSlot => invSlot === null ? null : { ...invSlot, data: itemsById[invSlot.id] });
            setBaseItems(newInventory);
          })
          .catch(error => console.error(error));
      }
    }
  }, [inventory]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    const oldIndex = parseInt(active.id.split("-")[1]);
    let newIndex = oldIndex; // If over is null, item goes back to its original place

    // Check if the item was dropped on a valid target
    if (over) {
      newIndex = parseInt(over.id.split("-")[1]);
    }

    if (oldIndex !== newIndex) {
      // Only do the rearranging if the indices are different
      const newInventory = [...inventory];
      const [removedItem] = newInventory.splice(oldIndex, 1);
      newInventory.splice(newIndex, 0, removedItem);

      console.log('mofev From:', oldIndex, 'moved to:', newIndex)

      // Update the local state
      setInventory(newInventory);

      // Send the updated inventory to the server
      updateInventoryOnServer(userId, newInventory)
        .then(() => {
          console.log("Inventory updated on server");
        })
        .catch((error) => {
          console.error("Failed to update inventory on server:", error);
          // If the server update fails, revert the change in local state
          setInventory(inventory);
        });
    }
  };

  if (isLoading || !inventory || !itemsData) {
    return <Loader />;
  }

  return (
    <>
      <div className="text-center text-white">
        You currently have {inventory.length} inventory slots
      </div>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="my-10 flex justify-center flex-col items-center">
          <div className="grid max-w-5xl grid-cols-6 gap-1 bg-gray-800 p-3 md:grid-cols-8 lg:grid-cols-12">
            {/* {inventory.map((invSlot, i) => (
              <InventorySlot isDragging={isDragging} id={i.toString()} key={i}>
                {invSlot && <Item data={invSlot} setIsDragging={setIsDragging} />}
              </InventorySlot>
            ))} */}
            {baseItems.map((invSlot, i) => (
              <InventorySlot isDragging={isDragging} id={`slot-${i}`} key={i}>
                {invSlot && invSlot.data && (
                  <Item
                    id={`item-${i}`}
                    data={invSlot.data}
                    setIsDragging={setIsDragging}
                  />
                )}
              </InventorySlot>
            ))}

          </div>
          <button onClick={() => giveItem()}>Give item!</button>
        </div>
      </DndContext>
    </>
  );
};

export default Inventory;
