import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import fetchImagesApi from './api/articles-api.js';
import QueryNotFound from './components/QueryNotFound/QueryNotFound';
import './App.css';

const App = () => {
  console.log('App component is rendered');

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(false);
        const { results, total_pages } = await fetchImagesApi(searchTerm, page);
        setImages(prevImages => [...prevImages, ...results]);
        results.length === 0 && setIsEmpty(true);
        setTotalPages(total_pages);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    searchTerm && fetchImages();
  }, [searchTerm, page]);

  useEffect(() => {
    document.body.classList.toggle('modal-open', modalIsOpen);

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [modalIsOpen]);

  const handleSubmit = searchTerm => {
    setImages([]);
    setPage(1);
    setSearchTerm(searchTerm);
    setIsEmpty(false);
  };

  const handleImageClick = selectedImage => {
    setSelectedImage(selectedImage);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <SearchBar value={searchTerm} submit={handleSubmit} />
      {loading ? (
        <Loader />
      ) : (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}
      {isEmpty && !loading && <QueryNotFound />}
      {error && <ErrorMessage message={error.message} />}
      {images.length > 0 && !loading && page < totalPages && (
        <LoadMoreBtn onLoadMore={handleLoadMore} />
      )}
      <ImageModal
        isOpen={modalIsOpen}
        selectedImage={selectedImage}
        closeModal={closeModal}
      />
    </div>
  );
};

export default App;
