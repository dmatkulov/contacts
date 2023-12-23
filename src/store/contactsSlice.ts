import {ApiContact, ContactMutation} from '../types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../app/store';
import {fetchContacts, fetchOneContact} from './contactsThunks';

interface ContactsState {
  contacts: ContactMutation[],
  contactItem: ApiContact | null;
  contactApi: ApiContact | null,
  createLoading: boolean;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  fetchError: boolean;
  updateLoading: boolean;
  deleteLoading: false | string;
  show: boolean;
}

const initialState: ContactsState = {
  contacts: [],
  contactItem: null,
  contactApi: null,
  createLoading: false,
  fetchLoading: false,
  fetchOneLoading: false,
  fetchError: false,
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
      state.fetchError = true;
    });
    builder.addCase(fetchOneContact.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchOneContact.fulfilled, (state, {payload: contact}) => {
      state.contactItem = contact;
    });
    builder.addCase(fetchOneContact.rejected, (state) => {
      state.fetchOneLoading = false;
    });
  }
});

export const contactsReducer = contactsSlice.reducer;
export const {
  setShowModal
} = contactsSlice.actions;
export const selectContacts = (state: RootState) => state.contacts.contacts;
export const selectOneContact = (state: RootState) => state.contacts.contactItem;
export const selectContactApi = (state: RootState) => state.contacts.contactApi;
export const selectFetchLoading = (state: RootState) => state.contacts.fetchLoading;
export const selectFetchOneLoading = (state: RootState) => state.contacts.fetchOneLoading;
export const selectCreateLoading = (state: RootState) => state.contacts.createLoading;
export const selectUpdateLoading = (state: RootState) => state.contacts.updateLoading;
export const selectDeleteLoading = (state: RootState) => state.contacts.deleteLoading;
export const selectModalShow = (state: RootState) => state.contacts.show;