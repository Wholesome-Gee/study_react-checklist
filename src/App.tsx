import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { itemState } from './atoms';

const Wrapper = styled.div`
    display: flex;
    max-width: 480px;
    width: 100%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 100vh;
`
const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
`;
const Board = styled.div`
  padding: 30px 10px 20px 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;
const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;
function App() {
  const [items,setItems] = useRecoilState(itemState)
  const onDragEnd = (args:DropResult) => 
    // console.log(args)
    console.log(args.destination, args.source)
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId='one' isDropDisabled={false}>
            {(provided)=>(
              <Board ref={provided.innerRef}{...provided.droppableProps}>
                {items.map((item,index)=>(
                  <Draggable draggableId={item} index={index} key={index}>
                    {(provided)=>(
                      <Card ref={provided.innerRef}{...provided.dragHandleProps}{...provided.draggableProps}>
                        {item}
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Board>
            )}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  )
}
export default App;


/*
<DragDropContext> = onDragEnd 이벤트리스너를 필수로 작성.  #7.2
                    onDragEnd 이벤트리스너는 DropResult 타입의 args를 parameter로 갖고있으며, args에는 draggable요소의 시작지점, 도착지점 등의 정보가 나와있다. (console.log(args))  #7.5
<Droppable> = droppableId 필수로 작성.  #7.2
              자식요소는 함수안에 작성하고, 함수는 'provided' parameter를 갖고있다.
              provided.innerRef는 자식요소의 ref속성에 작성해야한다.
              provided.droppableProps는 spread 문법으로 작성해야하고, 해당 요소는 drop이 가능한 요소가 된다.  #7.3
              provided.placeholder는 draggable요소의 drag에 따른 droppable요소의 사이즈 변화를 막아준다.  #7.4
<Draggable> = draggableId, index 필수로 작성.  #7.2
              자식요소는 함수안에 작성하고, 함수는 'provided' parameter를 갖고있다.
              provided.innerRef는 자식요소의 ref속성에 작성해야한다.
              provided.draggableProps는 spread 문법으로 작성해야하고, 해당 요소는 drag가 가능한 요소가 된다.
              provided.dragHandleProps는 spread 문법으로 작성해야하고, 해당 요소를 클릭해야 drag 무빙이 가능하다.  #7.3
*/