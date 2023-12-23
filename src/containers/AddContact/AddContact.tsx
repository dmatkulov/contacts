import React from 'react';
import ContactForm from '../../components/ContactForm/ContactForm';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectCreateLoading} from '../../store/contactsSlice';
import {ApiContact} from '../../types';
import {createContact, fetchContacts} from '../../store/contactsThunks';

const AddContact: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const createLoading = useAppSelector(selectCreateLoading);
  
  const onSubmit = async (contact: ApiContact) => {
      await dispatch(createContact(contact));
      await dispatch(fetchContacts());
      navigate('/');
  };
  
  return (
    <div>
      <ContactForm
        onSubmitContact={onSubmit}
        isLoading={createLoading}
      />
    </div>
  );
};

export default AddContact;