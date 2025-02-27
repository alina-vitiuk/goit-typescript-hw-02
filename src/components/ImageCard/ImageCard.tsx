import css from "./ImageCard.module.css";
import { Image } from "../../App.types";

type Props = {
  imageItem: Image;
};

function ImageCard({
  imageItem: {
    alt_description,
    urls: { small },
  },
}: Props) {
  return (
    <div className={css.galleryThumb}>
      <img
        className={css.galleryImage}
        src={small}
        alt={alt_description}
        width="360"
      />
    </div>
  );
}

export default ImageCard;
