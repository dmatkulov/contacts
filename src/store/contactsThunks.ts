import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiContact, ApiContacts, ContactMutation} from '../types';
import axiosApi from '../axiosApi';

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

export const fetchOneContact = createAsyncThunk<ApiContact, string>(
  'contacts/fetchOne',
  async (id: string) => {
    const contactResponse = await axiosApi.get<ApiContact | null>('/contacts/' + id + '.json');
    const contact = contactResponse.data;
    
    if (contact === null) {
      throw new Error('Not found');
    }
    return contact;
  }
);