import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from 'next-auth/react';

const NavSkill = () => {
  const [skillList, setSkillList] = useState(null);
  const { data: session } = useSession();
  const userId = session?.user.id;

  useEffect(() => {
    async function fetchSkillListData() {
      try {
        const response = await fetch(`https://sevario.xyz:6969/api/skills/` + userId);
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setSkillList(data.result);
      } catch (err) {
        console.error('Failed to fetch skill data:', err);
      }
    }

    fetchSkillListData();
  }, []);

  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  console.log(skillList);
  if (skillList) {
    return (
      // loop through data and return a button for each skill
      <div className="flex flex-col items-center justify-center gap-4">
        {skillList.map((skill: { skill_name: string; level: number }) => (
          <div className="" key={skill.skill_name}>
            <Link
              href={`/skills/${skill.skill_name.toLowerCase()}`}
              className="text-white no-underline transition hover:bg-white/20"
            >
              {capitalizeWords(skill.skill_name)} (1)
            </Link>
          </div>
        ))}
      </div>
    );
  } else {
    return <div>Loading...</div>; // Show a loading message when skills data is not yet available
  }
};

export default NavSkill;
