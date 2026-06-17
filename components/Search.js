import React, { useState, useEffect } from "react";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchQuery) {
        fetchSearchResults();
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchQuery]);

  async function fetchSearchResults() {
    setLoading(true);
    const response = await fetch(
      `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${searchQuery}`,
    );
    const data = await response.json();
    setSearchResults(data);
    setLoading(false);
  }
  return (
    <div className="search__background">
      <div className="search__wrapper">
        <div className="search__content">
          <div className="search__input--wrapper">
            <input
              className="search__input"
              type="text"
              placeholder="Search for books"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="search__icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
          </div>
          {loading && <div className="search__loading">Loading...</div>}
          {searchResults.length > 0 && (
            <div className="search__results">
              {searchResults.map((book) => (
                <div key={book.id} className="search__result">
                  <a href={`/book/${book.id}`}>
                    <div className="search__result--title">{book.title}</div>
                    <div className="search__result--author">{book.author}</div>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
