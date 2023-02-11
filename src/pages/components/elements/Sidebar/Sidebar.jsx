import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const AuthShowcase = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-row items-center justify-center gap-4 ">
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
  );
};

const Sidebar = () => {
  return (
    <aside className="h-screen w-64 border-r-2 border-slate-800">
      <h1 className="border-b-2 border-slate-800 p-3 text-center text-2xl font-bold text-white">
        Test
      </h1>
      {/* {hello.data ? hello.data.greeting : "Loading tRPC query..."} */}
      <AuthShowcase />
    </aside>
  );
};

export default Sidebar;
