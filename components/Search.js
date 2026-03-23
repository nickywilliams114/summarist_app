import React from "react";

const Search = () => {
  return (
    <div className="search__background">
      <div className="search__wrapper">
        <div className="search__content">
          <div className="search__input--wrapper">
            <input
              className="search__input"
              type="text"
              placeholder="Search for books"
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
        </div>
      </div>
    </div>
  );
};

export default Search;
