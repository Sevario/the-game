import React from "react";

const Topbar = () => {
    return (
        <div className="topbar bg-gray-800 w-full top-0 z-50">
            <div className="flex justify-between items-center h-full px-4">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-white rounded-full"></div>
                    <div className="text-white font-bold">The Game</div>
                </div>
            </div>
        </div>
    );
};

export default Topbar;