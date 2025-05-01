import { atom } from "recoil";

export interface IItem {
  id: number;
  name: string;
  // item은 id와 name으로 구성된 객체다.
} 
interface IBoard {
  [key:string]:IItem[]
  // board는 string key와 item배열로 구성된 객체다.
}
export const boardState = atom<IBoard>({
  key:"items",
  default:{
    item:[],
    carrier:[],
    bag:[]
  }
})
/*
App.tsx의 <DroppableBoard ... items={ categories[category] } /> categories[category]부분에서 type error가 뜬다.
typescript는 categoriesState를 "item", "carrier", "bag"을 key로 갖는 object이다.
허나, categories[category]를 본 typescript는 category를 "item", "carrier", "bag"이 아닌 단지 string으로 보기때문에, type error를 발생시킴.
그래서 [key:string]:string[] 으로 type을 해줌으로써 type error를 해결함.  #7.8
*/
