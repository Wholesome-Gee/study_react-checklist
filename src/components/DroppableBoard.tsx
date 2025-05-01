import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { Droppable } from "react-beautiful-dnd";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { IItem } from "../atoms";

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
  font-size: 18px;
`
const Form = styled.form`
  width: 100%;
  input {
    width: 100%
  }
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
  const { register, setValue, handleSubmit } = useForm<IForm>()
  const inputRef = useRef<HTMLInputElement>(null)  // useRef()는 특정 html 요소의 불필요한 재렌더링을 막아줌과 동시에 html 요소에 접근이 가능하다. 접근할 input에 ref={inputRef}  #7.13

  function onValid(data:IForm) {
    const { item } = data
    setValue('item',"")
  }
  // function onClick() {
  //   inputRef.current?.focus();  // inputRef.current에는 html요소에 대한 정보가 들어있다.  #7.13
  //   setTimeout(() => {
  //     inputRef.current?.blur();
  //   }, 5000);
  // }

  return(
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input {...register('item',{required:"물품을 입력하세요."})} type="text" placeholder={`${boardId}에 추가할 물품을 입력하세요.`}/>
      </Form>
      {/* <input ref={inputRef} placeholder="grab me" />
      <button onClick={onClick}>click me</button> */}
      <Droppable droppableId={boardId} isDropDisabled={false}>
        {(provided,snapshot)=>(
          <Area draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)} isDraggingOver={snapshot.isDraggingOver} ref={provided.innerRef}{...provided.droppableProps}>
            {items.map((item,index)=>(
              <DraggableCard itemId={item.id} itemName={item.name} index={index} key={item.id}/>
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