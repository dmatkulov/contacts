import React, {useEffect} from 'react';
import ContactForm from '../../components/ContactForm/ContactForm';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectContact, selectFetchOneLoading, selectUpdateLoading} from '../../store/contactsSlice';
import {useNavigate, useParams} from 'react-router-dom';
import {fetchEditContact, updateContact} from '../../store/contactsThunks';
import {ApiContact} from '../../types';
import Spinner from '../../components/Spinner/Spinner';

const EditContact: React.FC = () => {
  const dispatch = useAppDispatch();
  const contactLoading = useAppSelector(selectFetchOneLoading);
  const isUpdating = useAppSelector(selectUpdateLoading);
  const contact = useAppSelector(selectContact);
  const navigate = useNavigate();
  
  const {id} = useParams() as { id: string };
  
  useEffect(() => {
    dispatch(fetchEditContact(id));
  }, [dispatch, id]);
  
  if (!contact) {
    return;
  }
  
  const onSubmit = async (contact: ApiContact) => {
    await dispatch(updateContact({id, contact}));
    navigate('/');
  };
  
  let form = <Spinner/>;
  
  if (!contactLoading) {
    if (contact) {
      form = (
        <ContactForm
          onSubmitContact={onSubmit}
          existingContact={contact}
          isEdit
          isLoading={isUpdating}
        />
      );
    } else {
      form = <h4>Not found!</h4>;
    }
  }
  
  return (
    <div>
      {form}
    </div>
  );
};

export default EditContact;