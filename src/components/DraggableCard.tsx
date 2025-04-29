import React from "react";
import { Draggable } from "react-beautiful-dnd"
import styled from "styled-components";

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;

interface ICard {
  item:string,
  index:number,
}
function DraggableCard ({item,index}:ICard) {
  return (
    <Draggable draggableId={item} index={index}>
      {(provided)=>(
        <Card ref={provided.innerRef}{...provided.dragHandleProps}{...provided.draggableProps}>
          {item}
        </Card>
      )}
    </Draggable>
  )
}

export default React.memo(DraggableCard)
// React.memo는 component의 불필요한 리렌더링을 막아준다. (부모요소의 prop이 변할때 등..)  #7.7