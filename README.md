# REACT로 여행 CHECK LIST 만들기

📍 강의 사이트 : NOMAD CORDER  
📍 강의 제목 : React JS 마스터클래스  
📍 강의 챕터 : #7 TRELLO CLONE  
📍 비고 :  
📍 라이브러리 :

- react + typescript : npx create-react-app checklist --template typescript
- styled-components : npm i styled-components, npm i --save-dev @types/styled-components
- recoil : npm i recoil
- react-hook-form : npm i react-hook-form
- react-icons : npm i react-icons --save
- react-beautiful-dnd : npm i react-beautiful-dnd --legacy-peer-deps, npm i --save-dev @types/react-beautiful-dnd --legacy-peer-deps


🚫 미사용 라이브러리

- react-router-dom : npm i react-router-dom, npm i --save-dev @types/react-router-dom
- react-query : npm i react-query (react-query는 React v18 이하에서 구동)
- react v18 다운그레이드 : npm i react@18 react-dom@18

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

### #7.2
**📗react-beautiful-dnd를 사용하여 Drag and Drops 기능 사용하기**
- npm i react-beautiful-dnd --legacy-peer-deps
- npm i --save-dev @types/react-beautiful-dnd --legacy-peer-deps
- App.jsx에 react-beautiful-dnd 세팅
```jsx
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
export default function App() {
  function onDragEnd() {}
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
```
  - `<DragDropContext>`는 onDragEnd 이벤트리스너와 자식요소가 필요하다.
  - `<Droppable>`은 droppableId prop이 필요하며 자식요소로는 함수를 갖는다.
  - `<Draggable>`은 draggableId, index prop이 필요하며 자식요소로는 함수를 갖는다.
