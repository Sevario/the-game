import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link.js";
import Menu from "@sidebar/Nav/MainNav";
const gameName = "The Game";

const Sidebar = (layout: object) => {
  return (
    <aside className="sidebar mx-3 p-4 rounded-xl border-slate-700 bg-slate-800">
      <Link href="/">
      <h1 className="border-b border-slate-700 p-3 text-center text-2xl font-bold text-black">
        {gameName}
      </h1>
      </Link>
      {/* {hello.data ? hello.data.greeting : "Loading tRPC query..."} */}
      <Menu />
    </aside>
  );
};

export default Sidebar;
