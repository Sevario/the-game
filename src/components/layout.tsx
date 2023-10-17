import { useEffect, useState } from "react";
import Sidebar from "@sidebar/Sidebar";
import Topbar from "@components/elements/Topbar/Topbar";
import { TaskProvider } from "@context/Tasks/TaskContext";
import TaskProgress from "./Tasks/TaskProgress";
import WebSocketContext from "@context/WebSocketContext";
import useWebSocket from "@hooks/useSkills";
import { signIn, useSession } from "next-auth/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: sessionData } = useSession();
  const [userId, setUserId] = useState(null);

  const ws = useWebSocket();

  useEffect(() => {
    if (sessionData?.user?.id) {
      setUserId(sessionData.user.id);
    }
  }, [sessionData]);

  if (!sessionData) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-r from-gray-900 to-transparent backdrop-blur-sm backdrop-filter">
        <div className="mb-20 text-center">
          <h3 className="text-lg text-white">Welcome to</h3>
          <h1 className="text-5xl font-extrabold text-white md:text-6xl lg:text-7xl">
            The game
          </h1>
        </div>
        <div className="max-w-2xl px-4 text-center">
          <p className="font-small text-lg leading-relaxed text-white">
            Welcome to "Realm of Possibilities"! Dive into a digital playground
            teeming with colorful characters, brawny battles, and lighthearted
            lunacy! Sharpen your skills, hoard rare items, and hilariously whack
            your friends or lend them a helping hand. Nibble on the peaceful
            life, honing your vocation, be it farming, fishing, or the delicate
            art of woodcutting. Revel in the ever-evolving economy, a whirlpool
            of riches that only the wisest can master! Will you be a hero, a
            villain, or a cucumber farmer extraordinaire? Every epic tale needs
            a hero; how do you want your wild and whimsical journey to unfold?
            Let's roll!
          </p>
        </div>
        <button
          className="mt-12 rounded-lg bg-white bg-gradient-to-r from-green-900 to-green-800 py-4 px-10 text-lg font-semibold text-white shadow-lg transition duration-300 ease-in-out hover:shadow-2xl"
          onClick={() => void signIn()}
        >
          Start your journey
        </button>
      </div>
    );
  }

  return (
    <WebSocketContext.Provider value={ws}>
      <TaskProvider>
        <div className="app_wrapper pb-4">
          <Topbar />
          <Sidebar />
          <main className="main mr-2 rounded-xl bg-gray-800 p-2">
            {children}
          </main>
        </div>
        <TaskProgress />
      </TaskProvider>
    </WebSocketContext.Provider>
  );
};

export default Layout;
