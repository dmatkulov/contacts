export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo: string;
}

export type ApiContact = Omit<Contact, 'id'>

export type ContactMutation = Omit<Contact, 'email' | 'phone'>

export interface ApiContacts {
  [id: string]: ApiContact;
}