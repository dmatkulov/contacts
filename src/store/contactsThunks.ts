import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiContact, ApiContacts, Contact, ContactMutation} from '../types';
import axiosApi from '../axiosApi';
import {AppDispatch} from '../app/store';
import {setShowModal} from './contactsSlice';

export const createContact = createAsyncThunk<void, ApiContact>(
  'contacts/create',
  async (contact: ApiContact) => {
    await axiosApi.post('/contacts.json', contact);
  }
);
export const fetchContacts = createAsyncThunk<ContactMutation[], undefined>(
  'contacts/fetchAll',
  async () => {
    const contactsResponse = await axiosApi.get<ApiContacts | null>('/contacts.json');
    const contacts = contactsResponse.data;
    
    if (!contacts) {
      return [];
    }
    
    const fetchedContacts: ContactMutation[] = Object.keys(contacts).map((id) => {
      const contact = contacts[id];
      return {
        id,
        name: contact.name,
        photo: contact.photo
      };
    });
    return fetchedContacts;
  });

export const fetchOneContact = createAsyncThunk<Contact, string>(
  'contacts/fetchOne',
  async (id: string) => {
    const contactResponse = await axiosApi.get<ApiContact | null>('/contacts/' + id + '.json');
    const contact = contactResponse.data;
    
    if (contact === null) {
      throw new Error('Not found');
    }
    return {
      id,
      ...contact
    };
  }
);

export const fetchEditContact = createAsyncThunk<ApiContact, string>(
  'contacts/fetchEdit',
  async (id) => {
    const contactResponse = await axiosApi.get('/contacts/' + id + '.json');
    return contactResponse.data ?? null;
  }
);

interface UpdateContactParams {
  id: string;
  contact: ApiContact;
}

export const updateContact = createAsyncThunk<void, UpdateContactParams>(
  'contacts/update',
  async ({id, contact}) => {
    await axiosApi.put('/contacts/' + id + '.json', contact);
  }
);

export const deleteContact = createAsyncThunk<void, string, { dispatch: AppDispatch }>(
  'contacts/delete',
  async (id, thunkAPI) => {
    await axiosApi.delete('/contacts/' + id + '.json');
    thunkAPI.dispatch(setShowModal(false));
  }
);