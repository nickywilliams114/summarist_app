import "../style.css";
import Search from "@/components/Search";
import Sidebar from "@/components/Sidebar";
import {
  fetchSelectedBooks,
  fetchRecommendedBooks,
  fetchSuggestedBooks,
} from "@/lib/books";
import Link from "next/link";

export const metadata = {
  title: "For You | Summarist",
  description: "Personalized recommendations for you",
};

export default async function ForYouPage() {
  const selectedBooksData = fetchSelectedBooks();
  const recommendedBooksData = fetchRecommendedBooks();
  const suggestedBooksData = fetchSuggestedBooks();
  const [selectedBooks, recommendedBooks, suggestedBooks] = await Promise.all([
    selectedBooksData,
    recommendedBooksData,
    suggestedBooksData,
  ]);
  const selectedBook = selectedBooks[0];

  return (
    <div className="wrapper">
      <Sidebar />
      <div>
        <Search />
        <div className="row">
          <div className="container">
            <div className="for-you__wrapper">
              <div className="for-you__title">Selected just for you</div>
              {selectedBook && (
                <Link
                  href={`/book/${selectedBook.id}`}
                  className="selected__book"
                >
                  <div className="selected__book--sub-title">
                    {selectedBook.subTitle}
                  </div>
                  <div className="selected__book--line"></div>
                  <div className="selected__book--content">
                    <div className="selected__img--mask">
                      <img
                        src={selectedBook.imageLink}
                        alt="book"
                        className="selected__img"
                      />
                    </div>
                    <div className="selected__book--text">
                      <div className="selected__book--title">
                        {selectedBook.title}
                      </div>
                      <div className="selected__book--author">
                        {selectedBook.author}
                      </div>
                      <div className="selected__book--duration-wrapper">
                        <div className="selected__book--icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="selected__book--duration">
                          3 mins 23 secs
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
              <div className="for-you__title">Recommended For You</div>
              <div className="for-you__sub--title">
                We think you’ll like these
              </div>
              <div className="for-you__recommended--books">
                {recommendedBooks.map((book) => (
                  <Link
                    href={`/book/${book.id}`}
                    className="for-you__recommended--books-link"
                    key={book.id}
                  >
                    <figure className="book__image--wrapper">
                      {book.subscriptionRequired && (
                        <div className="book__image--premium">Premium</div>
                      )}
                      <img
                        className="book__image"
                        src={book.imageLink}
                        alt="book"
                      />
                    </figure>
                    <div className="recommended__book--title">{book.title}</div>
                    <div className="recommended__book--author">
                      {book.author}
                    </div>
                    <div className="recommended__book--sub-title">
                      {book.subTitle}
                    </div>
                    <div className="recommended__book--details-wrapper">
                      <div className="recommended__book--details">
                        <div className="recommended__book--details-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="recommended__book--details-text">
                          3 mins 23 secs
                        </div>
                      </div>
                      <div className="recommended__book--details">
                        <div className="recommended__book--details-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="recommended__book--details-text">
                          {book.averageRating}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="for-you__title">Suggested Books</div>
              <div className="for-you__sub--title">Browse those books</div>
              <div className="for-you__recommended--books">
                {suggestedBooks.map((book) => (
                  <Link
                    href={`/book/${book.id}`}
                    className="for-you__recommended--books-link"
                    key={book.id}
                  >
                    <figure className="book__image--wrapper">
                      {book.subscriptionRequired && (
                        <div className="book__image--premium">Premium</div>
                      )}
                      <img
                        className="book__image"
                        src={book.imageLink}
                        alt="book"
                      />
                    </figure>
                    <div className="recommended__book--title">{book.title}</div>
                    <div className="recommended__book--author">
                      {book.author}
                    </div>
                    <div className="recommended__book--sub-title">
                      {book.subTitle}
                    </div>
                    <div className="recommended__book--details-wrapper">
                      <div className="recommended__book--details">
                        <div className="recommended__book--details-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="recommended__book--details-text">
                          3 mins 23 secs
                        </div>
                      </div>
                      <div className="recommended__book--details">
                        <div className="recommended__book--details-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="recommended__book--details-text">
                          {book.averageRating}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
