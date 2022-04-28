
import React from 'react';
import { Button, Modal } from 'react-bootstrap';

interface Props {
    onSuccess(): void;

    title?: string;

    show: boolean;

    handleClose(): void;

    dialogText?: string | React.ReactNode;

    buttons?: Array<string>
}

export const ModalWindow: React.FC<Props> = ({ onSuccess, title, show, handleClose, dialogText, buttons }) => {
    let btns = null;
    if (buttons) {
        btns = <>
            <Button variant="secondary" onClick={handleClose}>
                {buttons[0]}
            </Button>
            <Button variant="primary" onClick={onSuccess}>
                {buttons[1]}
            </Button>
        </>
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {dialogText}
            </Modal.Body>
            <Modal.Footer>
               {btns}

            </Modal.Footer>
        </Modal>
    )
};