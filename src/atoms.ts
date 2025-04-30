import { atom } from "recoil";

interface IBoard {
  [key:string]:string[]
}

export const boardState = atom<IBoard>({
  key:"items",
  default:{
    item:["드라이기","화장품","고데기","지갑","과자"],
    carrier:["옷","수건","상비약","책","충전기"],
    bag:["이어폰","핸드폰","보조배터리"]
  }
})
/*
App.tsx의 <DroppableBoard ... items={ categories[category] } /> categories[category]부분에서 type error가 뜬다.
typescript는 categoriesState를 "item", "carrier", "bag"을 key로 갖는 object이다.
허나, categories[category]를 본 typescript는 category를 "item", "carrier", "bag"이 아닌 단지 string으로 보기때문에, type error를 발생시킴.
그래서 [key:string]:string[] 으로 type을 해줌으로써 type error를 해결함.  #7.8
*/
