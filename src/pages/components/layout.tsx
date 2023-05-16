import { useEffect, useState } from "react";
import Sidebar from "@sidebar/Sidebar";
import Topbar from "@components/elements/Topbar/Topbar";
import { TaskProvider } from "@context/Tasks/TaskContext";
import TaskProgress from "./Tasks/TaskProgress";
import WebSocketContext from '@context/WebSocketContext';
import useWebSocket from '@hooks/useSkills';
import { useSession } from "next-auth/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const [userId, setUserId] = useState(null);
  const [ws, connected, sendUserId] = useWebSocket();

  useEffect(() => {
    if (session?.user?.id) {
      setUserId(session.user.id);
    }
  }, [session]);

  useEffect(() => {
    if (userId) {
      sendUserId(userId);
    }
  }, [userId]);

  console.log(userId);
  return (
    <WebSocketContext.Provider value={ws}>
      <TaskProvider>
        <div className="app_wrapper pb-4">
          <Topbar />
          <Sidebar />
          <main className="main bg-gray-800 p-2 rounded-xl mr-2">{children}</main>
        </div>
        <TaskProgress />
      </TaskProvider>
    </WebSocketContext.Provider>
  );
};

export default Layout;
