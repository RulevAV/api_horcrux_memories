
import React from 'react';
import { Button, Modal } from 'react-bootstrap';

interface Props {
    onSuccess(): void;

    email?: string;

    show: boolean;

    handleClose(): void;

    dialogText?: string | React.ReactNode;
}

export const ModalWindow: React.FC<Props> = ({ onSuccess, email, show, handleClose, dialogText }) => {

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{email}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {dialogText}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Закрыть
                </Button>
                <Button variant="primary" onClick={onSuccess}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    )
};