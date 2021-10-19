import { useState, useEffect } from 'react';

export default function Searchbar(props) {
  const [search, setSearch] = useState('');
  const { sendSearch } = props;

  useEffect(() => {
    sendSearch(search);
  }, [search, sendSearch]);

  return (
    <div className="d-flex justify-content-center mb-4">
      <form className="mt-5" style={{ minWidth: 'calc(16em + 16vw)' }}>
        <div className="mb-3">
          <label htmlFor="searchbar" className="form-label">
            Search bar
          </label>
          <input
            type="text"
            className="form-control"
            id="searchbar"
            aria-describedby="searchHelp"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div id="searchHelp" className="form-text">
            Search for posts by hashtags
          </div>
        </div>
      </form>
    </div>
  );
}
