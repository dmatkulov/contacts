import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectModalShow, selectOneContact, setShowModal} from '../../store/contactsSlice';

const Modal: React.FC = () => {
  const contact = useAppSelector(selectOneContact);
  const dispatch = useAppDispatch();
  const show = useAppSelector(selectModalShow);
  
  const onInnerClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };
  
  const onClose = () => {
    dispatch(setShowModal(false));
  };
  
  if (!contact) {
    return;
  }
  
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
              {contact && (
                <div className="modal-body">
                    <div className="card mb-3">
                      <div className="card-body row d-flex align-items-center">
                        <div className="col-3">
                          <img src={contact.photo} alt={contact.name} className="img-fluid rounded-circle w-100"/>
                        </div>
                        <h4 className="col-9 card-title">
                          {contact.name}
                        </h4>
                      </div>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                          Email : {contact.email}
                        </li>
                        <li className="list-group-item">
                          Phone : {contact.phone}
                        </li>
                      </ul>
                    </div>
                  <div className="d-flex gap-2 align-items-center justify-content-end">
                    <button className="mx-0">Edit</button>
                    <button className="mx-0">Delete</button>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;