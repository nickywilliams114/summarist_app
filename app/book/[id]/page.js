import Sidebar from "@/components/Sidebar";
import Search from "@/components/Search";
import { fetchBook } from "@/lib/books";

export default async function BookPage({ params }) {
  const { id } = await params;
  const book = await fetchBook(id);

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="wrapper__content">
        <Search />
        <div className="row">
          <div className="container">
            <div className="inner__wrapper">
              <div className="inner__book">
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
                  <div className="inner__book--title">{book.title}</div>
                  <div className="inner__book--author">{book.author}</div>
                  <div className="inner__book--sub-title">{book.subTitle}</div>
                  <div className="inner__book--stats">
                    <div className="inner__book--rating">
                      <span>{book.averageRating}</span> ({book.totalRating}{" "}
                      ratings)
                    </div>
                    <div className="inner__book--duration">00:00 Key ideas</div>
                  </div>

                  <div className="inner__book--keypoints">
                    <h2 className="inner__book--keypoints-title">Key Ideas</h2>
                    <p className="inner__book--keypoints-count">
                      {book.keyIdeas} Key Ideas
                    </p>
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
                  <div className="inner__book--wrapper">
                    <div className="inner__book--description-wrapper">
                      <h2 className="inner__book--description-title">
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
