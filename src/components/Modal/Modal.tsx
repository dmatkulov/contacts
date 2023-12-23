import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectModalShow, setShowModal} from '../../store/contactsSlice';
import ContactInfo from '../ContactsList/ContactInfo';

const Modal: React.FC = () => {
  const dispatch = useAppDispatch();
  const show = useAppSelector(selectModalShow);
  
  const onInnerClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };
  
  const onClose = () => {
    dispatch(setShowModal(false));
  };
  
  return show && (
    <>
      <Backdrop show={show} onClick={onClose}/>
      <div className="modal show" style={{display: show ? 'block' : 'none'}} onClick={onClose}>
        <div className="modal-dialog" onClick={onInnerClick}>
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Contact info</h1>
              <button type="button" className="btn btn-close" onClick={onClose}></button>
            </div>
            <ContactInfo/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;