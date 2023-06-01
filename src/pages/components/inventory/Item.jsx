import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';
import sword from './sword.png';

const Item = () => {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: 'draggableItem',
    data: {
        supports: ['item'],
    }
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };
  
  return (
    <img src={sword.src} ref={setNodeRef} style={style} {...listeners} {...attributes} />
  );
}

export default Item;