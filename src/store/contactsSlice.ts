import {ApiContact, Contact, ContactMutation} from '../types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../app/store';
import {
  createContact,
  deleteContact,
  fetchContacts,
  fetchEditContact,
  fetchOneContact,
  updateContact
} from './contactsThunks';

interface ContactsState {
  contacts: ContactMutation[],
  contactInfo: Contact | null;
  contact: ApiContact | null,
  createLoading: boolean;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  updateLoading: boolean;
  deleteLoading: false | string;
  show: boolean;
}

const initialState: ContactsState = {
  contacts: [],
  contactInfo: null,
  contact: null,
  createLoading: false,
  fetchLoading: false,
  fetchOneLoading: false,
  updateLoading: false,
  deleteLoading: false,
  show: false,
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setShowModal: (state, action: PayloadAction<boolean>) => {
      state.show = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContacts.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchContacts.fulfilled, (state, {payload: contacts}) => {
      state.fetchLoading = false;
      state.contacts = contacts;
    });
    builder.addCase(fetchContacts.rejected, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(fetchOneContact.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchOneContact.fulfilled, (state, {payload: contact}) => {
      state.fetchOneLoading = false;
      state.contactInfo = contact;
    });
    builder.addCase(fetchOneContact.rejected, (state) => {
      state.fetchOneLoading = false;
    });
    builder.addCase(deleteContact.pending, (state, {meta}) => {
      state.deleteLoading = meta.arg;
    });
    builder.addCase(deleteContact.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteContact.rejected, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(createContact.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createContact.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createContact.rejected, (state) => {
      state.createLoading = false;
    });
    builder.addCase(fetchEditContact.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchEditContact.fulfilled, (state, {payload: contact}) => {
      state.fetchOneLoading = false;
      state.contact = contact;
    });
    builder.addCase(fetchEditContact.rejected, (state) => {
      state.fetchOneLoading = false;
    });
    builder.addCase(updateContact.pending, (state) => {
      state.updateLoading = true;
    });
    builder.addCase(updateContact.fulfilled, (state) => {
      state.updateLoading = false;
    });
    builder.addCase(updateContact.rejected, (state) => {
      state.updateLoading = false;
    });
  }
});

export const contactsReducer = contactsSlice.reducer;
export const {
  setShowModal
} = contactsSlice.actions;
export const selectContacts = (state: RootState) => state.contacts.contacts;
export const selectOneContact = (state: RootState) => state.contacts.contactInfo;
export const selectContact = (state: RootState) => state.contacts.contact;
export const selectFetchLoading = (state: RootState) => state.contacts.fetchLoading;
export const selectFetchOneLoading = (state: RootState) => state.contacts.fetchOneLoading;
export const selectCreateLoading = (state: RootState) => state.contacts.createLoading;
export const selectUpdateLoading = (state: RootState) => state.contacts.updateLoading;
export const selectDeleteLoading = (state: RootState) => state.contacts.deleteLoading;
export const selectModalShow = (state: RootState) => state.contacts.show;