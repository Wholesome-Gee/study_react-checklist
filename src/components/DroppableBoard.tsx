import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { Droppable } from "react-beautiful-dnd";

const Wrapper = styled.div`
  width: 300px;
  padding: 10px 10px 20px 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display:flex;
  flex-direction: column;
  over-flow: hidden;
`;
const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px
`
const Area = styled.div<IArea>`
padding: 20px;
flex-grow: 1;
background-color: ${
  props=> 
    props.isDraggingOver 
    ? "#F7E89E"
    : props.draggingFromThisWith 
      ? "#E0E0E0" 
      : 'transparent'
};
`

interface IArea {
  isDraggingOver: boolean,
  draggingFromThisWith: boolean
}

interface IDroppableBoard {
  items:string[],
  boardId:string
}
function DroppableBoard({items,boardId}:IDroppableBoard) {
  return(
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId} isDropDisabled={false}>
        {(provided,snapshot)=>(
          <Area draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)} isDraggingOver={snapshot.isDraggingOver} ref={provided.innerRef}{...provided.droppableProps}>
            {items.map((item,index)=>(
              <DraggableCard item={item} index={index} key={item+index}/>
            ))}
            {provided.placeholder}
          </Area>              
        )}
      </Droppable>
    </Wrapper>
  )
}

export default DroppableBoard


/*
<Droppable> = droppableId 필수로 작성.  #7.2
              자식요소는 함수안에 작성하고, 함수는 'provided','snapshot' parameter를 갖고있다. (snapshot은 #7.11)
              provided.innerRef는 자식요소의 ref속성에 작성해야한다.
              provided.droppableProps는 spread 문법으로 작성해야하고, 해당 요소는 drop이 가능한 요소가 된다.  #7.3
              provided.placeholder는 draggable요소의 drag에 따른 droppable요소의 사이즈 변화를 막아준다.  #7.4
              snapshot.draggingFromThisWith는 draggable요소가 기존의 droppable요소를 벗어나면 draggableId를 반환한다.  #7.11
              snapshot.isDraggingOver는 draggable요소가 특정 droppable요소 위에서 드래깅 되고 있는지 여부  #7.11
*/