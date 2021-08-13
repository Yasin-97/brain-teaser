import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable,Draggable } from "react-beautiful-dnd";
import Button from "./Button";
import Card from "./Card";
import DroppableContainer from "./DroppableContainer";
import DraggableWord from './DraggableWord'
import styles from "../css/main.min.module.css";


export default function RememberSession({ level, words, time }) {

    const [wordList, updateWordList] = useState(words);
  const [timer, setTimer] = useState(time);
  
  useEffect(() => {
    if (timer > 0)
      setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }, [timer]);

    useEffect(() => {
        console.log('hello')
        return () => {
            console.log('bye')

        }
    }, [])
  

    function handleOnDragEnd(result) {
      const start =result.source.droppableId
      const finish =result.destination.droppableId
      console.log(start,finish);
        if (!result.destination) return;

        if (result.destination.droppableId === result.source.droppableId 
          && result.destination.index === result.source.index) {
          return;
        }


        if(start===finish){
          console.log(result);
          const items = Array.from(wordList);
          const [reorderedItem] = items.splice(result.source.index, 1);
          items.splice(result.destination.index, 0, reorderedItem);
  
          updateWordList(items)
return;
        }


        // const startMove = Array.from(wordList);







        


       
    }

    return (
    <Card
      className={`${styles.page} ${styles.d_flex} ${styles.alignItems_center} ${styles.justifyContent_around}`}
    >
      <div>
        <h1 className={styles.timer}>level {level}</h1>
      </div>

      <DragDropContext onDragEnd={handleOnDragEnd}>
          <div>
        <h4 className={styles.wizard_remem_header}>get them back in order</h4>

            
            <DroppableContainer id={'fuck'}>
            {wordList.map(({id,word},index) => <DraggableWord key={id} id={id} word={word} index={index}/> )}

            </DroppableContainer>

        
<DroppableContainer id={'shit'} >
  
</DroppableContainer>

        {/* <Droppable droppableId="OLdragArea">
        {(provided)=>(
        
        <div className='OLdragArea'{...provided.droppableProps} ref={provided.innerRef}> className={styles.wizard_remem_collection}
          {words.map(({id,word}, index) => (
            <Draggable key={id} draggableId={id} index={index}>
            {(provided) => (
            <div key={index} className={styles.wizard_remem_blank_space}
            ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
              <span className={styles.wizard_remem_blank_space_number}>
                {index + 1} -{" "}
              </span>
              <span></span>
            </div>
            )}
            </Draggable>
          ))}
           {provided.placeholder}
        </div>
         )}
</Droppable> */}

        </div>
       </DragDropContext>
      <div>
        <Button className={styles.wizard_Btn} text={`FISH ${timer}`} />
      </div>
    </Card>
  );
}
