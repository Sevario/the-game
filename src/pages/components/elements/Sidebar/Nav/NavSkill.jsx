import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';


const NavSkill = () => {

    const fetchSkills = async () => {
        const res = await fetch('https://dummyjson.com/products/1');
        return res.json();
    };

    const { data, error, isLoading } = useQuery(['skills'], fetchSkills, {
        staleTime: Infinity,
        enabled: false,
    });
    

    return (
        <div className="border-t-2 border-slate-700 w-full flex flex-col items-center justify-center gap-4">
            {data}
        </div>
    );
};

export default NavSkill;