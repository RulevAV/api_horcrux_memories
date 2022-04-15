import { ReactElement } from "react";

export interface PaginationPropsType {
    page: number
    sizePage: number,
    portionsSize: number
    changePage: (page: number, portionsSize: number) => void
  }

  export interface PaginationInterfaceType {
    Pagination: ReactElement | null;
    setPaginatio(confirmShowProps: PaginationPropsType): void;
  }