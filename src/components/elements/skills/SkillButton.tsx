import React, { useState, useEffect } from "react";
import { useTask } from "@context/Tasks/TaskContext";
import useWebSocket from "@hooks/useSkills";
import { useSession } from "next-auth/react";

interface SkillButtonProps {
  Name: string;
  profession: string;
  XP: number;
  Time: number;
  Icon: string;
  Level: number;
  currentLvl: number;
}

const SkillButton: React.FC<SkillButtonProps> = ({
  Name,
  profession,
  XP,
  Time,
  Icon,
  Level,
  currentLvl,
}) => {
  const { activeTask, startTask, stopTask } = useTask();
  const [userId, setUserId] = useState('');
  const [ws, connected] = useWebSocket();

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      setUserId(session.user.id);
    }
  }, [])

  const handleButtonClick = () => {
    if (activeTask && activeTask.name === Name) {
      stopTask();
    } else {
      startTask({ name: Name, profession: profession, xp: XP, time: Time });
      const taskData = {
        name: Name,
        profession: profession,
        xp: XP,
        time: Time,
        level: Level,
      };
      // startTaskServer(taskData);
  
      // Send a message to the server to start the task using WebSocket
      if (ws instanceof WebSocket && connected) {
        ws.send(
          JSON.stringify({
            type: 'taskStart',
            userId: userId,
            task: taskData,
          })
        );
      }
    }
  };

  return (
    <button
      onClick={handleButtonClick}
      className={`rounded p-5 text-gray-300 shadow-sm transition bg-gray-800 hover:bg-gray-900 ${currentLvl < Level ? "bg-opacity-60 hover:bg-gray-800" : ""}`}
      disabled={currentLvl < Level}
    >
      {Icon}
      <h3 className="text-lg">{Name} ({Level})</h3>
      <p className={`mb-1 rounded p-2 bg-gray-900 ${currentLvl < Level ? " bg-opacity-60" : ""}`}>
        Experience gain: <br />
        <strong>{XP}</strong>xp
      </p>
      <p className={`mb-1 rounded p-2 bg-gray-900 ${currentLvl < Level ? " bg-opacity-60" : ""}`}>
        Time consuming: <br />
        <strong>{Time}</strong>s
      </p>
    </button>
  );
};

export default SkillButton;
