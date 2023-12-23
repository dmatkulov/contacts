import React from 'react';
import {useAppSelector} from '../../app/hooks';
import {selectContacts, selectFetchLoading} from '../../store/contactsSlice';
import ContactItem from './ContactItem';
import Spinner from '../Spinner/Spinner';

const ContactsLists: React.FC = () => {
  const contacts = useAppSelector(selectContacts);
  const isLoading = useAppSelector(selectFetchLoading);

  return contacts && (
    <div className="col-4 mx-auto">
      <div className="d-flex align-items-center justify-content-center">
        {isLoading && <Spinner/>}
      </div>
      {contacts.map((contact) => (
        <ContactItem
          contact={contact}
          key={contact.id}
        />
      ))}
    </div>
  );
};

export default ContactsLists;