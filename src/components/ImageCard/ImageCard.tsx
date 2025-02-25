import css from "./ImageCard.module.css";
import { Image } from "../../App.types";

type Props = {
  imageItem: Image;
  onImageClick: (imageUrl: string) => void;
};

function ImageCard({
  imageItem: {
    alt_description,
    urls: { small, regular },
  },
  onImageClick,
}: Props) {
  return (
    <div className={css.galleryThumb}>
      <img
        onClick={() => onImageClick(regular)}
        className={css.galleryImage}
        src={small}
        alt={alt_description}
        width="360"
      />
    </div>
  );
}

export default ImageCard;
