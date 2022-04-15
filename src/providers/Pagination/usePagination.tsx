import React, { createContext, ReactElement, useContext, useEffect, useState } from 'react';
import { initialState } from './initial-values';
import { Pagination } from './Pagination';
import { PaginationInterfaceType, PaginationPropsType } from './types';

const Context = createContext<PaginationInterfaceType | undefined>(undefined);

export const PaginationProvider: React.FC = ({ children }) => {
  const [PaginationParams, setPaginationParams] = useState<PaginationPropsType>(initialState);
  const [newPages, setNewPages] = useState(PaginationParams.page);

  useEffect(()=>{
    setNewPages(PaginationParams.page);
  },[PaginationParams.page]);

  const PaginationComponent = PaginationParams.sizePage!=0 ? <Pagination {...PaginationParams} newPages={newPages} setNewPages={setNewPages} /> : null;

  const params: PaginationInterfaceType = {
    Pagination: PaginationComponent,
    setPaginatio: setPaginationParams
  };

  return (
    <Context.Provider value={params}>
      {children}
    </Context.Provider>
  );
};

export const usePagination = () => useContext(Context) as PaginationInterfaceType;