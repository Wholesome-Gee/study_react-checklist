# REACT로 여행 CHECK LIST 만들기

📍 강의 사이트 : NOMAD CORDER  
📍 강의 제목 : React JS 마스터클래스  
📍 강의 챕터 : #7 TRELLO CLONE  
📍 비고 :  
📍 라이브러리 :

- react + typescript : npx create-react-app checklist --template typescript
- styled-components : npm i styled-components, npm i --save-dev @types/styled-components
- recoil : npm i recoil (React v18 이하에서 구동)
- react-hook-form : npm i react-hook-form
- react-icons : npm i react-icons --save
- react-beautiful-dnd : npm i react-beautiful-dnd --legacy-peer-deps, npm i --save-dev @types/react-beautiful-dnd --legacy-peer-deps
- react v18 다운그레이드 : npm i react@18 react-dom@18


🚫 미사용 라이브러리

- react-router-dom : npm i react-router-dom, npm i --save-dev @types/react-router-dom
- react-query : npm i react-query (React v18 이하에서 구동)

---

### #7.0

**📗string을 number로 바꾸고 싶을땐 string앞에 + 기호를 붙혀준다**

- "100" → string, +"100" → number

---

### #7.1

**📗recoil의 selector의 set기능**

```js
export const hoursSelector = selector<number>({
  key:"hours",
  get:({get})=>{
    ...
  },
  set:({set},value)=>{
    set(atom,value)
  }
  //외부 set은 parameter로 value를 받고 내부 set은 atom을 value로 바꾼다.
})
```

---

### #7.2 ~ #7.4

**📗react-beautiful-dnd를 사용하여 Drag and Drops 기능 사용하기**
- npm i react-beautiful-dnd --legacy-peer-deps
- npm i --save-dev @types/react-beautiful-dnd --legacy-peer-deps
- App.jsx에 react-beautiful-dnd 세팅
  ```jsx
  import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
  export default function App() {
    function onDragEnd(args:DropResult){ 
      // console.log(args)
    }
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='one'>
          {(provided)=>(
            <ul ref={provided.innerRef} {...droppableProps}>
              <Draggable draggableId='first' index={0}>
                {(provided)=><li ref={provided.innerRef}{...provided.draggableProps}{...provided.dragHandleProps}>One</li>}
              </Draggable>
              <Draggable draggableId='second' index={1}>
                {(provided)=><li ref={provided.innerRef}{...provided.draggableProps}{...provided.dragHandleProps}>Two</li>}
              </Draggable>
            </ul>
            {provided.placeholder}
          )}
        </Droppable>
      </DragDropContext>
    )
  }
  ```
  - `<DragDropContext>`
    - onDragEnd 이벤트리스너를 필수로 작성한다.  (#7.2)
    - onDragEnd 이벤트리스너는 DropResult 타입의 args를 parameter로 갖고있으며, args에는 draggable요소의 시작지점, 도착지점 등의 정보가 나와있다. (console.log(args))  (#7.5)
  - `<Droppable>`
    - droppableId를 필수로 작성한다.  (#7.2)
    - 자식요소는 함수안에 작성하고, 함수는 'provided' parameter를 갖고있다.  (#7.3)
    - provided.innerRef는 자식요소의 ref속성에 작성해야한다.  (#7.3)
    - provided.droppableProps는 spread 문법으로 작성해야하고, 해당 요소는 drop이 가능한 요소가 된다.  (#7.3)
    - provided.placeholder는 draggable요소의 drag에 따라 변화하는 droppable요소의 사이즈 변화를 막아준다.  (#7.4)
  - `<Draggable>`
    - draggableId, index prop이 필요하며 자식요소로는 함수를 갖는다.  (#7.2)
    - 자식요소는 함수안에 작성하고, 함수는 'provided' parameter를 갖고있다.  (#7.3)
    - provided.innerRef는 자식요소의 ref속성에 작성해야한다.  (#7.3)
    - provided.draggableProps는 spread 문법으로 작성해야하고, 해당 요소는 drag가 가능한 요소가 된다.  (#7.3)
    - provided.dragHandleProps는 spread 문법으로 작성해야하고, 해당 요소를 클릭해야 drag 무빙이 가능하다.  (#7.3)

--- 

### #7.7

**📗React.memo(component)를 사용하여 component의 불필요한 재렌더링을 막기**
