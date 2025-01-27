import { Suspense, lazy } from 'react'; // Імпортуємо компоненти Suspense та lazy для динамічного завантаження компонентів
import { Routes, Route } from 'react-router-dom'; // Імпортуємо компоненти для роботи з маршрутизацією
import { Toaster } from 'react-hot-toast'; // Імпортуємо компонент для відображення повідомлень
import Loader from '../Loader/Loader'; // Імпортуємо компонент завантаження
import Navigation from './../Navigation/Navigation'; // Імпортуємо компонент навігації
import ScrollToTopButton from './../ScrollToTopButton/ScrollToTopButton'; // Імпортуємо кнопку прокрутки до верху
import css from './App.module.css'; // Імпортуємо стилі для компонента

// Лінивий імпорт сторінок для маршрутизації
const HomePage = lazy(() => import('./../../pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./../../pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() =>
  import('./../../pages/MovieDetailsPage/MovieDetailsPage')
);
const MovieCast = lazy(() => import('./../MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('./../MovieReviews/MovieReviews'));
const NotFoundPage = lazy(() =>
  import('./../../pages/NotFoundPage/NotFoundPage')
);

const App = () => {
  return (
    <div className={css.container}>
      <Navigation /> {/* Виводимо компонент навігації */}
      <Toaster
        position="top-center"
        toastOptions={{ className: css.toasterContainer }}
      />
      <Suspense fallback={<Loader className={css.loading} />}>
        {/* Обгортка Suspense для завантаження компонентів */}

        <Routes>
          {/* Маршрутизація для сторінок */}
          <Route path="/" element={<HomePage />} /> {/* Головна сторінка */}
          <Route path="/movies" element={<MoviesPage />} />{' '}
          {/* Сторінка фільмів */}
          {/* Маршрут для сторінки деталей фільму з вкладеними маршрутами */}
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />{' '}
            {/* Вкладений маршрут для акторського складу */}
            <Route path="reviews" element={<MovieReviews />} />{' '}
            {/* Вкладений маршрут для оглядів */}
          </Route>
          <Route path="*" element={<NotFoundPage />} />{' '}
          {/* Маршрут для сторінки 404, якщо сторінку не знайдено */}
        </Routes>
      </Suspense>
      <ScrollToTopButton /> {/* Кнопка для прокрутки до верху сторінки */}
    </div>
  );
};

export default App;
