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
  //context
  const {dispathcSessionStorage}=useDataContext()
const history=useHistory()

//get session storaged time
const rememContinued=
dispathcSessionStorage({
  type:"GET_ITEM",
  payload:{
    item:'rememContinued'
  }
})
// JSON.parse(sessionStorage.getItem('rememContinued'))
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
  const memoSaveTime= dispathcSessionStorage({
    type:"GET_ITEM",
    payload:{
      item:'memoSavedTime'
    }
  })
  // JSON.parse(sessionStorage.getItem('memoSavedTime'))
  const [overDraggedContainer, setOverDraggedContainer] = useState(false);
  const [counter, setCounter] = useState(rememContinued?rememContinued:levels[currentLevel].rememDuration+memoSaveTime);

 
 //effect
//  useEffect(()=>history.push(`remem`),[])

useEffect(() => {
  let timer;
  dispathcSessionStorage({ type:'SET_ITEM', payload:{ item:'rememContinued', value:counter }})
  dispathcSessionStorage({ type:'SET_ITEM', payload:{ item:'currentSavedTime', value:counter }})
      if (counter !== 0){ timer= setTimeout(() =>{
      setCounter((prev) => prev - 1)}, 1000)
    }
      else{
        console.log(counter);
        rememTimeSaver(counter)
        // getLevelPoints(arraySimilarity(words,columnsData.column2.data))
        dispathcSessionStorage({ type:'SET_ITEM', payload:{ item:'currentLevelPoints', value:arraySimilarity(words,columnsData.column2.data) }})
        dispathcSessionStorage({ type:"REMOVE", payload:{ item:'rememContinued'}})
        dispathcSessionStorage({ type:"REMOVE", payload:{ item:'memoSavedTime'}})
        history.replace(`/wizard/${route}/${currentLevel}/conclusion`)
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
      </div>
        <Button
         className={styles.wizard_remem_btn}
         onClick={()=>{ 
          rememTimeSaver(counter); 
          history.replace(`/wizard/${route}/${currentLevel}/conclusion`)
          dispathcSessionStorage({ type:'SET_ITEM', payload:{ item:'currentSavedTime', value:counter }})
          dispathcSessionStorage({ type:'SET_ITEM', payload:{ item:'currentLevelPoints', value:arraySimilarity(words,columnsData.column2.data) }})
          dispathcSessionStorage({ type:"REMOVE", payload:{ item:'rememContinued'}})
        dispathcSessionStorage({ type:"REMOVE", payload:{ item:'memoSavedTime'}})
          // getLevelPoints(arraySimilarity(words,columnsData.column2.data))
        }}
        text ={'FINISH'}
        duration={counter}
          />
    </Card>
  );
}
