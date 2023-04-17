import Notiflix from 'notiflix';
import { useState } from 'react';

import css from './ContactForm.module.css';

import { IContact, ContactWithoutId } from 'type/contact';

interface IProps {
  contacts: IContact[],
  addContact: (data: ContactWithoutId) => void
}

export const ContactForm = ({ contacts, addContact }: IProps) => {
  const [name, setName] = useState('');
  const handleChangeName = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => {
    setName(value);
  };

  const [number, setNumber] = useState('');
  const handleChangeNumber = ({ target: { value } }:React.ChangeEvent<HTMLInputElement>): void => {
    setNumber(value);
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();

    const hasSameName = contacts.some(contact => contact.name === name);
    hasSameName
      ? Notiflix.Notify.warning(`${name} is already in contacts`, {
          position: 'center-center',
          cssAnimationStyle: 'zoom',
        })
      : addContact({ name, number });
    
    hasSameName || setName('');
    hasSameName || setNumber('');
    

  };
  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.wrapper}>
        <label className={css.label}>
          Name
          <input
            className={css.input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={handleChangeName}
          />
        </label>

        <label className={css.label}>
          Number
          <input
            className={css.input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={handleChangeNumber}
          />
        </label>
      </div>
      <button className={css.button}>Add Contact</button>
    </form>
  );
};


