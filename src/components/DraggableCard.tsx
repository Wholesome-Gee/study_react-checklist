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
        <Card 
          ref={provided.innerRef}{...provided.dragHandleProps}{...provided.draggableProps} 
          isDragging={snapshot.isDragging} 
        >
          {itemName}
        </Card>
      )}
    </Draggable>
  )
}

export default React.memo(DraggableCard)
// React.memo는 component의 불필요한 리렌더링을 막아준다. (부모요소의 prop이 변할때 등..)  #7.7


/*
20. <Draggable> = draggableId 필수  #7.2
21. 자식요소는 함수안에 작성하고, 함수는 'provided','snapshot' parameter를 갖고있다.
23. ref={provided.innerRef}{...provided.dragHandleProps}{...provided.draggableProps}는 요소를 draggable요소로 만들어준다.  #7.3
    {...provided.dragHandleProps}는 해당요소를 drag를 위한 클릭범위로 지정한다.  #7.3
24. snapshot.isDragging은 draggable요소가 드래깅 중인지 여부를 나타낸다.  #7.12
*/