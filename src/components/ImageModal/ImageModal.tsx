import Modal from "react-modal";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import css from "./ImageModal.module.css";
import { useEffect } from "react";
import { Image } from "../../App.types";

type Props = {
  isOpen: boolean;
  image: Image;
  onCloseModal: () => void;
};

const ImageModal = ({ isOpen, onCloseModal, image }: Props) => {
  useEffect(() => {
    if (isOpen) {
      disableBodyScroll(document.body);
    } else {
      enableBodyScroll(document.body);
    }
  }, [isOpen]);

  return (
    <Modal
      overlayClassName={css.backdrop}
      className={css.modal}
      isOpen={isOpen}
      onRequestClose={onCloseModal}
    >
      <img
        className={css.galleryImage}
        src={image.urls.regular}
        alt={image.alt_description}
      />
    </Modal>
  );
};

export default ImageModal;
