import { useState, useEffect, useMemo } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';
import { IContact, INewContact } from 'type/contact';
import css from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState<IContact[]>(
    () => JSON.parse(window.localStorage.getItem('contacts') || 'null') ?? []
  );
  const addContact = (data: INewContact): void => {
    const newContact: IContact = {
      id: nanoid(),
      ...data,
    };
    setContacts([...contacts, newContact]);
  };

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const [filter, setFilter] = useState('');
  const handleSearch = ({ target: { value }}:React.ChangeEvent<HTMLInputElement>) => {
    setFilter(value);
  };
  const handleDelete = (id: string): void => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const normalizedFilter = filter.toLowerCase();
  const filterContacts = useMemo(() => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  }, [contacts, normalizedFilter]);
  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>Phonebook</h1>

      <ContactForm addContact={addContact} contacts={contacts} />

      <h2 className={css.subtitle}>Contacts</h2>
      <div className={css.container}>
        <Filter onChange={handleSearch} value={filter} />
        <ContactList onDelete={handleDelete} contacts={filterContacts} />
      </div>
    </div>
  );
};
