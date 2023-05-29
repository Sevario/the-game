import React, { useEffect, useState, useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrag, useDrop } from "react-dnd";

const items = [
  {
    id: 1,
    name: "Sword",
    description: "A sharp, durable sword.",
    image: "https://via.placeholder.com/25",
  },
  {
    id: 2,
    name: "Shield",
    description: "A sturdy shield.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 3,
    name: "Potion",
    description: "A healing potion that restores health.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 4,
    name: "Bow",
    description: "A ranged weapon used for shooting arrows.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 5,
    name: "Arrow",
    description: "A projectile used with a bow.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 6,
    name: "Staff",
    description: "A magical staff for casting spells.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 7,
    name: "Robe",
    description: "A lightweight robe for spellcasters.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 8,
    name: "Helmet",
    description: "A protective headgear.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 9,
    name: "Gauntlets",
    description: "Armored gloves for hand protection.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 10,
    name: "Boots",
    description: "Footwear for improved mobility.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 11,
    name: "Dagger",
    description: "A small, sharp blade for close combat.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 12,
    name: "Hammer",
    description: "A heavy weapon used for crushing opponents.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 13,
    name: "Axe",
    description: "A chopping tool with a sharp blade.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 14,
    name: "Lance",
    description: "A long, pointed weapon used by cavalry.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 15,
    name: "Spear",
    description: "A pole weapon with a pointed blade.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 16,
    name: "Mace",
    description: "A club-like weapon with a spiked head.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 17,
    name: "Gloves",
    description: "Hand coverings for protection and dexterity.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 18,
    name: "Chestplate",
    description: "A heavy, armored chestpiece.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 19,
    name: "Leggings",
    description: "Protective armor for the legs.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 20,
    name: "Ring",
    description: "A piece of jewelry worn on fingers.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 21,
    name: "Amulet",
    description: "A magical pendant worn around the neck.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 22,
    name: "Wand",
    description: "A handheld magical device for casting spells.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 23,
    name: "Grimoire",
    description: "A book of spells and magical knowledge.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 24,
    name: "Quiver",
    description: "A container for holding arrows.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 25,
    name: "Helmet",
    description: "A headgear that offers protection and visibility.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 26,
    name: "Cape",
    description: "A flowing garment worn on the back.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 27,
    name: "Orb",
    description: "A magical sphere used for casting spells.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 28,
    name: "Scroll",
    description: "A rolled-up parchment with written spells.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 29,
    name: "Tome",
    description: "A large, ancient book of knowledge.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 30,
    name: "Pendant",
    description: "A decorative piece of jewelry worn around the neck.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 31,
    name: "Bracelet",
    description: "An accessory worn on the wrist.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 32,
    name: "Elixir",
    description: "A magical liquid with various effects.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 33,
    name: "Gloves",
    description: "Hand coverings for protection and warmth.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 34,
    name: "Cloak",
    description: "A loose outer garment worn for warmth or concealment.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 35,
    name: "Tunic",
    description: "A simple, lightweight garment worn on the torso.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 36,
    name: "Bracers",
    description: "Protective armguards.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 37,
    name: "Belt",
    description: "A strap worn around the waist for support or carrying items.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 38,
    name: "Goggles",
    description: "Protective eyewear for various purposes.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 39,
    name: "Boomerang",
    description: "A curved throwing weapon that returns to the thrower.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 40,
    name: "Throwing knives",
    description: "Small knives designed for throwing.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 41,
    name: "Net",
    description: "A meshed tool used for trapping or capturing.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 42,
    name: "Shuriken",
    description: "Small, star-shaped throwing weapons.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 43,
    name: "Flail",
    description: "A spiked weapon attached to a chain or rope.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 44,
    name: "Glaive",
    description: "A polearm with a curved blade on the end.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 45,
    name: "Buckler",
    description: "A small shield held in one hand.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 46,
    name: "Throwing axe",
    description: "An axe designed for throwing.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 47,
    name: "Trident",
    description: "A three-pronged spear used for fishing or combat.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 48,
    name: "Crossbow",
    description: "A weapon similar to a bow but with a mechanical mechanism.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 49,
    name: "Bolas",
    description:
      "A throwing weapon with weights on the ends of interconnected cords.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 50,
    name: "Grappling hook",
    description: "A device with hooks used for climbing or catching objects.",
    image: "https://via.placeholder.com/50",
  },
];

const DraggableItem = ({ item, id, index, moveItem }) => {
    const [{ isDragging }, drag] = useDrag({
        type: "item",
        item: { id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div
            ref={drag}
            style={{ opacity: isDragging ? 0.1 : 1 }}
        >
            {item && <img src={item.image} alt={item.name} />}
        </div>
    );
};

const DroppableInventorySpace = ({ children, index, moveItem }) => {
    const [, drop] = useDrop({
        accept: 'item',
        drop: ({ index: dragIndex }) => moveItem(dragIndex, index),
    });

    return (
        <div
            ref={drop}
            className="col-auto border"
            style={{ width: '100%', maxWidth: '50px', height: '45px' }}
        >
            {children}
        </div>
    );
};

const Inventory = () => {
  let initialInventorySize = 24;
  const [inventory, setInventory] = useState(
    Array(initialInventorySize).fill("")
  );
  const [extraSpace, setExtraSpace] = useState(0);

  const satchel = 2;
  const pouch = 6;
  const backpack = 10;
  const largeBackpack = 16;
  const travelersKit = 24;

  const addItemToInventory = (item) => {
    setInventory((prevInventory) => [item, ...prevInventory.slice(1)]);
  };

  useEffect(() => {
    setExtraSpace(largeBackpack);
    addItemToInventory(items[5]); // This adds an item from items array above and currently it's just static (currently it adds 5th el from array)
  }, []);

  useEffect(() => {
    setInventory((currentState) => [
      ...currentState,
      ...Array(extraSpace).fill(""),
    ]);
  }, [extraSpace]);

  const moveItem = (fromIndex, toIndex) => {
    setInventory((prevInventory) => {
      const newInventory = [...prevInventory];
      const item = newInventory[fromIndex];
      newInventory.splice(fromIndex, 1);
      newInventory.splice(toIndex, 0, item);
      return newInventory;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="text-center">Inventory space: {inventory.length}</div>
      <div className="grid max-w-xl grid-cols-6 md:grid-cols-12 lg:grid-cols-12">
        {inventory.map((invSpace, i) => (
          <DroppableInventorySpace key={i} index={i} moveItem={moveItem}>
            <DraggableItem item={invSpace} id={invSpace ? invSpace.id : null} index={i} moveItem={moveItem} />
          </DroppableInventorySpace>
        ))}
      </div>
      {/* ... */}
    </DndProvider>
  );
};

export default Inventory;