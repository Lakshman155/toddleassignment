import React from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemType = "DIV"; // The type for the draggable items

const DraggableDiv = ({ id, children, moveDiv }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { id },
  });

  return (
    <div ref={ref} style={{ padding: "16px", border: "1px solid #000", marginBottom: "8px", cursor: "move" }}>
      {children}
    </div>
  );
};

const DroppableDiv = ({ id, children, onDrop }) => {
  const [{ isOver }, ref] = useDrop({
    accept: ItemType,
    drop: (item) => onDrop(item.id, id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={ref}
      style={{
        padding: "16px",
        border: "1px solid #000",
        marginBottom: "8px",
        backgroundColor: isOver ? "lightgreen" : "white",
      }}
    >
      {children}
    </div>
  );
};

const DragAndDropExample = () => {
  const [divs, setDivs] = React.useState([
    { id: 1, text: "Draggable Div 1" },
    { id: 2, text: "Draggable Div 2" },

    {id:3,text:"Draggable 3"}
  ]);

  const moveDiv = (draggedId, droppedId) => {
    const draggedIndex = divs.findIndex((div) => div.id === draggedId);
    const droppedIndex = divs.findIndex((div) => div.id === droppedId);
    const updatedDivs = [...divs];

    const [draggedDiv] = updatedDivs.splice(draggedIndex, 1);
    updatedDivs.splice(droppedIndex, 0, draggedDiv);

    setDivs(updatedDivs);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      {divs.map((div) => (
        <DroppableDiv key={div.id} id={div.id} onDrop={moveDiv}>
          <DraggableDiv id={div.id} moveDiv={moveDiv}>
            {div.text}
          </DraggableDiv>
        </DroppableDiv>
      ))}
    </DndProvider>
  );
};

export default DragAndDropExample;
