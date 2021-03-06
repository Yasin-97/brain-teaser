import React from "react";
import { Draggable } from "react-beautiful-dnd";

import styled from "styled-components";

const Word = styled.p`
  flex-grow: 1;
  max-width: 60%;
  height: 100%;
  text-align: center;
  padding: 0.7rem 1rem;
  margin: 0.3rem;
  border-radius: 0.3rem;
  font-size: 0.83rem;
  font-weight: bold;
  letter-spacing: 1px;
  box-shadow: 0px 0px 2px 0px rgba(255, 255, 255, 0.425);
  background-color: ${(props) =>
    props.isDragging ? "hsl(315, 100%, 50%)" : "transparent"};
`;
export default function DraggableWord({ id, wordNumber, word, index }) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => {
        const { isDragging } = snapshot;
        return (
          <Word
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            isDragging={isDragging}
          >
            {wordNumber && `${wordNumber + "- "}`}
            {word}
          </Word>
        );
      }}
    </Draggable>
  );
}
