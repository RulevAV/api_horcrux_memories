import {Spinner} from "react-bootstrap";
import React from "react";

export const LockScreen=()=>{
    return   <div className="content-blocker d-flex align-items-center justify-content-center">
        <Spinner animation="border"  style={{width:"10rem",height:"10rem"}} variant="primary" />
    </div>
}