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
                  <div className="inner__book--wrapper">
                    <div className="inner__book--description-wrapper">
                      <div className="inner__book--description">
                        {book.bookDescription}
                      </div>
                    </div>
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
