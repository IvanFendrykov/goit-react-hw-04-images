import { ListItem, Picture } from './ImageGalleryItem.styled';
import{useState}  from 'react';
import PropTypes from 'prop-types';
import {Modal} from 'components/Modal/Modal';

export const ImageGalleryItem = ({
  image: {largeImageURL, webformatURL, tags } 
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
};

  const closeModal = ({ code, target: { nodeName } }) => {
    if (code === 'Escape' || nodeName === 'DIV') {
      setIsModalOpen(false);
    }
  };
    return (
      <ListItem>
        <span onClick={openModal}>
          <Picture src={`${webformatURL}`} alt={`${tags}`} />
        </span>
        {isModalOpen && (
          <Modal image={largeImageURL} alt={tags} onClose={closeModal} />
        )}
      </ListItem>
    );
  }


ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string,
    webformatURL: PropTypes.string,
    tags: PropTypes.string,
  }),
};