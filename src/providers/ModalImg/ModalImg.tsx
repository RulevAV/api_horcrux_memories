import React from "react";

type ModalImgType = {
    visible: boolean,
    close: () => void,
    src?: string
}

const ModalImg: React.FC<ModalImgType> = ({ visible, close, src }) => {
    const display = visible ? "block" : "none";
    return <div className="modal" style={{ display }} onClick={close}>
        <span className="close" onClick={close}>×</span>
        <img className="modal-content" src={src} alt=""/>
        <div></div>
    </div>
}
export default ModalImg;