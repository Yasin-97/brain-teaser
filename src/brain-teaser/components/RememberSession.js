import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {useHistory} from "react-router-dom";
import { useDataContext } from "../context/Context";
import Button from "./Button";
import Card from "./Card";
import DroppableContainer from "./DroppableContainer";
import DraggableWord from "./DraggableWord";
import styles from "../css/main.min.module.css";





export default function RememberSession() {
const history=useHistory()
  //context
  const {phase,
    words,
    currentLevel,
    memoSavedTime,
    renderRemem,
    renderConclusion,
    rememTimeSaver,
     getLevelPoints,
     shuffle,
     arraySimilarity
    }=useDataContext()
  const {route,levels}=phase
  //state
    const [columnsData, setColumnsData] = useState({
    column1: {
      id: "column1",
      data:shuffle([...words],levels[currentLevel].wordCollection.length),//words //...words
        },
    column2: {
      id: "column2",
      data: [],
    },
  });
  const [overDraggedContainer, setOverDraggedContainer] = useState(false);
  const [counter, setCounter] = useState(levels[currentLevel].rememDuration+memoSavedTime);

 
 //effect
//  useEffect(()=>history.push(`remem`),[])

useEffect(() => {
  let timer;
      if (counter > 0){ timer= setTimeout(() =>{
      setCounter((prev) => prev - 1)}, 1000)
      sessionStorage.setItem('rememContinued',JSON.stringify(counter))}
      else{
        getLevelPoints(arraySimilarity(words,columnsData.column2.data))
        renderRemem(false)
        renderConclusion(true)
        rememTimeSaver(counter)
        history.replace(`/wizard/${route}/${currentLevel}/conclusion`)
        sessionStorage.removeItem('rememContinued')
    }  
    return ()=>clearTimeout(timer)
  }, [counter]);

  

//functions  
  const isOverDraggedContainer=(isDraggingOver) =>setOverDraggedContainer(isDraggingOver)

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    if (
      result.destination.droppableId === result.source.droppableId &&
      result.destination.index === result.source.index
    ) {
      return;
    }

    const start = columnsData[result.source.droppableId];
    const finish = columnsData[result.destination.droppableId];

    if (start === finish) {
      // const items = Array.from(columnsData[result.source.droppableId].data);
      // const [reorderedItem] = items.splice(result.source.index, 1);
      // items.splice(result.destination.index, 0, reorderedItem);

      // setColumnsData({
      //   ...columnsData,
      //   [result.source.droppableId]: {
      //     ...columnsData[result.source.droppableId],
      //     data: items,
      //   },
      // });
      return;
    }

    const startMove = Array.from(columnsData[result.source.droppableId].data);
    const [movedItem] = startMove.splice(result.source.index, 1);
    setColumnsData((pre) => ({
      ...pre,
      [result.source.droppableId]: {
        ...pre[result.source.droppableId],
        data: startMove,
      },
    }));

    const endMove = Array.from(
      columnsData[result.destination.droppableId].data
    );
    endMove.splice(result.destination.index, 0, movedItem);

    setColumnsData((pre) => ({
      ...pre,
      [result.destination.droppableId]: {
        ...pre[result.destination.droppableId],
        data: endMove,
      },
    }));
  }

  return (
    <Card
      className={`${styles.page}
       ${styles.d_flex}
       ${styles.alignItems_center}
       ${styles.justifyContent_around}`}
    >
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div>
          <h4 className={styles.wizard_remem_header}>get them back in order</h4>
          <DroppableContainer isDraggedOver={(arg) => {}} id={columnsData.column1.id}>
            {columnsData.column1.data.map(({ id, word }, index) => {
              return (
                <DraggableWord key={id} id={id} word={word} index={index} />
              );
            })}
          </DroppableContainer>

          <DroppableContainer
            isDraggedOver={ ()=>isOverDraggedContainer }
            id={columnsData.column2.id}
          >
            {overDraggedContainer === false &&
            columnsData.column2.data.length === 0 ? (
              <h5>Drag over here</h5>
            ) :
             (
              columnsData.column2.data.map(({ id, word }, index) => (
                <DraggableWord
                  key={id}
                  id={id}
                  word={word}
                  index={index}
                  wordNumber={index + 1}
                />
              ))
            )
            }
          </DroppableContainer>
        </div>
      </DragDropContext>
      <div>
        <Button
         className={styles.wizard_Btn}
         onClick={()=>{ 
          rememTimeSaver(counter); 
          renderRemem(false)
          renderConclusion(true)
          getLevelPoints(arraySimilarity(words,columnsData.column2.data))
          history.replace(`/wizard/${route}/${currentLevel}/conclusion`)
          sessionStorage.removeItem('rememContinued')
        }}
          duration={counter} text='FINISH'
          />
      </div>
    </Card>
  );
}
