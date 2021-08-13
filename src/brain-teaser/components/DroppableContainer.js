import React from 'react'
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd'


const Container =styled.div`
 margin-bottom: 5rem;
    /* display: flex; */
    flex-wrap: wrap;
width: 100%;
min-height: 150px;
justify-content: center;
background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'red')};
`;

export default function DroppableContainer({id,children}) {
    return (
        <Droppable droppableId={id}>
        {(provided,snapshot)=>{
             const {isDraggingOver}=snapshot
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
