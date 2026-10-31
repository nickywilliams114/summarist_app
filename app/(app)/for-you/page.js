"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BsPlayFill } from "react-icons/bs";
import {
  fetchSelectedBooks,
  fetchRecommendedBooks,
  fetchSuggestedBooks,
} from "@/lib/books";
import { BookDuration } from "@/lib/duration";
import { BookRow } from "@/components/BookCard";
import Skeleton from "@/components/Skeleton";

export default function ForYouPage() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [suggestedBooks, setSuggestedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [selected, recommended, suggested] = await Promise.all([
          fetchSelectedBooks(),
          fetchRecommendedBooks(),
          fetchSuggestedBooks(),
        ]);
        setSelectedBook(selected[0]);
        setRecommendedBooks(recommended);
        setSuggestedBooks(suggested);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="container">
        <div className="for-you__wrapper">
          {error && (
            <div className="page__error">
              Couldn&apos;t load books. Please refresh the page.
            </div>
          )}

          <div className="for-you__title">Selected just for you</div>
          {loading ? (
            <Skeleton width="100%" height="186px" />
          ) : (
            selectedBook && (
              <Link href={`/book/${selectedBook.id}`} className="selected__book">
                <div className="selected__book--sub-title">
                  {selectedBook.subTitle}
                </div>
                <div className="selected__book--line"></div>
                <div className="selected__book--content">
                  <figure className="selected__book--image-mask">
                    <img
                      src={selectedBook.imageLink}
                      alt={selectedBook.title}
                      className="selected__book--image"
                    />
                  </figure>
                  <div className="selected__book--text">
                    <div className="selected__book--title">
                      {selectedBook.title}
                    </div>
                    <div className="selected__book--author">
                      {selectedBook.author}
                    </div>
                    <div className="selected__book--duration-wrapper">
                      <div className="selected__book--icon">
                        <BsPlayFill />
                      </div>
                      <div className="selected__book--duration">
                        <BookDuration audioLink={selectedBook.audioLink} long />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          )}

          <div>
            <div className="for-you__title">Recommended For You</div>
            <div className="for-you__sub--title">We think you&apos;ll like these</div>
            <BookRow books={recommendedBooks} loading={loading} />
          </div>

          <div>
            <div className="for-you__title">Suggested Books</div>
            <div className="for-you__sub--title">Browse those books</div>
            <BookRow books={suggestedBooks} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}
