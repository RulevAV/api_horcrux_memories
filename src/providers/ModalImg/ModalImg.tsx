import React from "react";

type ModalImgType = {
    visible: boolean,
    close: () => void,
    src?: string
}

const ModalImg: React.FC<ModalImgType> = ({ visible, close, src }) => {
    const display = visible ? "block" : "none";
    return <div className="modal" style={{ display }}>
        <span className="close" onClick={close}>×</span>
        <img className="modal-content" src={src} />
        <div></div>
    </div>
}
export default ModalImg;