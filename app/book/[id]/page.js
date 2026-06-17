"use client";

import Sidebar from "@/components/Sidebar";
import Search from "@/components/Search";
import {
  fetchBook,
  fetchRecommendedBooks,
  fetchSelectedBooks,
} from "@/lib/books";

import Skeleton from "@/components/Skeleton";
import { notFound } from "next/navigation"; // Import notFound from Next.js
import { useSelector, useDispatch } from "react-redux";
import { openAuthModal } from "@/redux/userSlice";
import { useEffect, useState } from "react";

export const dynamicParams = true;

export async function generateStaticParams() {
  const recommendedBooks = await fetchRecommendedBooks();
  const validParams = [];

  for (const book of recommendedBooks) {
    const fetchedBook = await fetchBook(book.id); // Call fetchBook
    if (fetchedBook) {
      // Only add if fetchBook returned a valid book
      validParams.push({ id: book.id });
    } else {
      console.warn(
        `Skipping prerendering for book ID ${book.id} as it could not be fetched.`,
      );
    }
  }
  return validParams;
}

export default function BookPage({ params: paramsPromise }) {
  const [book, setBook] = useState(null);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getBook() {
      const params = await paramsPromise;
      const { id } = params;
      const bookData = await fetchBook(id);
      if (!bookData) {
        notFound();
      }
      setBook(bookData);
    }
    getBook();
  }, [paramsPromise]);

  function handleRead() {
    if (!user) {
      dispatch(openAuthModal());
      return;
    }
    // TODO: Handle subscription check
  }

  function handleListen() {
    if (!user) {
      dispatch(openAuthModal());
      return;
    }
    // TODO: Handle subscription check
  }

  if (!book) {
    return (
      <div className="wrapper">
        <Search />
        <div className="sidebar__wrapper">
          <Sidebar />
          <div className="row">
            <div className="container">
              <div className="inner__wrapper">
                <div className="inner__book">
                  <div className="inner-book__title">
                    <Skeleton width="400px" height="40px" />
                  </div>
                  <div className="inner-book__author">
                    <Skeleton width="200px" height="20px" />
                  </div>
                  <div className="inner-book__sub--title">
                    <Skeleton width="300px" height="20px" />
                  </div>
                  <div className="inner-book__wrapper">
                    <div className="inner-book__description-wrapper">
                      <Skeleton width="100%" height="200px" />
                    </div>
                    <div className="inner__book--img-wrapper">
                      <Skeleton width="200px" height="200px" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <Search />
      <div className="sidebar__wrapper">
        <Sidebar />
        <div className="row">
          <div className="container">
            <div className="inner__wrapper">
              <div className="inner__book">
                <div className="inner-book__title">{book.title}</div>
                <div className="inner-book__author">{book.author}</div>
                <div className="inner-book__sub--title">{book.subTitle}</div>
                <div className="inner-book__wrapper">
                  <div className="inner-book__description-wrapper">
                    <h2 className="inner-book__description">
                      <div className="inner-book__icon">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 1024 1024"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z"></path>
                        </svg>
                      </div>
                      <div className="inner__book--stats">
                        <div className="inner__book--rating">
                          <span>{book.averageRating}</span> ({book.totalRating}{" "}
                          ratings)
                        </div>
                        <div className="inner__book--duration">
                          00:00 Key ideas
                        </div>
                      </div>
                      <div className="inner-book__read--btn-wrapper">
                        {book.type?.includes("Text") && (
                          <button
                            className="inner-book__read-btn"
                            onClick={handleRead}
                          >
                            <div class="inner-book__read--icon">
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                stroke-width="0"
                                viewBox="0 0 1024 1024"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M928 161H699.2c-49.1 0-97.1 14.1-138.4 40.7L512 233l-48.8-31.3A255.2 255.2 0 0 0 324.8 161H96c-17.7 0-32 14.3-32 32v568c0 17.7 14.3 32 32 32h228.8c49.1 0 97.1 14.1 138.4 40.7l44.4 28.6c1.3.8 2.8 1.3 4.3 1.3s3-.4 4.3-1.3l44.4-28.6C602 807.1 650.1 793 699.2 793H928c17.7 0 32-14.3 32-32V193c0-17.7-14.3-32-32-32zM324.8 721H136V233h188.8c35.4 0 69.8 10.1 99.5 29.2l48.8 31.3 6.9 4.5v462c-47.6-25.6-100.8-39-155.2-39zm563.2 0H699.2c-54.4 0-107.6 13.4-155.2 39V298l6.9-4.5 48.8-31.3c29.7-19.1 64.1-29.2 99.5-29.2H888v488zM396.9 361H211.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5zm223.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c0-4.1-3.2-7.5-7.1-7.5H627.1c-3.9 0-7.1 3.4-7.1 7.5zM396.9 501H211.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5zm416 0H627.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5z"></path>
                              </svg>
                            </div>
                            <div className="inner-book__read--text">Read</div>
                          </button>
                        )}
                        {book.audioLink && (
                          <button
                            className="inner-book__read-btn"
                            onClick={handleListen}
                          >
                            <div class="inner-book__read--icon">
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                stroke-width="0"
                                viewBox="0 0 1024 1024"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M842 454c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8 0 140.3-113.7 254-254 254S258 594.3 258 454c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8 0 168.7 126.6 307.9 290 327.6V884H326.7c-13.7 0-24.7 14.3-24.7 32v36c0 4.4 2.8 8 6.2 8h407.6c3.4 0 6.2-3.6 6.2-8v-36c0-17.7-11-32-24.7-32H548V782.1c165.3-18 294-158 294-328.1zM512 624c93.9 0 170-75.2 170-168V232c0-92.8-76.1-168-170-168s-170 75.2-170 168v224c0 92.8 76.1 168 170 168zm-94-392c0-50.6 41.9-92 94-92s94 41.4 94 92v224c0 50.6-41.9 92-94 92s-94-41.4-94-92V232z"></path>
                              </svg>
                            </div>
                            <div class="inner-book__read--text">Listen</div>
                          </button>
                        )}
                      </div>
                      <button className="btn inner__book--add-btn">
                        Add to My Library
                      </button>
                      What's it about?
                    </h2>
                    <div className="inner__book--description">
                      {book.bookDescription}
                    </div>
                  </div>
                  {book.authorDescription && (
                    <div className="inner__book--author-description-wrapper">
                      <h2 className="inner__book--author-description-title">
                        About the author
                      </h2>
                      <div className="inner__book--author-description">
                        {book.authorDescription}
                      </div>
                    </div>
                  )}
                </div>
                <div className="inner__book--img-wrapper">
                  <figure className="book__image--wrapper">
                    <img
                      src={book.imageLink}
                      alt={book.title}
                      className="book__image"
                    />
                  </figure>
                </div>
                <div className="inner__book--content">
                  <div className="inner__book--keypoints">
                    <h2 className="inner__book--keypoints-title">Key Ideas</h2>
                    <p className="inner__book--keypoints-count">
                      {book.keyIdeas} Key Ideas
                    </p>
                  </div>

                  <div className="inner__book--highlights">
                    <h2 className="inner__book--highlights-title">
                      Highlights
                    </h2>
                    <p>This is a placeholder for highlights.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
