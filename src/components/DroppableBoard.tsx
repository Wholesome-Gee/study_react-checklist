import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { Droppable } from "react-beautiful-dnd";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { boardState, IItem } from "../atoms";
import { useSetRecoilState } from "recoil";

const Board = styled.div`
  width: 300px;
  min-height: 300px;
  padding: 20px 10px;
  display:flex;
  flex-direction: column;
  over-flow: hidden;
  border: 5px solid #4282DA;
  border-radius: 8px;
  background-color: ${(props) => props.theme.boardColor};
`;
const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 20px;
  font-size: 20px;
`
const Form = styled.form`
  width: 100%;
  margin-bottom: 20px;
  position: relative;
  input {
    width: 100%;
    padding: 4px 46px 8px 4px;
    border: none;
    border-bottom: 1px solid black;
    outline: none;
    background-color: transparent;
  }
  button {
    width: 40px;
    border: none;
    outline: none;
    position: absolute;
    top: 0;
    right: 2px;
    color: white;
    background-color: #4282DA;
  }
`
const Area = styled.div<IArea>`
padding: 20px;
flex-grow: 1;
border-radius: 4px;
background-color: ${
  props=> 
    props.isDraggingOver 
    ? "#F7E89E"
    : props.draggingFromThisWith 
      ? "#E0E0E0" 
      : 'transparent'
};
`

interface IDroppableBoard {
  items:IItem[],
  boardId:string
}
interface IForm {
  item: string
}
interface IArea {
  isDraggingOver: boolean,
  draggingFromThisWith: boolean
}

function DroppableBoard({items,boardId}:IDroppableBoard) {
  const setBoards = useSetRecoilState(boardState)
  const { register, setValue, handleSubmit } = useForm<IForm>()
  
  function onValid(data:IForm) {
    const newItem = {
      id: Date.now(),
      name: data.item
    }
    setBoards((boards)=>{
      return {
        ...boards,
        [boardId]: [newItem, ...boards[boardId]]
      }
    })
    setValue('item',"")
  }
  /*
    const inputRef = useRef<HTMLInputElement>(null) -> useRef()는 특정 html 요소의 불필요한 재렌더링을 막아줌과 동시에 html 요소에 접근이 가능하다. 접근할 input에 ref={inputRef}  #7.13
    function onClick() {
      inputRef.current?.focus();  // inputRef.current에는 html요소에 대한 정보가 들어있다.  #7.13
      setTimeout(() => {
        inputRef.current?.blur();
      }, 5000);
    }
  */

  return(
    <Board>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input {...register('item',{required:"물품을 입력하세요."})} type="text" placeholder={`물품을 입력하세요.`}/>
        <button>추가</button>
      </Form>
      {/* 
        <input ref={inputRef} placeholder="grab me" />
        <button onClick={onClick}>click me</button> 
      */}
      <Droppable droppableId={boardId}>
        {(provided,snapshot)=>(
          <Area 
            ref={provided.innerRef}{...provided.droppableProps}  // Area를 drop가능한 요소로 만들어준다. 
            draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}  
            isDraggingOver={snapshot.isDraggingOver}
          >
            {items.map((item,index)=>(
              <DraggableCard itemId={item.id} itemName={item.name} index={index} includeBoard={boardId} key={item.id}/>
            ))}
            {provided.placeholder}
          </Area>              
        )}
      </Droppable>
    </Board>
  )
}

export default DroppableBoard


/*
113. <Droppable> = droppableId 필수  #7.2
114. <Droppable>의 자식요소는 함수안에 작성하고, 함수는 'provided','snapshot' parameter를 갖고있다. (snapshot은 #7.11)
116. ref={provided.innerRef}{...provided.droppableProps}는 자식요소를 drop이 가능한 요소로 만들어준다. #7.3
117. snapshot.draggingFromThisWith는 draggable요소가 어떤 droppable요소 위에서 드래그 되고 있는지 반환한다.  #7.11
118. snapshot.isDraggingOver는 draggable요소가 특정 droppable요소 위에 있는지 여부를 나타낸다.  #7.11
123. provided.placeholder는 draggable요소의 drag에 따른 droppable요소의 사이즈 변화를 막아준다.  #7.4
              snapshot.isDraggingOver는 draggable요소가 특정 droppable요소 위에서 드래깅 되고 있는지 여부  #7.11
*/