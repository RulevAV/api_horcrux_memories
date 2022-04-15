import React, { createContext, useCallback, useContext, useState } from 'react';
import { ModalAlert } from './ModalAlert';

export interface ModalAlertShowProps {
  variant?:string
  dialogText: string | React.ReactNode;
  title:string
}

export interface ModalAlertInterface {
  show(confirmShowProps: ModalAlertShowProps): void;
}

const Context = createContext<ModalAlertInterface | undefined>(undefined);

export const ModalAlertProvider: React.FC = ({ children }) => {
  const [show, setShow] = useState(false);
  const [dialogParams, setdialogParams] = useState<ModalAlertShowProps | null>(null);

  const handleShow = useCallback((data: ModalAlertShowProps) => {
    setShow(true);
    setdialogParams(data);
  }, []);

  const params: ModalAlertInterface = {
    show: handleShow,
  };

  return (
    <Context.Provider value={params}>
      <ModalAlert
        title={dialogParams?.title}
        variant={dialogParams?.variant}
        show={show}
        dialogText={dialogParams?.dialogText}
        setShow={setShow}
      />
      {children}
    </Context.Provider>
  );
};

export const useModalAlert = () => useContext(Context) as ModalAlertInterface;