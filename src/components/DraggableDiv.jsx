import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemType = 'DIV';

const DraggableDiv = ({ id, text, onDrop }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [id]);

  const [, drop] = useDrop(() => ({
    accept: ItemType,
    hover: (item) => {
      if (item.id !== id) {
        onDrop(item.id, id);
      }
    },
  }), [id]);

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: '16px',
        margin: '8px',
        backgroundColor: 'lightblue',
        border: '1px solid darkblue',
        borderRadius: '4px',
        cursor: 'move',
      }}
    >
      {text}
    </div>
  );
};

export default DraggableDiv;
