import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    backgroundColor:string,
    boardColor:string,
    cardColor:string,
  }
}

// theme 설정할 때 해당코드 복사해서 수정