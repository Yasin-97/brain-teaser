import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Button from "./Button";
import Card from "./Card";
import DroppableContainer from "./DroppableContainer";
import DraggableWord from "./DraggableWord";
import styles from "../css/main.min.module.css";

export default function RememberSession({ level, words, time,rememDuration,durationEnd,savedTime }) {
  const [initialData, setInitialData] = useState(words);
  const [secondaryData, setSecondaryData] = useState({
    column1: {
      id: "column1",
      data: initialData,
    },
    column2: {
      id: "column2",
      data: [],
    },
  });

  const [overDraggedContainer, setOverDraggedContainer] = useState(false);

  //state
  const [counter, setCounter] = useState(rememDuration);

  //effects
useEffect(() => {
    if (rememDuration) {
      if (counter > 0) setTimeout(() =>{
        console.log(counter)
      setCounter((prev) => prev - 1)}, 1000)
      else durationEnd(counter)
    }
  }, [counter]);
  

  function handleOnDragEnd(result) {
    
    if (!result.destination) return;

    if (
      result.destination.droppableId === result.source.droppableId &&
      result.destination.index === result.source.index
    ) {
      return;
    }

    const start = secondaryData[result.source.droppableId];
    const finish = secondaryData[result.destination.droppableId];

    if (start === finish) {
      // const items = Array.from(secondaryData.column1.data);

      const items = Array.from(secondaryData[result.source.droppableId].data);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      setSecondaryData({
        ...secondaryData,
        [result.source.droppableId]: {
          ...secondaryData[result.source.droppableId],
          data: items,
        },
      });
      return;
    }

    const startMove = Array.from(secondaryData[result.source.droppableId].data);
    const [movedItem] = startMove.splice(result.source.index, 1);
    console.log("now", movedItem, startMove);
    setSecondaryData((pre) => ({
      ...pre,
      [result.source.droppableId]: {
        ...pre[result.source.droppableId],
        data: startMove,
      },
    }));

    const endMove = Array.from(
      secondaryData[result.destination.droppableId].data
    );
    console.log(result.destination.droppableId);
    endMove.splice(result.destination.index, 0, movedItem);
    console.log(secondaryData.column1.data);

    setSecondaryData((pre) => ({
      ...pre,
      [result.destination.droppableId]: {
        ...pre[result.destination.droppableId],
        data: endMove,
      },
    }));
  }

  return (
    <Card
      className={`${styles.page} ${styles.d_flex} ${styles.alignItems_center} ${styles.justifyContent_around}`}
    >
         

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div>
          <h4 className={styles.wizard_remem_header}>get them back in order</h4>

          <DroppableContainer isDraggedOver={(arg) => {}} id={"column1"}>
            {secondaryData.column1.data.map(({ id, word }, index) => {
              return (
                <DraggableWord key={id} id={id} word={word} index={index} />
              );
            })}
          </DroppableContainer>

          <DroppableContainer
            isDraggedOver={(isDraggingOver) =>
              setOverDraggedContainer(isDraggingOver)
            }
            id={"column2"}
          >
            {overDraggedContainer === false &&
            secondaryData.column2.data.length === 0 ? (
              <h5>nice man</h5>
            ) : (
              secondaryData.column2.data.map(({ id, word }, index) => (
                <DraggableWord
                  key={id}
                  wordNumber={index + 1}
                  id={id}
                  word={word}
                  index={index}
                />
              ))
            )}
          </DroppableContainer>
        </div>
      </DragDropContext>
      <div>
        <Button
         className={styles.wizard_Btn}
         onClick={()=>{ savedTime(counter); durationEnd(0)}}
          duration={counter} text='FINISH'
          />
      </div>
    </Card>
  );
}
