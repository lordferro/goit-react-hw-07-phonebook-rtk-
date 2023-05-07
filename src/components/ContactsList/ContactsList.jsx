import { ContactItem } from 'components/ContactItem/ContactItem';
import { StyledContactsList } from './ContactsList.styled';

import { ProgressBar } from 'react-loader-spinner';
import { useFetchContactsQuery } from 'redux/contactsAPI';
import { useSelector } from 'react-redux';
import { selectFilter } from 'redux/selectors';

export const ContactsList = () => {
  const { data: contacts, isLoading } = useFetchContactsQuery();
  

  const filterQuery = useSelector(selectFilter);
  const filteredContacts = () => {
     return contacts.filter(contact =>
       contact.name.toLowerCase().includes(filterQuery.toLowerCase())
     ); 
  }
// видим что при фильтрации мы не отправляем новый запрос на сервер, пользуем кэщ автоматически
  // console.log(isFetching)
  // console.log(contacts)

  if (isLoading) return (
      <ProgressBar
        height="80"
        width="80"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="progress-bar-wrapper"
        borderColor="#F4442E"
        barColor="#51E5FF"
      />
    );
  return (
    <>
      {contacts.length === 0 && <p>no contacts</p>}
        <StyledContactsList>
          {filteredContacts().map(contact => {
            return (
              <li key={contact.id}>
                <ContactItem contact={contact} />
              </li>
            );
          })}
        </StyledContactsList>
      
    </>
  );
};
