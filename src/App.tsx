import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
function App() {
  function onDragEnd() {

  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='one'>
        {(provided)=>(
          <ul ref={provided.innerRef} {...provided.droppableProps}>
            <Draggable draggableId='first' index={0}>
              {(provided)=><li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>One</li>}
            </Draggable>
            <Draggable draggableId='second' index={1}>
              {(provided)=><li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>Two</li>}
            </Draggable>
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default App;


/*
<DragDropContext> = onDragEnd 이벤트리스너를 필수로 작성.  #7.2
<Droppable> = droppableId 필수로 작성.  #7.2
              자식요소는 함수안에 작성하고, 함수는 'provided' parameter를 갖고있다.
              provided.innerRef는 자식요소의 ref속성에 작성해야한다.
              provided.droppableProps는 spread 문법으로 작성해야하고, 해당 요소는 drop이 가능한 요소가 된다.  #7.3
<Draggable> = draggableId, index 필수로 작성.  #7.2
              자식요소는 함수안에 작성하고, 함수는 'provided' parameter를 갖고있다.
              provided.innerRef는 자식요소의 ref속성에 작성해야한다.
              provided.draggableProps는 spread 문법으로 작성해야하고, 해당 요소는 drag가 가능한 요소가 된다.
              provided.dragHandleProps는 spread 문법으로 작성해야하고, 해당 요소를 클릭해야 drag 무빙이 가능하다.  #7.3
*/