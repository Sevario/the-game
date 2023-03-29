import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector, connect } from "react-redux";
import { loadSkills, addSkill } from "@store/reducers";
// import { RootState } from '@store/store';

const NavSkill = () => {
  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSkills());
  }, [dispatch]);

  const skillsSelector = (state) => state.skills;

  const skills = useSelector(skillsSelector);
  // console.log(skills);
  if (skills) {
    return (
      // loop through data and return a button for each skill
      <div className="flex flex-col items-center justify-center gap-4">
        {skills.map((skill: { name: string; level: number }) => (
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
