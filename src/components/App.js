import { Component } from 'react';
import { Notify } from 'notiflix';
import ContactForm from './ContactForm/Contactform';
import ContactList from './ContactList';
import Filter from './Filter';

export class App extends Component {
  state = {
    contacts: [
      { name: 'Edward Castro', number: '1666-060606', id: 'qucrmobV8' },
      { name: 'Sahar Anderson', number: '1666-060607', id: 'qucrmobV9' },
      { name: 'Hassan Ramos', number: '1666-060608', id: 'qucrmob10' },
      { name: 'Keane Jefferson', number: '1666-060609', id: 'qucrmob11' },
      { name: 'Mikayla Moore', number: '1666-060610', id: 'qucrmob12' },
      { name: 'Tammy Peterson', number: '1666-060611', id: 'qucrmob13' },
      { name: 'Andrew Ford', number: '1666-060612', id: 'qucrmob14' },
      { name: 'April Lawrence', number: '1666-060613', id: 'qucrmob15' },
    ],
    filter: '',
  };

  // -------------------------//
  // Add and Delete contact   //
  // -------------------------//
  addContact = (newContact, resetForm) => {
    const findContact = this.state.contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (findContact) {
      Notify.failure(`${newContact.name} is already in contact`);
      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact],
    }));
    resetForm();
  };

  deleteContact = idForDelete => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== idForDelete),
    }));
  };

  // -------------------------//
  // Filter                   //
  // -------------------------//
  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  // -------------------------//
  // Render                   //
  // -------------------------//
  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
