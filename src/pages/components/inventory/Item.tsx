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

function calculateDPS(stat1: string): number {
  const [ad,As] = stat1.split(',');
  console.log(ad, As);
  // return dps;
}

  return (
    // <img src={sword.src} ref={setNodeRef} style={style} {...listeners} {...attributes} />
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className='itemholder group relative overflow-visible'>
      <div className="tooltip absolute left-12 w-48 py-2 mt-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-200 ease-out z-10 p-2 pointer-events-none">
        <span className="tooltiptext">{data.name}</span><br />
        <span className="tooltipDMG">{calculateDPS(data.stat1)}</span>
      </div>
      <img src={`${BASE_SPRITE_URL}${data.sprite}`} alt={data.name} />
    </div>
  );
}

export default React.memo(Item);