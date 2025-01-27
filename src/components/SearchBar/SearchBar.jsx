import { BsSearch } from 'react-icons/bs';
import toast from 'react-hot-toast';
import css from './SearchBar.module.css';

const SearchBar = ({ setSearchParams }) => {
  // Функція для обробки події сабміту форми
  const handleSubmit = e => {
    e.preventDefault();
    const value = e.target.elements.query.value.trim();

    if (!value) {
      toast.error('Please enter a search query.');
      return;
    }

    setSearchParams({ query: value, page: 1 }); // Оновлюємо параметри пошуку за допомогою функції setSearchParams
  };

  return (
    <div className={css.container}>
      {/* Форма для пошуку з подією сабміту, обробленою handleSubmit */}
      <form onSubmit={handleSubmit} className={css.searchForm}>
        <input
          name="query"
          type="text"
          placeholder="Search for movies..."
          className={css.searchInput}
        />
        <button type="submit" className={css.searchButton}>
          <BsSearch size={20} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
