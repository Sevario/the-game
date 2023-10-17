import React from "react";

interface SkillInfoProps {
    skillName: string;
    level: number;
    currentXP: number;
    description: string;
}
interface XPBarProps {
    currentXP: number;
    currentLvl: number;
}

const XPBar: React.FC<XPBarProps> = ({ currentXP, currentLvl }) => {
    //Calculate current level
    function requiredXP(lvl: number) {
        let totalXp = 0;
        for (let i = 1; i < (lvl + 1); i++) {
            totalXp += Math.floor(i + 300 * Math.pow(2, i / 7));
        }
        return Math.floor(totalXp / 4);
    };
    function previousLVL(lvl: number) {
        let totalXp = 0;
        for (let i = 1; i < (lvl); i++) {
            totalXp += Math.floor(i + 300 * Math.pow(2, i / 7));
        }
        return Math.floor(totalXp / 4);
    }
    function getProgress() {
        const progress = ((currentXP - previousLVL(currentLvl)) / (requiredXP(currentLvl) - previousLVL(currentLvl))) * 100 + "%";
        return progress;
    }
    // Return JSX
    return (
        <>
            <div className="container mx-auto w-64 h-4 rounded-full bg-gray-300">
                <div className="progress-bar h-full rounded-full bg-green-500 duration-200" style={{ width: `${getProgress()}` }}></div>
            </div>
        </>
    );
};


const SkillInfo: React.FC<SkillInfoProps> = ({
    skillName,
    level,
    currentXP,
    description,
}) => {
    return (
        <div className="skillInfo">
            <h3>
                {skillName} (Level: {level})
            </h3>
            <p>Description: {description}</p>
            <p>Current XP: {currentXP}</p>
            <XPBar 
            currentXP={currentXP}
            currentLvl={level}
            />
        </div>
    );
};

export default SkillInfo;
