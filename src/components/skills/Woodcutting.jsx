import React, { useEffect, useState, useContext } from "react";
import { useSession } from "next-auth/react";
import WebSocketContext from "@context/WebSocketContext";
import { useGetSkill, useGetSkillT } from "@hooks/useSkills";
import SkillButton from "@compskill/SkillButton";
import SkillInfo from "@compskill/SkillInfo";

const Woodcutting = () => {
  const skillName = "woodcutting";
  const { data: session } = useSession();
  const [userId, setUserId] = useState(null);
  const ws = useContext(WebSocketContext);
  const { data, isLoading, error, refreshData } = useGetSkill(
    userId ? `https://sevario.xyz:6969/api/skill/${skillName}/${userId}` : null,
    [userId, ws]
  );
  const { dataT, isLoadingT, errorT, refreshDataT } = useGetSkillT(
    userId ? `https://sevario.xyz:6969/api/skill/${skillName}` : null,
    [userId, ws]
  );
  
  useEffect(() => {
    if (session?.user?.id) {
      setUserId(session.user.id);
    }
  }, [session]);

  if (isLoading && isLoadingT) {
    return <div>Loading...</div>;
  }

  if (error || errorT || (error && errorT)) {
    return (
      <div>
        Error: {error} ErrorTreeData: {errorT}
      </div>
    );
  }

  if (data && dataT) {
    return (
      <>
      <SkillInfo
      skillName={data.skill_name}
      level={data.level}
      currentXP={data.current_xp}
      description={data.description}
      />
        {/* <h3>
          {data.skill_name} (Level: {data.level})
        </h3>
        <p>Description: {data.description}</p>
        <p>Current XP: {data.current_xp}</p> */}
        <br />
        <div className="flex gap-3 flex-wrap justify-center">
          {dataT.trees.map((tree, id) => (
            <SkillButton
              key={id}
              Name={tree.name}
              profession={data.skill_name}
              XP={tree.xp_value}
              Time={tree.chopping_time}
              Level={tree.lvl}
              currentLvl={data.level}
              Icon="🌳"
            />
          ))}
        </div>
      </>
    );
  }

  return null;
};

export default Woodcutting;
