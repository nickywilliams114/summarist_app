import Sidebar from "@/components/Sidebar";
import Search from "@/components/Search";
import { fetchBook, fetchRecommendedBooks } from "@/lib/books";

import { notFound } from "next/navigation"; // Import notFound from Next.js

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

export default async function BookPage({ params }) {
  const { id } = params;
  const book = await fetchBook(id);

  if (!book) {
    // Handle case where book is null
    notFound(); // Display Next.js's default not found page
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
                <div className="inner__book--title">{book.title}</div>
                <div className="inner__book--author">{book.author}</div>
                <div className="inner__book--sub-title">{book.subTitle}</div>
                <div className="inner__book--wrapper">
                  <div className="inner__book--description-wrapper">
                    <h2 className="inner__book--description-title">
                      <div className="inner__book--stats">
                        <div className="inner__book--rating">
                          <span>{book.averageRating}</span> ({book.totalRating}{" "}
                          ratings)
                        </div>
                        <div className="inner__book--duration">
                          00:00 Key ideas
                        </div>
                      </div>
                      <div className="inner__book--buttons">
                        {book.type?.includes("Text") && (
                          <button className="btn inner__book--read-btn">
                            Read
                          </button>
                        )}
                        {book.audioLink && (
                          <button className="btn inner__book--listen-btn">
                            Listen
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
