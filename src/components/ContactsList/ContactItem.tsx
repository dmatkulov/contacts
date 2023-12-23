import React, {useCallback} from 'react';
import {ContactMutation} from '../../types';
import {useAppDispatch} from '../../app/hooks';
import {fetchOneContact} from '../../store/contactsThunks';
import {setShowModal} from '../../store/contactsSlice';

interface Props {
  contact: ContactMutation;
}

const ContactItem: React.FC<Props> = ({contact}) => {
  const dispatch = useAppDispatch();
  
  const fetchContact = useCallback(async () => {
    await dispatch(fetchOneContact(contact.id));
    dispatch(setShowModal(true));
  }, [contact.id, dispatch]);
  
  return (
    <>
      <div className="card mb-3" onClick={fetchContact}>
        <div className="card-body">
          <div className="d-flex align-items-center gap-3">
            <div className="overflow-hidden">
              <img
                src={contact.photo}
                alt={contact.name}
                className="rounded-circle img-thumbnail"
                style={{height: '88px', width: '88px'}}
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

export default ContactItem;