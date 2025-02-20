import { useEffect, useState, useRef } from 'react';
import {
  useParams, // Хук для отримання параметрів з URL
  Outlet, // Місце для вкладених маршрутів
  useLocation, // Хук для отримання інформації про поточне місцезнаходження
  Link, // Компонент для переходу за посиланням
  NavLink, // Компонент для створення навігаційних посилань з активним станом
} from 'react-router-dom';
import { fetchMovieDetails } from '../../movielist-api';
import Loader from './../../components/Loader/Loader';
import clsx from 'clsx'; // Бібліотека для динамічного об’єднання класів
import css from './MovieDetailsPage.module.css';

// URL-зображення за замовчуванням для фільмів без постера
const defaultImg =
  'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

// Функція для встановлення класу активного посилання
const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const MovieDetailsPage = () => {
  const { movieId } = useParams(); // Отримуємо ідентифікатор фільму з URL
  const [movie, setMovie] = useState(null); // Стан для збереження інформації про фільм
  const [error, setError] = useState(null); // Стан для обробки помилок
  const [isLoading, setIsLoading] = useState(false); // Стан для відображення завантаження
  const location = useLocation(); // Отримуємо об’єкт з інформацією про поточне місцезнаходження
  const backLink = useRef(location.state?.from ?? '/movies'); // Зберігаємо шлях для повернення

  // Завантаження деталей фільму при зміні movieId
  useEffect(() => {
    const loadMovieDetails = async () => {
      setIsLoading(true);

      try {
        const data = await fetchMovieDetails(movieId); // Отримуємо дані фільму
        if (!data) throw new Error('Movie not found');
        setMovie(data);
      } catch (error) {
        setError(`Error fetching genres: ${error.message}`);
      } finally {
        setIsLoading(false); // Завершення завантаження
      }
    };

    loadMovieDetails();
  }, [movieId]);

  return (
    <div className={css.container}>
      {isLoading && (
        <div className={css.loading}>
          <Loader />
        </div>
      )}

      {error && <p className={css.error}>{error}</p>}

      {/* Кнопка для повернення назад */}
      <nav className={css.nav}>
        <Link to={backLink.current} className={css.link_button}>
          <button type="button" className={css.button}>
            Go back
          </button>
        </Link>
      </nav>

      {/* Відображення деталей фільму */}
      <div className={css.block_dscr}>
        {movie && (
          <div className={css.block_dscr}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : defaultImg
              }
              alt={movie.title || 'Movie poster'}
              className={css.moviePoster}
            />

            <div className={css.dscr}>
              <h2>
                {movie.title} ({movie.release_date?.split('-')[0] || 'N/A'})
              </h2>
              <p>User score: {movie.vote_average || 'N/A'}</p>
              <h3>Overview</h3>
              <p>{movie.overview || 'No overview available.'}</p>
              <h3>Genres</h3>
              <p>
                {movie.genres?.map(genre => genre.name).join(', ') ||
                  'No genres listed.'}
              </p>
            </div>
          </div>
        )}
      </div>

      <h3 className={css.subtitle}>Additional information</h3>

      {/* Навігаційні посилання для вкладених маршрутів */}
      <ul className={css.list}>
        <li>
          <nav className={css.nav}>
            <NavLink to="cast" className={buildLinkClass}>
              Cast
            </NavLink>
          </nav>
        </li>
        <li>
          <nav className={css.nav}>
            <NavLink to="reviews" className={buildLinkClass}>
              Reviews
            </NavLink>
          </nav>
        </li>
      </ul>
      <Outlet />
      {/* Відображення вкладених маршрутів */}
    </div>
  );
};

export default MovieDetailsPage;
