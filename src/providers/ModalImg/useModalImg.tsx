
import React, { createContext, useCallback, useContext, useState } from 'react';
import ModalImg from './ModalImg';

export interface ModalImgProps {
    src: string
}

export interface ModalImgInterface {
    show(confirmShowProps: ModalImgProps): void;
}

const Context = createContext<ModalImgInterface | undefined>(undefined);

export const ModalImgProvider: React.FC = ({ children }) => {
    const [dialogParams, setdialogParams] = useState<ModalImgProps | null>(null);

    const handleClose = () => {
        setdialogParams(null);
    };
    
    const handleShow = useCallback((data: ModalImgProps) => {
        setdialogParams(data);
    }, []);

    const params: ModalImgInterface = {
        show: handleShow,
    };

    return (
        <Context.Provider value={params}>
            <ModalImg close={handleClose} visible={!!dialogParams} src={dialogParams?.src} />
            {children}
        </Context.Provider>
    );
};

export const useModalImg = () => useContext(Context) as ModalImgInterface;