import React from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  selectDeleteLoading,
  selectFetchOneLoading,
  selectOneContact,
} from '../../store/contactsSlice';
import {deleteContact, fetchContacts} from '../../store/contactsThunks';
import Spinner from '../Spinner/Spinner';
import ButtonSpinner from '../Spinner/ButtonSpinner';
import {Link} from 'react-router-dom';
import {defaultPhoto} from '../../lib/constants';

const ContactInfo: React.FC = () => {
  const contact = useAppSelector(selectOneContact);
  const dispatch = useAppDispatch();
  const contactLoading = useAppSelector(selectFetchOneLoading);
  const deleteLoading = useAppSelector(selectDeleteLoading);
  
  const onDeleteContact = async (id: string) => {
    await dispatch(deleteContact(id));
    await dispatch(fetchContacts());
  };
  
  return contact && (
    <>
      {contactLoading ? <Spinner/> : (
        <div className="modal-body">
          <div className="card mb-3">
            <div className="card-body row d-flex align-items-center">
              <div className="col-3">
                <img src={contact.photo ? contact.photo : defaultPhoto} alt={contact.name} className="img-fluid w-100"/>
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
            <Link
              to={'/contacts/' + contact.id + '/edit'}
              className="mx-0 btn btn-primary"
            >
              Edit
            </Link>
            <button
              className={deleteLoading ? 'mx-0 btn btn-secondary' : 'mx-0 btn btn-danger'}
              onClick={() => onDeleteContact(contact.id)}
              disabled={deleteLoading ? deleteLoading === contact.id : false}
            >
              {deleteLoading && deleteLoading === contact.id && <ButtonSpinner/>}
              Delete
            </button>
          </div>
        </div>
      )}
      {!contact && (
        <p>Contact not found!</p>
      )}
    </>
  );
};

export default ContactInfo;