import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { Droppable } from "react-beautiful-dnd";

const Wrapper = styled.div`
  width: 300px;
  padding: 10px 10px 20px 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
`;
const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px
`

interface IDroppableBoard {
  items:string[],
  boardId:string
}
function DroppableBoard({items,boardId}:IDroppableBoard) {
  return(
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId} isDropDisabled={false}>
        {(provided)=>(
          <div ref={provided.innerRef}{...provided.droppableProps}>
            {items.map((item,index)=>(
              <DraggableCard item={item} index={index} key={item+index}/>
            ))}
            {provided.placeholder}
          </div>              
        )}
      </Droppable>
    </Wrapper>
  )
}

export default DroppableBoard