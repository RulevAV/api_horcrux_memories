import React, { createContext, useCallback, useContext, useState } from 'react';
import { ModalAdmin } from './ModalAdmin';

export interface ModalAdminShowProps {
  onApply(): void;
  email:string;
  dialogText?: string | React.ReactNode;
}

export interface ModalAdminInterface {
  show(confirmShowProps: ModalAdminShowProps): void;
}

const Context = createContext<ModalAdminInterface | undefined>(undefined);

export const ModalAdminProvider: React.FC = ({ children }) => {
  const [dialogParams, setdialogParams] = useState<ModalAdminShowProps | null>(null);

  const handleClose = () => {
    setdialogParams(null);
  };

  const handleShow = useCallback((data: ModalAdminShowProps) => {
    setdialogParams(data);
  }, []);

  const handleApply = () => {
    dialogParams?.onApply();
    handleClose();
  };

  const params: ModalAdminInterface = {
    show: handleShow,
  };

  return (
    <Context.Provider value={params}>
      <ModalAdmin
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

export const useModalAdmin = () => useContext(Context) as ModalAdminInterface;