import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { boardState } from './atoms';
import DroppableBoard from './components/DroppableBoard';

const Wrapper = styled.div`
    display: flex;
    max-width: 680px;
    width: 100vw;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 100vh;
`
const Boards = styled.div`
  display: flex;
  justify-contents: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;


function App() {
  const [boards,setBoards] = useRecoilState(boardState)

  const onDragEnd = (args:DropResult) => {
    console.log("onDragEnd args➡️ ",args)
    const { destination,source,draggableId } = args;
    // onDragEnd 이벤트리스너의 args안에는 draggable요소의 id, destination, source 등의 정보가 들어있다.  #7.6

    if(!destination) return;
    // draggable요소가 제자리에서 drag되면 destination이 null을 반환한다.  #7.6

    if(destination.droppableId === source.droppableId){
    // 같은 droppable요소 안에서 drag and drop이 발생했을때
      setBoards((boards)=>{
        const copyBoards = [...boards[destination.droppableId]] // boards[destination.droppableId] => boards['items'||'carrier'||'bag'] 
        console.log("copyBoards➡️ ", copyBoards)
        copyBoards.splice(source.index,1)  // source는 drag전의 요소 정보
        copyBoards.splice(destination.index,0,draggableId)  // destination은 drop후의 요소 정보
        console.log("splice copyBoards➡️ ", copyBoards)
        return {
          ...boards,  // => { items:[...], carrier:[...], bag:[...]}  // {{ ... }}일때, 안쪽의 {}는 자동으로 벗겨진다.
          [destination.droppableId]:copyBoards  // => 'items'||'carrier'||'bag' : copyCategory 
        }
      })
    }
    if(destination.droppableId !== source.droppableId){
    // 다른 droppable요소 안에서 drag and drop이 발생했을때
    setBoards((boards)=>{
      const sourceBoard = [...boards[source.droppableId]]  // boards[source.droppableId] => boards['items'||'carrier'||'bag'] 
      const destinationBoard = [...boards[destination.droppableId]]  // boards[destination.droppableId] => boards['items'||'carrier'||'bag'] 
      console.log('sourceBoard➡️ ',sourceBoard)
      console.log('destinationBoard➡️ ',destinationBoard)
      sourceBoard.splice(source.index,1)  // source는 drag전의 요소 정보
      destinationBoard.splice(destination.index,0,draggableId)  // destination은 drop후의 요소 정보
      console.log('splice sourceBoard➡️ ',sourceBoard)
      console.log('splice destinationBoard➡️ ',destinationBoard)
      return {
        ...boards,  // => { items:[...], carrier:[...], bag:[...]}  // {{ ... }}일때, 안쪽의 {}는 자동으로 벗겨진다.
        [source.droppableId]: sourceBoard,  // => 'items'||'carrier'||'bag' : sourceBoard
        [destination.droppableId]: destinationBoard  // => 'items'||'carrier'||'bag' : destinationBoard
      }
    })
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(boards).map((category,index)=>
            <DroppableBoard key={category+index} boardId={category} items={ boards[category] } />
          )}
        </Boards>
      </Wrapper>
    </DragDropContext>
  )
}
export default App;


/*
<DragDropContext> = onDragEnd 이벤트리스너를 필수로 작성.  #7.2
                    onDragEnd 이벤트리스너는 DropResult 타입의 args를 parameter로 갖고있으며, args에는 draggable요소의 시작지점, 도착지점 등의 정보가 나와있다. (console.log(args))  #7.5

<Draggable> = draggableId, index 필수로 작성.  #7.2
              자식요소는 함수안에 작성하고, 함수는 'provided' parameter를 갖고있다.
              provided.innerRef는 자식요소의 ref속성에 작성해야한다.
              provided.draggableProps는 spread 문법으로 작성해야하고, 해당 요소는 drag가 가능한 요소가 된다.
              provided.dragHandleProps는 spread 문법으로 작성해야하고, 해당 요소를 클릭해야 drag 무빙이 가능하다.  #7.3
*/