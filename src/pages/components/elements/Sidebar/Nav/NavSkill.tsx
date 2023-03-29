import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector, connect } from "react-redux";
import { loadSkills, addSkill } from "@store/reducers";
// import { RootState } from '@store/store';

const NavSkill = () => {
  const [skillList, setSkillList] = useState(null);


  useEffect(() => {
    async function fetchSkillListData() {
      try {
        const response = await fetch(`https://sevario.xyz:6969/api/skills/`);
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
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
        {skillList.map((skill: { name: string; level: number }) => (
          <div className="" key={skill.name}>
            <Link
              href={`/skills/${skill.name.toLowerCase()}`}
              className="text-white no-underline transition hover:bg-white/20"
            >
              {capitalizeWords(skill.name)} ({skill.level})
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
