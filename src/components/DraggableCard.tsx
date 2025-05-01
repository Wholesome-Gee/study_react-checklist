import React from "react";
import { Draggable } from "react-beautiful-dnd"
import styled from "styled-components";

const Card = styled.div<{isDragging:boolean}>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
  background-color: ${(props) => props.isDragging ? "#A8D8B9" : props.theme.cardColor};
  box-shadow: ${props=>props.isDragging ? "0px 2px 5px rgba(0,0,0,0.2)" : "none"}
`;

interface ICard {
  itemId:number,
  itemName:string,
  index:number,
}
function DraggableCard ({itemId,itemName,index}:ICard) {
  return (
    <Draggable draggableId={itemId+''} index={index}>
      {(provided,snapshot)=>(
        <Card isDragging={snapshot.isDragging} ref={provided.innerRef}{...provided.dragHandleProps}{...provided.draggableProps}>
          {itemName}
        </Card>
      )}
    </Draggable>
  )
}

export default React.memo(DraggableCard)
// React.memo는 component의 불필요한 리렌더링을 막아준다. (부모요소의 prop이 변할때 등..)  #7.7


/*
<Draggable> = draggableId, index 필수로 작성.  #7.2
              자식요소는 함수안에 작성하고, 함수는 'provided','snapshot' parameter를 갖고있다.
              provided.innerRef는 자식요소의 ref속성에 작성해야한다.
              provided.draggableProps는 spread 문법으로 작성해야하고, 해당 요소는 drag가 가능한 요소가 된다.
              provided.dragHandleProps는 spread 문법으로 작성해야하고, 해당 요소를 클릭해야 drag 무빙이 가능하다.  #7.3
              snapshot.isDragging은 draggable요소가 드래깅 중인지 여부  #7.12
*/