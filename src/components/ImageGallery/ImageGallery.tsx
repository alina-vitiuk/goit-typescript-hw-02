import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { Image } from "../../App.types";

type Props = {
  imageList: Image[];
  openModal: (imageUrl: string) => void;
};

const ImageGallery = ({ imageList, openModal }: Props) => {
  const imageClick = (event: React.MouseEvent<HTMLUListElement>) => {
    const imgItem = (event.target as Element).closest("li");
    if (imgItem) {
      const imgID = imgItem.dataset.id;
      const clickedImageItem = imageList.find((image) => image.id === imgID);
      if (clickedImageItem) {
        openModal(clickedImageItem.urls.regular);
      }
    }
  };
  return (
    <section className={css.containerGallery}>
      {imageList.length > 0 && (
        <ul className={css.gallery} onClick={imageClick}>
          {imageList.map((img) => (
            <li className={css.galleryItem} key={img.id} data-id={img.id}>
              <ImageCard imageItem={img} onImageClick={openModal} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ImageGallery;
