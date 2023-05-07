import PropTypes from 'prop-types';
import { Wrapper } from './ContactItem.styled';
import { useDeleteContactsMutation } from 'redux/contactsAPI';
import { ProgressBar } from 'react-loader-spinner';

export const ContactItem = ({ contact: { name, phone, id } }) => {
 const [func, {isLoading}] = useDeleteContactsMutation()
 
  const handleDelete = () => {
   func(id)
  };

  return (
    <>
      {(isLoading && (
          <ProgressBar
            height="40"
            width="80"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor="#F4442E"
            barColor="#51E5FF"
          />)
        ) || (
          <Wrapper>
            <span>
              {name}: {phone}
            </span>
            <button type="button" onClick={handleDelete}>
              Delete
            </button>
          </Wrapper>
        )}
    </>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
};
