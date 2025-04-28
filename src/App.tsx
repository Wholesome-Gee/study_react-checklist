import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
function App() {
  function onDragEnd() {

  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='one'>
        {()=>(
          <ul>
            <Draggable draggableId='first' index={0}>
              {()=><li>One</li>}
            </Draggable>
            <Draggable draggableId='second' index={1}>
              {()=><li>Two</li>}
            </Draggable>
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default App;


/*
<DragDropContext>는 onDragEnd 이벤트리스너와 자식요소를 필수로 갖는다.
<Droppable>은 droppableId를 prop으로 갖고, 자식요소를 함수로 갖는다.
<Draggable>은 draggableId와 index를 prop으로 갖고, 자식요소를 함수로 갖는다.
*/