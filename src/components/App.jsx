import React from 'react';
import { StyledWrapper } from './App.styled';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(window.localStorage.getItem('contactsData'));
    if (contacts?.length) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      window.localStorage.setItem(
        'contactsData',
        JSON.stringify(this.state.contacts)
      );
    }
  }

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleAddContact = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  handleFilterInput = e => {
    this.setState({ filter: e.target.value });
  };

  getFilteredDate = () => {
    if (this.state.filter) {
      return this.state.contacts.filter(contact =>
        contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
      );
    }
    return this.state.contacts;
  };

  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '10px 50px',
          flexDirection: 'column',
          fontSize: 28,
          color: '#010101',
        }}
      >
        <StyledWrapper>
          <h1>Phonebook</h1>
          <ContactForm
            contacts={this.state.contacts}
            handleAddContact={this.handleAddContact}
          />
          <h2>Contacts</h2>
          <Filter
            filterState={this.state.filter}
            onFilter={this.handleFilterInput}
          />
          <ContactList
            contacts={this.getFilteredDate()}
            onDeleteContact={this.deleteContact}
          />
        </StyledWrapper>
      </div>
    );
  }
}
