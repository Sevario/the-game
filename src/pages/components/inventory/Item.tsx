import React, { useEffect, Dispatch, SetStateAction } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import sword from './sword.png';

interface ItemProps {
  data: object;
  setIsDragging: Dispatch<SetStateAction<boolean>>;
}

const Item: React.FC<ItemProps> = ({ data, id, setIsDragging }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging: isItemDragging } = useDraggable({
    id: id,
    data: {
      supports: ['item'],
    }
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const BASE_SPRITE_URL = 'https://img2.torrenthr.org';

  useEffect(() => {
    setIsDragging(isItemDragging);
    // console.log(data.sprite)
  }, [isItemDragging, setIsDragging]);

  if (!data) {
    return null;
  }


  const ToolTip = () => {
    function calculateDPS(min_ad: number, max_ad: number, attack_speed: number) {
      const averageAD = (min_ad + max_ad) / 2;
      const dps = averageAD * attack_speed;
      return dps.toFixed(2);
    }
    return (
      <div className="tooltip absolute left-12 w-48 py-2 mt-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-200 ease-out z-10 p-2 pointer-events-none">
        <div className="tooltiptext">{data.name}</div>
        <div className="tooltipDamage flex justify-between w-full"><span>Attack damage:</span><span>{data.min_ad + '-' + data.max_ad}</span></div>
        <div className="tooltipASpeed flex justify-between w-full"><span>Attack speed:</span><span>{data.attack_speed}</span></div>
        <div className="tooltipDPS flex justify-between w-full"><span>Damage per second:</span><span>{calculateDPS(data.min_ad, data.max_ad, data.attack_speed)}</span></div>
      </div>
    )
  }
  return (
    // <img src={sword.src} ref={setNodeRef} style={style} {...listeners} {...attributes} />
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className='itemholder group relative overflow-visible'>
      <ToolTip />
      <img src={`${BASE_SPRITE_URL}${data.sprite}`} alt={data.name} />
    </div>
  );
}

export default React.memo(Item);