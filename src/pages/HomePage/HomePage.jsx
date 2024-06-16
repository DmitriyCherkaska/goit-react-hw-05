import ImageCard from "../ImageCard/ImageCard";
import some from "./ImageGallery.module.css";

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className={some.list}>
      {images.map((image) => (
        <li key={image.id}>
          <ImageCard
            id={image.id}
            selectedImage={image.urls.regular}
            alt={image.alt_description}
            srcSmall={image.urls.small}
            onImageClick={onImageClick}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
