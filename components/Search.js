"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineSearch, AiOutlineClose, AiOutlineClockCircle } from "react-icons/ai";
import { HiMenu } from "react-icons/hi";
import { BookDuration } from "@/lib/duration";
import Skeleton from "./Skeleton";

const DEBOUNCE_MS = 300;

const Search = ({ onMenuClick }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const wrapperRef = useRef(null);

  // Wait until the user stops typing for 300ms before hitting the API.
  useEffect(() => {
    const query = searchQuery.trim();
    if (!query) {
      setSearchResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const controller = new AbortController();
    const debounce = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${encodeURIComponent(query)}`,
          { signal: controller.signal },
        );
        const data = await response.json();
        setSearchResults(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
          setSearchResults([]);
          setLoading(false);
        }
      }
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(debounce);
      controller.abort();
    };
  }, [searchQuery]);

  // Clear the search after navigating to a result.
  useEffect(() => {
    setSearchQuery("");
  }, [pathname]);

  // Close the results when clicking anywhere else.
  useEffect(() => {
    function handleClick(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setSearchQuery("");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const showResults = searchQuery.trim().length > 0;

  return (
    <div className="search__background">
      <div className="search__wrapper">
        <figure className="search__logo--mask"></figure>
        <div className="search__content" ref={wrapperRef}>
          <div className="search">
            <div className="search__input--wrapper">
              <input
                className="search__input"
                type="text"
                placeholder="Search for books"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div
                className="search__icon"
                onClick={() => showResults && setSearchQuery("")}
              >
                {showResults ? <AiOutlineClose /> : <AiOutlineSearch />}
              </div>
            </div>
          </div>
          {showResults && (
            <div className="search__books--wrapper">
              {loading ? (
                Array.from({ length: 4 }, (_, i) => (
                  <div className="search__book--skeleton" key={i}>
                    <Skeleton width="100%" height="120px" />
                  </div>
                ))
              ) : searchResults.length === 0 ? (
                <div className="search__empty">No books found</div>
              ) : (
                searchResults.map((book) => (
                  <Link
                    href={`/book/${book.id}`}
                    key={book.id}
                    className="search__book--link"
                  >
                    <figure className="search__book--image-wrapper">
                      <img
                        className="search__book--image"
                        src={book.imageLink}
                        alt={book.title}
                      />
                    </figure>
                    <div>
                      <div className="search__book--title">{book.title}</div>
                      <div className="search__book--author">{book.author}</div>
                      <div className="search__book--duration">
                        <AiOutlineClockCircle />
                        <BookDuration audioLink={book.audioLink} />
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}
          <div className="sidebar__toggle--btn" onClick={onMenuClick}>
            <HiMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
