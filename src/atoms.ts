import { atom } from "recoil";

export interface IItem {
  id: number;
  name: string;
  // IItem타입은 id와 name으로 구성되었고 id는 number, name은 string 타입의 데이터를 값으로 받는다.
} 
interface IBoard {
  [key:string]:IItem[]
  // boardState는 string타입의 key와 IItem타입의 배열로 구성되어있다.
}
export const boardState = atom<IBoard>({
  key:"items",
  default:{
    핸드백:[],
    백팩:[],
    캐리어:[]
  }
})
/*
App.tsx의 <DroppableBoard ... items={ boards[boardName] } /> boards[boardName]부분에서 type error가 뜬다.
typescript는 boardState가 "준비물", "캐리어", "가방"을 key로 갖는 object로 알고있다.
허나, boards[boardName]을 본 typescript는 boardName을 "준비물", "캐리어", "가방"이 아닌 단지 string으로 보기때문에, type error를 발생시킴.
그래서 [key:string]:string[] 으로 type을 해줌으로써 type error를 해결함.  #7.8
*/
