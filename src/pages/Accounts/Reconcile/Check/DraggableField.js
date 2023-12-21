import React from "react";
import Draggable from "react-draggable";

const DraggableField = ({ name, onDragStop }) => (
  <Draggable bounds="parent" onStop={onDragStop}>
    <div
      style={{
        display: "flex",
        width: "100px",
        border: "1px solid black",
        padding: "0px 4px",
        margin: "5px",
      }}
    >
      {name}
    </div>
  </Draggable>
);

export default DraggableField;
