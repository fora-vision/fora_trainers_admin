import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { ReactComponent as CloseIcon } from "../icons/close.svg";
import * as S from "./styled";

function Modal({ width, isOpen, children, onClose, closeButton }) {

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => document.body.style.overflow = '';
  }, [isOpen])

  const modal = (
    <S.Overlay onMouseDown={onClose}>
      <S.Body style={{ width }} onMouseDown={e => e.stopPropagation()}>
        {closeButton ?? (
          <S.Close onClick={onClose}>
            <CloseIcon />
          </S.Close>
        )}
        {children}
      </S.Body>
    </S.Overlay>
  );

  return ReactDOM.createPortal(isOpen ? modal : null, document.body);
}

export default Modal;
