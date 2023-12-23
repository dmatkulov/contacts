import React, {useEffect} from 'react';
import ContactsLists from '../../components/ContactsList/ContactsLists';
import {useAppDispatch} from '../../app/hooks';
import {fetchContacts} from '../../store/contactsThunks';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    void dispatch(fetchContacts());
  }, [dispatch]);
  
  return (
    <div>
      <h1 className="text-center mb-5"
      >
        Contacts
      </h1>
      <ContactsLists/>
    </div>
  );
};

export default Home;