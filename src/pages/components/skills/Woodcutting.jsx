import React, { useEffect, useState, useContext } from "react";
import { useSession } from 'next-auth/react';
import WebSocketContext from '@context/WebSocketContext';
import { getSkill } from '@hooks/useSkills';

const Woodcutting = () => {
  const skillName = 'woodcutting';
  const { data: session } = useSession();
  const [userId, setUserId] = useState(null);
  const ws = useContext(WebSocketContext);
  const { data, isLoading, error, refreshData } = getSkill(userId ? `https://sevario.xyz:6969/api/skill/${skillName}/${userId}` : null, [userId, ws]);

  useEffect(() => {
    if (session?.user?.id) {
      setUserId(session.user.id);
    }
  }, [session]);

  const handleSendMessage = () => {
    if (ws) {
      ws.send(JSON.stringify({
        "type": "skill",
      }));
      refreshData();
    }
  };

  if (isLoading) {
    // return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (data) {
    return (
      <>
        <h3>
          {data.skill_name} (Level: {data.level})
        </h3>
        <p>Description: {data.description}</p>
        <p>Current XP: {data.current_xp}</p>
        <br />
        <button className="rounded-full bg-blue-700 p-4 py-2 mb-2" onClick={handleSendMessage} disabled={!ws}>
          Increase xp by 1
        </button>
      </>
    );
  }

  return null;
};

export default Woodcutting;
