import React from "react";
import Link from "next/link";
// import Inventory from "@components/Inventory/Inventory";

const NavCharacter = () => {
  return (
    <>
      <Link
        href={`/player/cropsychooo/inventory`}
        className="text-white no-underline transition hover:bg-white/20"
      >
        Inventory
      </Link>
    </>
  );
};

export default NavCharacter;
