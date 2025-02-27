import { getImagesUnplash } from "./images-api";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import css from "./App.module.css";

import SearchBar from "./components/SearchBar/SearchBar";
import Loader from "./components/Loader/Loader";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import LoaderMore from "./components/Loader/LoaderMore";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";
import { Image } from "./App.types";

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [loadingSpiner, setLoadingSpiner] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!search) {
      setLoadingMore(false);
      return;
    }
    const fetchPhotoApi = async () => {
      try {
        setLoadingSpiner(true);
        const dataImages = await getImagesUnplash(search, page);
        setTotalPages(dataImages.total_pages);
        if (dataImages.total === 0) {
          toast.error(
            "Sorry, there are no images matching your search query. Please try again!"
          );
        }
        setLoadingSpiner(false);
        setImages((prevImages) => {
          return [...prevImages, ...dataImages.results];
        });
      } catch {
        setError(true);
      } finally {
        setLoadingMore(false);
      }
    };
    fetchPhotoApi();
  }, [page, search]);

  const handleLoadMore = (): void => {
    setPage((prev) => prev + 1);
  };

  const isVisible = (): boolean | Image[] => {
    return totalPages >= 1 && totalPages !== page && images;
  };

  const openModal = (image: Image): void => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };
  const closeModal = (): void => setModalIsOpen(false);

  const handleChangeQuery = (newSearch: string): void => {
    if (newSearch === search) {
      return;
    }
    setSearch(newSearch);
    setImages([]);
    setPage(1);
  };

  return (
    <>
      <SearchBar onSubmit={handleChangeQuery} />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: css.toastTextCenter,
        }}
      />
      {error && <ErrorMessage />}
      <ImageGallery imageList={images} openModal={openModal} />
      {loadingSpiner && <Loader />}
      {isVisible() && <LoadMoreBtn onClick={handleLoadMore} />}
      {loadingMore && <LoaderMore />}
      {selectedImage && (
        <ImageModal
          isOpen={modalIsOpen}
          image={selectedImage}
          onCloseModal={closeModal}
        />
      )}
    </>
  );
}
export default App;
