import { Link, useLocation } from 'react-router-dom'; // Link для навігації, useLocation для збереження попереднього маршруту
import css from './MovieList.module.css';

// URL-зображення за замовчуванням для фільмів без постера
const defaultImg =
  'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

const MovieList = ({ movies }) => {
  const location = useLocation(); // Отримуємо інформацію про поточне місце розташування

  return (
    <ul className={css.movieList}>
      {/* Генеруємо список фільмів */}
      {movies.map(({ id, title, poster_path }) => (
        <li key={id} className={css.movieItem}>
          <h3 className={css.subtitle}>
            <Link
              to={`/movies/${id}`} // Формуємо шлях до сторінки з деталями фільму
              state={{ from: location }} // Зберігаємо інформацію про поточний маршрут
              className={css.movieLink}
            >
              <img
                src={
                  poster_path
                    ? `https://image.tmdb.org/t/p/w500${poster_path}`
                    : defaultImg
                }
                alt={title || 'Movie poster'}
                className={css.moviePoster}
              />
              {title}
            </Link>
          </h3>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
