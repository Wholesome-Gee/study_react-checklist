import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { categoriesState } from './atoms';
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
  const [categories,setCategories] = useRecoilState(categoriesState)

  const onDragEnd = (args:DropResult) => {
    console.log("onDragEnd args➡️ ",args)
    const { destination,source,draggableId } = args;
    // onDragEnd 이벤트리스너의 args안에는 draggable요소의 id, destination, source 등의 정보가 들어있다.  #7.6

    if(!destination) return;
    // draggable요소가 제자리에서 drag되면 destination이 null을 반환한다.  #7.6

    if(destination.droppableId === source.droppableId){
    // 같은 droppable요소 안에서 drag and drop이 발생했을때
      setCategories((categories)=>{
        const copyCategory = [...categories[destination.droppableId]] // categories[destination.droppableId] => categories['items'||'carrier'||'bag'] 
        console.log("copyCategory➡️ ", copyCategory)
        copyCategory.splice(source.index,1)  // source는 drag전의 요소 정보
        copyCategory.splice(destination.index,0,draggableId)  // destination은 drop후의 요소 정보
        console.log("splice copyCategory➡️ ", copyCategory)
        return {
          ...categories,  // => { items:[...], carrier:[...], bag:[...]}  // {{ ... }}일때, 안쪽의 {}는 자동으로 벗겨진다.
          [destination.droppableId]:copyCategory  // => 'items'||'carrier'||'bag' : copyCategory 
        }
      })
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(categories).map((category,index)=>
            <DroppableBoard key={category+index} boardId={category} items={ categories[category] } />
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