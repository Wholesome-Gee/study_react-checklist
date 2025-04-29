import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { Droppable } from "react-beautiful-dnd";

const Board = styled.div`
  padding: 30px 10px 20px 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;

interface IDroppableBoard {
  items:string[],
  boardId:string
}
function DroppableBoard({items,boardId}:IDroppableBoard) {
  return(
    <Droppable droppableId={boardId} isDropDisabled={false}>
      {(provided)=>(
        <Board ref={provided.innerRef}{...provided.droppableProps}>
          {items.map((item,index)=>(
            <DraggableCard item={item} index={index} key={item+index}/>
          ))}
          {provided.placeholder}
        </Board>              
      )}
    </Droppable>
  )
}

export default DroppableBoard