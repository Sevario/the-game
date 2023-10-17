import React from "react";
import NavSkill from "@sidebar/Nav/NavSkill";
import NavCharacter from "./NavCharacter";

const MainNav = () => {
  return (
    <div className="flex flex-col gap-4">
      <NavSkill />
      <NavCharacter />
    </div>
  );
};

export default MainNav;
