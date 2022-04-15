
import React, { useState } from 'react';
import { Alert, Button, Modal } from 'react-bootstrap';

interface Props {
    show:boolean,
    setShow:(value:boolean)=>void,
    dialogText?: string | React.ReactNode,
    variant?:string
    title?:string
}

export const ModalAlert: React.FC<Props> = ({show,setShow, dialogText,variant,title }) =>{
      return !show? null :
        <Alert variant={variant} onClose={() => setShow(false)} dismissible>
          <Alert.Heading>{title}</Alert.Heading>
          {dialogText}
        </Alert>
  }