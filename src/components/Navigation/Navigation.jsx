import { NavLink } from 'react-router-dom';
import clsx from 'clsx'; // Для об'єднання класів залежно від умов
import css from './Navigation.module.css';

// Функція для побудови класу навігаційного посилання
// Додає клас `css.active`, якщо посилання є активним
const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const Navigation = () => {
  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <NavLink to="/" className={buildLinkClass}>
          Home
        </NavLink>
        <NavLink to="/movies" className={buildLinkClass}>
          Movies
        </NavLink>
      </nav>
    </header>
  );
};

export default Navigation;
