import React from 'react'
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd'


const Container =styled.div`
 margin-bottom: 5rem;
 padding: .5rem;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
   border-radius: .3rem;
    box-shadow: 0px 0px 2px 0px rgba(255, 255, 255, 0.7);
min-height: 150px;
justify-content: center;
background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'transparent')};
`;

export default function DroppableContainer({isDraggedOver,id,children}) {
    
    return (
        <Droppable droppableId={id} direction="horizontal">
        {(provided,snapshot)=>{
            const {isDraggingOver}=snapshot
            isDraggedOver(isDraggingOver)        
             return ( 
<Container id={id} 
        {...provided.droppableProps} 
        ref={provided.innerRef}
        isDraggingOver={isDraggingOver}
        >
{children}



{provided.placeholder}
        </Container>
             )
        }}
        </ Droppable>
    )
}
