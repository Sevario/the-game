import React, { useEffect, useState } from "react";
import { useTask } from "@context/Tasks/TaskContext";
import useWebSocket from "@hooks/useSkills";

const TaskProgress = () => {
  const { activeTask, progress, setProgress, stopTask } = useTask();
  const [intervalId, setIntervalId] = useState(null);
  const [progressIntervalId, setProgressIntervalId] = useState(null);
  const ws = useWebSocket();

  useEffect(() => {
    if (activeTask) {
      if (intervalId) {
        clearInterval(intervalId);
      }
      const id = setInterval(() => {
        console.log(`Gained ${activeTask.xp} XP in ${activeTask.profession}`);
        setProgress(0);
      }, activeTask.time * 1000);
      setIntervalId(id);

      if (progressIntervalId) {
        clearInterval(progressIntervalId);
      }
      const progressId = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            return 0;
          }
          return prevProgress + 100 / (activeTask.time * 64);
        });
      }, 1);
      setProgressIntervalId(progressId);
    } else {
      clearInterval(intervalId);
      clearInterval(progressIntervalId);
      setIntervalId(null);
      setProgressIntervalId(null);
    }

    return () => {
      clearInterval(intervalId);
      clearInterval(progressIntervalId);
    };
  }, [activeTask]);

//   const handleStopTaskButton = () => {
//     stopTask();
//   };

  
  const handleStopTaskButton = async () => {
    try {
      const response = await fetch('https://sevario.xyz:6969/api/task/stop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: 'cle1u6wy00000z96c5ztdq08n' }),
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error('Error stopping task:', err);
    }
    stopTask();
  };

  if (!activeTask) {
    return null;
  }

  return (
    <div className="fixed top-0 left-1/2 z-50 w-1/4 -translate-x-1/2 transform rounded-md bg-gray-800 p-2 flex flex-col">
      <p className="text-center mb-4">{activeTask.name}</p>
      {/* {console.log(activeTask)} */}
      <progress value={progress} max="100" className="w-full"/>
      <button
        className="mt-2 rounded bg-red-500 px-4 py-1 text-white m-"
        onClick={handleStopTaskButton}
      >
        Stop Task
      </button>
    </div>
  );
};

export default TaskProgress;
