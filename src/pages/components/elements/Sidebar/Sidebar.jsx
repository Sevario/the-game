import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link.js";
import Menu from "./Nav/MainNav.jsx";
const gameName = "The Game";
import useWebSocket from '../../../hooks/useSkills.jsx';

const AuthShowcase = () => {
  
  const { data: sessionData } = useSession();

  return (
    <>
      <div className="flex flex-row items-center justify-center gap-4 p-2">
        <p className="text-center text-2xl text-white">
          {sessionData && <span>{sessionData.user?.name}</span>}
        </p>
        <button
          className="text-white no-underline transition hover:bg-white/20"
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "(Sign out)" : "Sign in"}
        </button>
      </div>
      <Menu />
    </>
  );
};

const Sidebar = () => {
  return (
    <aside className="fixed mx-3 h-screen w-64 p-4 rounded-xl border-slate-700 bg-slate-800">
      <Link href="/">
      <h1 className="border-b border-slate-700 p-3 text-center text-2xl font-bold text-black">
        {gameName}
      </h1>
      </Link>
      {/* {hello.data ? hello.data.greeting : "Loading tRPC query..."} */}
      <AuthShowcase />
    </aside>
  );
};

export default Sidebar;
