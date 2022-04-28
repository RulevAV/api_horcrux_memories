
import React from 'react';
import { Alert } from 'react-bootstrap';

interface Props {
    show:boolean,
    setShow:(value:boolean)=>void,
    dialogText?: string | React.ReactNode,
    variant?:string
    title?:string
}

export const ModalAlert: React.FC<Props> = ({show,setShow, dialogText,variant,title }) =>{
      return !show? null :
        <Alert className='w-25 position-fixed bottom-0 end-0' style={{zIndex:1}} variant={variant} onClose={() => setShow(false)} dismissible>
          <Alert.Heading>{title}</Alert.Heading>
          {dialogText}
        </Alert>
  }