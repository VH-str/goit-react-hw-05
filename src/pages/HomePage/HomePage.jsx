import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { fetchTrendingMovies } from '../../movielist-api';
import MovieList from './../../components/MovieList/MovieList';
import LoadMoreBtn from './../../components/LoadMoreBtn/LoadMoreBtn';
import Loader from './../../components/Loader/Loader';
import css from './HomePage.module.css';

const HomePage = () => {
  // Стан для збереження трендових фільмів
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [error, setError] = useState(null); // Стан для обробки помилок
  const [isLoading, setIsLoading] = useState(false); // Стан для індикації завантаження
  const [searchParams, setSearchParams] = useSearchParams(); // Параметри URL
  const [totalPages, setTotalPages] = useState(0); // Загальна кількість сторінок
  const page = Number(searchParams.get('page')) || 1; // Отримання поточної сторінки з параметрів URL

  // Завантаження трендових фільмів при зміні сторінки
  useEffect(() => {
    const loadMovies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchTrendingMovies(page); // Отримання трендових фільмів з API

        // Оновлюємо стан з фільмами: очищуємо, якщо це перша сторінка, або додаємо до існуючих
        setTrendingMovies(prevMovies =>
          page === 1 ? data.movies : [...prevMovies, ...data.movies]
        );

        setTotalPages(data.totalPages); // Зберігаємо загальну кількість сторінок

        // Відображаємо повідомлення, якщо досягнуто останньої сторінки
        if (page >= data.totalPages) {
          toast("We're sorry, but you've reached the end of search results.");
        }
      } catch (error) {
        setError(`Unable to load movies: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, [page]);

  // Прокручування сторінки вниз при завантаженні нових фільмів
  useEffect(() => {
    if (page > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [trendingMovies, page]);

  // Обробник для завантаження наступної сторінки
  const handleLoadMore = () => {
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set('page', page + 1);
      return newParams;
    });
  };

  return (
    <div className={css.container}>
      {error && <p className={css.error}>{error}</p>}

      {/* Відображення повідомлення, якщо немає фільмів */}
      {!isLoading && trendingMovies.length === 0 ? (
        <p className={css.subtitle}>No Trending movies</p>
      ) : (
        <>
          <h2 className={css.title}>Trending today</h2>
          <MovieList movies={trendingMovies} />

          {/* Відображення кнопки "Завантажити більше", якщо є додаткові сторінки */}
          {page < totalPages && (
            <>
              {isLoading ? (
                <Loader />
              ) : (
                <LoadMoreBtn onClick={handleLoadMore} />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
