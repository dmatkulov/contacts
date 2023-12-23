import React from 'react';
import {ContactMutation} from '../../types';
import {useAppDispatch} from '../../app/hooks';
import {fetchOneContact} from '../../store/contactsThunks';
import {setShowModal} from '../../store/contactsSlice';
import {defaultPhoto} from '../../lib/constants';

interface Props {
  contact: ContactMutation;
}

const ContactsItem: React.FC<Props> = ({contact}) => {
  const dispatch = useAppDispatch();
  
  const fetchContact = async () => {
    dispatch(setShowModal(true));
    await dispatch(fetchOneContact(contact.id));
  };
  
  return (
    <>
      <div className="card mb-3" onClick={fetchContact} style={{cursor: 'pointer'}}>
        <div className="card-body">
          <div className="d-flex align-items-center gap-3">
            <div className="overflow-hidden rounded-pill" style={{height: '88px', width: '88px'}}>
              <img
                src={contact.photo ? contact.photo : defaultPhoto}
                alt={contact.name}
                style={{width: '88px'}}
              />
            </div>
            <h5
              className="fw-bold"
            >
              {contact.name}
            </h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactsItem;