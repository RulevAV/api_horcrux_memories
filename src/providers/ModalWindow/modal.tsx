import React, { createContext, useCallback, useContext, useState } from 'react';
import { ModalWindow } from './ModalWindow';

export interface ModalWindowShowProps {
  onApply(value:any): void;
  email:string;
  dialogText?: string | React.ReactNode;
}

export interface ModalWindowInterface {
  show(confirmShowProps: ModalWindowShowProps): void;
  setData(data:any):void
}

const Context = createContext<ModalWindowInterface | undefined>(undefined);

export const ModalWindowProvider: React.FC = ({ children }) => {
  const [dialogParams, setdialogParams] = useState<ModalWindowShowProps | null>(null);
  const [data,setData] = useState();

  const handleClose = () => {
    setdialogParams(null);
  };

  const handleShow = useCallback((data: ModalWindowShowProps) => {
    setdialogParams(data);
  }, []);

  const handleApply = () => {
    dialogParams?.onApply(data);
    handleClose();
  };

  const params: ModalWindowInterface = {
    show: handleShow,
    setData
  };

  return (
    <Context.Provider value={params}>
      <ModalWindow
        onSuccess={handleApply}
        email={dialogParams?.email}
        show={!!dialogParams}
        handleClose={handleClose}
        dialogText={dialogParams?.dialogText}
      />
      {children}
    </Context.Provider>
  );
};

export const useModalWindow = () => useContext(Context) as ModalWindowInterface;