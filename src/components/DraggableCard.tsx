import React from "react";
import { Draggable } from "react-beautiful-dnd"
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { boardState } from "../atoms";

const Card = styled.div<{isDragging:boolean}>`
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${props=>props.isDragging ? "0px 2px 5px rgba(0,0,0,0.2)" : "none"};
  background-color: ${(props) => props.isDragging ? "#A8D8B9" : props.theme.cardColor};
  button {
    padding: 2px;
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
  }
`;

interface ICard {
  itemId:number,
  itemName:string,
  index:number,
  includeBoard:string
}
function DraggableCard ({itemId,itemName,index,includeBoard}:ICard) {
  const setBoards = useSetRecoilState(boardState)
  function deleteItem(){
    setBoards((boards)=>{
      const copyBoard = [...boards[includeBoard]]
      copyBoard.splice(index,1)
      return {
        ...boards,
        [includeBoard]:copyBoard
      }
    })
  }
  return (
    <Draggable draggableId={itemId+''} index={index}>
      {(provided,snapshot)=>(
        <Card 
          ref={provided.innerRef}{...provided.dragHandleProps}{...provided.draggableProps} 
          isDragging={snapshot.isDragging} 
        >
          <span>{itemName}</span>
          <button onClick={deleteItem}>❌</button>
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