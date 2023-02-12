import React, { useState, useEffect } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const NavSkill = () => {
  const [skillList, setSkillList] = useState([]);

  const fetchSkills = async () => {
    const res = await fetch("skills.json");
    return res.json();
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["skills"],
    queryFn: fetchSkills,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {(error as Error).message}</span>;
  }

  return (
    // loop through data and return a button for each skill
    <div className="flex flex-col items-center justify-center gap-4">
      {data.skills.map((skill: { name: string }) => (
        <button
          className="text-white no-underline transition hover:bg-white/20"
          key={skill.name}
        >
          {skill.name}
        </button>
      ))}
    </div>
  );
};

export default NavSkill;
