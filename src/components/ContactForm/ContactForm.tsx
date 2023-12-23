import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {ApiContact} from '../../types';
import ButtonSpinner from '../Spinner/ButtonSpinner';
import {useDispatch} from 'react-redux';
import {setShowModal} from '../../store/contactsSlice';
import {defaultPhoto} from '../../lib/constants';

const initialState: ApiContact = {
  name: '',
  email: '',
  phone: '',
  photo: '',
};

interface Props {
  onSubmitContact: (contact: ApiContact) => void;
  existingContact?: ApiContact;
  isEdit?: boolean;
  isLoading?: boolean;
}

const ContactForm: React.FC<Props> = ({onSubmitContact, existingContact = initialState, isEdit = false, isLoading = false}) => {
  const [contact, setContact] = useState<ApiContact>(existingContact);
  const dispatch = useDispatch();
  
  const changeContact = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContact((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  
  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmitContact({...contact});
  };
  
  return (
    <form onSubmit={onFormSubmit} className="col-6 mx-auto">
      <h3 className="mb-3">
        {isEdit ? 'Edit contact information' : 'Create new contact'}
      </h3>
      <div className="form-group mb-3 d-flex">
        <label htmlFor="name" className="col-3">Name</label>
        <input
          required
          type="text"
          name="name"
          id="name"
          className="form-control"
          value={contact.name}
          onChange={changeContact}
        />
      </div>
      <div className="form-group mb-3 d-flex">
        <label htmlFor="phone" className="col-3">Phone</label>
        <input
          required
          type="text"
          name="phone"
          id="phone"
          className="form-control"
          value={contact.phone}
          onChange={changeContact}
        />
      </div>
      <div className="form-group mb-3 d-flex">
        <label htmlFor="email" className="col-3">email</label>
        <input
          required
          type="email"
          name="email"
          id="email"
          className="form-control"
          value={contact.email}
          onChange={changeContact}
        />
      </div>
      <div className="form-group mb-3 d-flex">
        <label htmlFor="photo" className="col-3">Photo</label>
        <input
          type="text"
          name="photo"
          id="photo"
          className="form-control"
          value={contact.photo}
          onChange={changeContact}
        />
      </div>
      <div className="d-flex mb-5 border-bottom pb-5">
        <p className="col-3">Photo preview</p>
        <img
          src={contact.photo ? contact.photo : defaultPhoto}
          alt={contact.name}
          className="w-25 h-auto border-secondary bg-body-tertiary rounded"
        />
      </div>
      <div>
        <button
          type="submit"
          className="btn btn-success me-3"
          disabled={isLoading}
        >
          {isLoading && <ButtonSpinner/>}
          {isEdit ? 'Save' : 'Create'}
        </button>
        <Link
          to="/"
          className="btn btn-dark"
          onClick={() => dispatch(setShowModal(false))}
        >
          Back to contacts
        </Link>
      </div>
    </form>
  );
};

export default ContactForm;