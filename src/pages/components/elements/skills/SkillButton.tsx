import React from "react";

const SkillButton = ({ Name, XP, Time, Icon}: { Name: string, XP: number, Time: number, Icon: string }) => {
  return (
    <div className="rounded-lg bg-blue-700 p-4 py-2 mb-2 max-w-sm max-h-64 w-full h-full cursor-pointer">
    <p className="text-center text-2xl text-white">{Icon}</p>
      <p className="text-center text-2xl text-white">{Name}</p>
      <p className="text-center text-2xl text-white">{XP}</p>
      <p className="text-center text-2xl text-white">{Time}s</p>
    </div>
  );
};

export default SkillButton;