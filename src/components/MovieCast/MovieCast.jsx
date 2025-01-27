import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Імпортуємо хук useParams для отримання параметрів URL
import Loader from '../Loader/Loader';
import { fetchMovieCast } from '../../movielist-api';
import css from './MovieCast.module.css';
// URL за замовчуванням для зображення, якщо немає профільного фото актора
const defaultImg =
  'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

const MovieCast = () => {
  const { movieId } = useParams(); // Отримуємо movieId з URL
  const [movieCast, setMovieCast] = useState([]); // Стан для зберігання даних про акторів фільму
  const [error, setError] = useState(null); // Стан для зберігання повідомлень про помилки
  const [isLoading, setIsLoading] = useState(false); // Стан для відстеження процесу завантаження

  // Використовуємо useEffect для завантаження акторського складу при зміні movieId
  useEffect(() => {
    if (!movieId) return;

    const loadMovieCast = async () => {
      setIsLoading(true);

      try {
        const data = await fetchMovieCast(movieId); // Отримуємо інформацію про акторів за допомогою movieId
        setMovieCast(data); // Зберігаємо отримані дані в стані
      } catch (error) {
        setError(`Error fetching MovieCast: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadMovieCast(); // Викликаємо функцію для завантаження акторського складу
  }, [movieId]); // Залежність від movieId, щоб ефект спрацьовував при його зміні

  return (
    <div className={css.container}>
      {isLoading && (
        <div className={css.loading}>
          <Loader />
        </div>
      )}

      {error && <p className={css.error}>{error}</p>}

      {!isLoading && !error && !movieCast.length && (
        <p className={css.message}>No cast information available.</p>
      )}

      {!isLoading && !error && movieCast.length > 0 && (
        <>
          <h3 className={css.subtitle}>Movie Cast</h3>
          <ul className={css.castList}>
            {movieCast.map(({ id, name, profile_path, character }) => (
              <li key={id} className={css.castItem}>
                <img
                  src={
                    profile_path
                      ? `https://image.tmdb.org/t/p/w200${profile_path}`
                      : defaultImg
                  }
                  alt={name}
                  className={css.actorImage}
                />
                <p className={css.actorName}>{name}</p>
                <p className={css.characterName}>Character: {character}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default MovieCast;
