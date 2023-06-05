import React, { useEffect, Dispatch, SetStateAction } from 'react';
import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';
import sword from './sword.png';

interface ItemProps {
  data: object;
  setIsDragging: Dispatch<SetStateAction<boolean>>;
}

const Item: React.FC<ItemProps> = ({ data, id, setIsDragging }) => {
  const {attributes, listeners, setNodeRef, transform, isDragging: isItemDragging} = useDraggable({
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

  return (
    // <img src={sword.src} ref={setNodeRef} style={style} {...listeners} {...attributes} />
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <img src={`${BASE_SPRITE_URL}${data.sprite}`} alt={data.name} />
    </div>
  );
}

export default React.memo(Item);