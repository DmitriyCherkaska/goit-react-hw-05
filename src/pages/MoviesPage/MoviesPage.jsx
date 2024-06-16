import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';

const SearchBar = ({ submit }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const searchTerm = e.target.elements.text.value.trim();
    if (searchTerm === '') {
      toast('Please, write the text for the search images', {
        duration: 4000,
        position: 'center-center',
        style: {
          color: 'rgb(189, 187, 187)',
          backgroundColor: 'rgba(146, 148, 248, 0.4)',
          borderRadius: '0px',
        },
      });
      return;
    }
    submit(searchTerm);
    form.reset();
  };

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <Toaster />
    </header>
  );
};

export default SearchBar;
