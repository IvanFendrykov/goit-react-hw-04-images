import { useState, useEffect, useMemo } from 'react';

import { getImages } from './Api/Api.js';

import { Searchbar } from './Searchbar/Searchbar';
import { Layout } from './Layout/Layout';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { ErrorMessege } from './Error/ErrorMessege';
import { Loader } from './Loader/Loader';

import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { notifyOptions } from './Notify/Notify.js';
import { GlobalStyle } from './GlobalStyle';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(Status.IDLE);
  const [isEmpty, setIsEmpty] = useState(false);
  const [error, setError] = useState(false);
  const [isCollectionEnding, setIsCollectionEnding] = useState(false);

  const promiseFetchImages = useMemo(() => {
    return async () => {
      try {
        const { data } = await getImages(query, page);

        if (data.hits.length === 0) {
          setIsEmpty(true);
          setStatus(Status.IDLE);
          return;
        }

        if (Math.ceil(data.totalHits / 12) === page) {
          setIsCollectionEnding(true);
          setStatus(Status.RESOLVED);
        }

        setImages(images => [...images, ...data.hits]);
        setStatus(Status.RESOLVED);
      } catch (error) {
        console.log(error);
        setError(error.message);
        setStatus(Status.REJECTED);
      }
    };
  }, [page, query]);

  useEffect(() => {
    if (query !== '') {
      setStatus(Status.PENDING);

      promiseFetchImages();
    }
  }, [query, promiseFetchImages]);

  const handleSearchSubmit = value => {
    if (value === '') {
      toast.info('Please enter key words for search', notifyOptions);
      return;
    }

    setImages([]);
    setQuery(value);
    setIsEmpty(false);
    setPage(1);
    setIsCollectionEnding(false);
  };

  const handleLoadMore = () => {
    setPage(page => page + 1);
  };

  return (
    <>
      <Searchbar onSearchSubmit={handleSearchSubmit} />
      {isEmpty && (
        <ErrorMessege message="O No images were found for this request..."></ErrorMessege>
      )}
      {status === 'rejected' && <ErrorMessege>{error}</ErrorMessege>}
      <Layout>
        <ImageGallery images={images} />
      </Layout>

      {status === 'pending' && <Loader />}
      {status === 'resolved' && !isEmpty && !isCollectionEnding && (
        <Button onLoadMore={handleLoadMore} />
      )}
      <ToastContainer transition={Slide} draggablePercent={60} />
      <GlobalStyle />
    </>
  );
};
