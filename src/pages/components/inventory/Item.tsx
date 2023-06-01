import React, { useEffect, Dispatch, SetStateAction } from 'react';
import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';
import sword from './sword.png';

interface ItemProps {
  setIsDragging: Dispatch<SetStateAction<boolean>>;
}

const Item: React.FC<ItemProps> = ({ setIsDragging }) => {
  const {attributes, listeners, setNodeRef, transform, isDragging: isItemDragging} = useDraggable({
    id: 'draggableItem',
    data: {
        supports: ['item'],
    }
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  useEffect(() => {
    setIsDragging(isItemDragging);
  }, [isItemDragging, setIsDragging]);
  
  return (
    <img src={sword.src} ref={setNodeRef} style={style} {...listeners} {...attributes} />
  );
}

export default Item;
