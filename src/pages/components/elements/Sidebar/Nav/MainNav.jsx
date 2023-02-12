import React from "react";
import NavSkill from "./NavSkill.jsx";
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'

const queryClient = new QueryClient();

const MainNav = () => {
    return (
        <div className=" flex flex-col items-center gap-4">
            <QueryClientProvider client={queryClient}>
                <NavSkill />
            </QueryClientProvider>
        </div>
    );
};

export default MainNav;