import { DragDropContext, DropResult } from 'react-beautiful-dnd';  // npm i react-beautiful-dnd --legacy-peer-deps, npm i --save-dev @types/react-beautiful-dnd --legacy-peer-deps
import { useRecoilState } from 'recoil'; 
import styled from 'styled-components';
import { boardState } from './atoms';
import DroppableBoard from './components/DroppableBoard';

const Container = styled.div`
  width: 100vw;
  max-width: 680px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 16px;
  transform: translateY(-50px)
`
const BoardContainer = styled.div`
  display: flex;
  justify-contents: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;


function App() {
  const [boards,setBoards] = useRecoilState(boardState)

  function onDragEnd(result:DropResult) {
    console.log("onDragEnd result➡️ ",result)
    const { destination,source } = result;
    if(!destination) return;
    // onDragEnd 이벤트리스너는 result를 parameter로 갖고있으며, result는 DropResult타입이다.  #7.5
    // result에는 draggableId, source(출발지), destination(도착지) 등이 들어있다.  #7.5
    // onDragEnd 이벤트리스너의 result안에는 draggable요소의 id, destination, source 등의 정보가 들어있다.  #7.6
    // draggable요소가 droppable 밖에서 drop되면 destination에 null을 반환한다.  #7.6
    
    if(destination.droppableId === source.droppableId){  // '준비물'board에서 '준비물'board로 drag and drop이 발생했을 때
      setBoards((boards)=>{  // boards => { item:[{key1:value1},{key2:value2},{key3:value3}}], carrier:[{key4:value4}], bag:[{key5:value5}] }
        const copyDestinationBoardItems = [...boards[destination.droppableId]]  // [{key1:value1},{key2:value2},{key3:value3}}]
        const sourceItem = copyDestinationBoardItems[source.index]  // {key1:value1}
        copyDestinationBoardItems.splice(source.index,1)  
        copyDestinationBoardItems.splice(destination.index,0,sourceItem) 
        // console.log("copyDestinationBoardItems➡️ ", copyDestinationBoardItems)
        // console.log("sourceItem➡️ ", sourceItem)
        return {
          ...boards,
          [destination.droppableId]:copyDestinationBoardItems 
        }
      })
    } else if(destination.droppableId !== source.droppableId){  // '준비물'board에서 '캐리어'board로 drag and drop이 발생했을 때
      setBoards((boards)=>{  // boards => { item:[{key1:value1},{key2:value2},{key3:value3}}], carrier:[{key4:value4}], bag:[{key5:value5}] }
        const sourceBoard = [...boards[source.droppableId]]  // [{key1:value1},{key2:value2},{key3:value3}}]
        const destinationBoard = [...boards[destination.droppableId]]  // [{key4:value4}]
        const sourceItem = sourceBoard[source.index]  // {key1:value1}
        sourceBoard.splice(source.index,1)  
        destinationBoard.splice(destination.index,0,sourceItem)
        console.log('splice sourceBoard➡️ ',sourceBoard)
        console.log('splice destinationBoard➡️ ',destinationBoard)
        return {
          ...boards,  
          [source.droppableId]: sourceBoard, 
          [destination.droppableId]: destinationBoard  
        }
      })
      }
  } 

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <Title>여행 체크리스트✈️</Title>
        <BoardContainer>
          {Object.keys(boards).map((boardName)=>
            <DroppableBoard key={boardName} boardId={boardName} items={ boards[boardName] } />
          )}
        </BoardContainer>
      </Container>
    </DragDropContext>
  )
}
export default App;


/*
<DragDropContext>는 onDragEnd 필수  #7.2
*/