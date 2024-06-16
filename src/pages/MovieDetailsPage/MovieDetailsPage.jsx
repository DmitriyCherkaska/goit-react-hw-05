import some from "./ImageCard.module.css";

const ImageCard = ({ selectedImage, alt, srcSmall, onImageClick }) => {
  return (
    <div className={some.card}>
      <img
        src={srcSmall}
        alt={alt}
        width="300"
        onClick={() => onImageClick(selectedImage)}
      />
    </div>
  );
};
export default ImageCard;
