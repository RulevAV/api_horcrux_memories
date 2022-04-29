import { ReactElement } from "react";
import { Cracker } from "../../redux/QuestionPage/types";

export interface PaginationPropsType {
  page: number
  sizePage: number,
  portionsSize: number,
  idParent: string
  nameParent:string,
  changePage: (cracker: Cracker) => void,
}

export interface PaginationInterfaceType {
  Pagination: ReactElement | null;
  setPaginatio(confirmShowProps: PaginationPropsType): void;
}