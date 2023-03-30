import React, { useEffect, useRef, useState } from "react";
import { useSession } from 'next-auth/react';
import { stringify } from "querystring";

const Woodcutting = () => {
  const [ws, setWs] = useState(null);
  const [skillData, setSkillData] = useState(null);
  const skillName = 'woodcutting';
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    console.log('Current session:', session);
  }, [session]);

  const handleConnect = () => {
    const websocketUrl = "wss://sevario.xyz:8443";
    const newWs = new WebSocket(websocketUrl);

    newWs.addEventListener("open", () => {
      console.log("Connected to the server");
    });

    newWs.addEventListener("message", (event) => {
      console.log(`Received message: ${event.data}`);
    });

    newWs.addEventListener("close", () => {
      console.log("Disconnected from the server");
    });

    newWs.addEventListener("error", (event) => {
      console.error("WebSocket error:", event);
    });

    setWs(newWs);
  };
  const handleDisconnect = () => {
    if (ws) {
      ws.close();
      setWs(null);
    }
  };

  const handleSendMessage = () => {
    if (ws) {
      ws.send( JSON.stringify({
        "type": "skill",
      })
      );
    }
  };

  useEffect(() => {
    if (!userId) {
      return;
    }
    async function fetchSkillData() {
      try {
        const response = await fetch(`https://sevario.xyz:6969/api/skill/${skillName}/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        setSkillData(data);
      } catch (err) {
        console.error('Failed to fetch skill data:', err);
      }
    }

    fetchSkillData();
  }, [skillName, userId]);

  useEffect(() => {
    return () => {
      handleDisconnect(); // Close WebSocket connection when component is unmounted
    };
  }, []);

  if (skillData) {
    return (
      <>
        <h3>
          {skillData.skill_name} (Level: {skillData.level})
        </h3>
        <p>Description: {skillData.description}</p>
        <p>Current XP: {skillData.current_xp}</p>
        <button className="rounded-full bg-blue-700 px-4 py-2 mb-2 mt-5" onClick={handleConnect} disabled={ws}>
          Connect
        </button>
        <br />
        <button className="rounded-full bg-blue-700 px-4 py-2 mb-2" onClick={handleDisconnect} disabled={!ws}>
          Disconnect
        </button>
        <br />
        <button className="rounded-full bg-blue-700 p-4 py-2 mb-2" onClick={handleSendMessage} disabled={!ws}>
          Increase xp by 1
          </button>
      </>
    );
  } else {
    return <div>Loading...</div>; // Show a loading message when skill data is not yet available
  }
};

export default Woodcutting;
