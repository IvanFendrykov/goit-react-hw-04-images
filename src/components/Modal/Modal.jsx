import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import {
  ModalBackdrop,
  ModalDescr,
  ModalContent,
  ModalPicture,
} from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ image, alt, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', onClose);
    window.addEventListener('click', onClose);
    return () => window.removeEventListener('keydown', onClose);
  }, [onClose]);

  return createPortal(
    <ModalBackdrop>
      <ModalContent>
        <ModalPicture src={`${image}`} alt={`${alt}`} />
        <ModalDescr>{alt}</ModalDescr>
      </ModalContent>
    </ModalBackdrop>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  image: PropTypes.string,
  alt: PropTypes.string,
};
