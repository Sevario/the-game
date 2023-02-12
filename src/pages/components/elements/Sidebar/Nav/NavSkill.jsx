import React, { useState, useEffect } from 'react';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'


const NavSkill = () => {

    const [skillList, setSkillList] = useState([]);

    const fetchSkills = async () => {
        const res = await fetch('skills.json');
        console.log(res)
        return res.json();
    };

    const { data, error, isLoading } = useQuery(['skills'], fetchSkills, {
        staleTime: Infinity,
        enabled: false,
    });
    

    return (
        <div className="border-t-2 border-slate-700 w-full flex flex-col items-center justify-center gap-4">
            {/* loop through skillList object */}

        </div>
    );
};

export default NavSkill;