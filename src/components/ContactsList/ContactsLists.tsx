import React from 'react';
import {useAppSelector} from '../../app/hooks';
import {selectContacts, selectFetchLoading} from '../../store/contactsSlice';
import Spinner from '../Spinner/Spinner';
import Modal from '../Modal/Modal';
import ContactInfo from './ContactInfo';
import ContactsItem from './ContactsItem';

const ContactsLists: React.FC = () => {
  const contacts = useAppSelector(selectContacts);
  const isLoading = useAppSelector(selectFetchLoading);

  return (
    <div className="col-4 mx-auto">
      <div className="d-flex align-items-center justify-content-center">
        {isLoading && <Spinner/>}
      </div>
      {contacts.map((contact) => (
        <ContactsItem
          contact={contact}
          key={contact.id}
        />
      ))}
      <Modal>
        <ContactInfo/>
      </Modal>
    </div>
  );
};

export default ContactsLists;