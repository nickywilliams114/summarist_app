"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineStar, AiOutlineClockCircle, AiOutlineRead } from "react-icons/ai";
import { HiOutlineMicrophone, HiOutlineLightBulb } from "react-icons/hi";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { fetchBook } from "@/lib/books";
import { BookDuration } from "@/lib/duration";
import { openAuthModal, selectIsSubscribed } from "@/redux/userSlice";
import { toggleSaved } from "@/redux/librarySlice";
import Skeleton from "@/components/Skeleton";

function BookSkeleton() {
  return (
    <div className="inner__wrapper">
      <div className="inner__book">
        <Skeleton width="80%" height="36px" />
        <Skeleton width="40%" height="20px" />
        <Skeleton width="70%" height="24px" />
        <Skeleton width="100%" height="96px" />
        <Skeleton width="280px" height="48px" />
        <Skeleton width="200px" height="24px" />
        <Skeleton width="100%" height="200px" />
      </div>
      <div className="inner-book--img-wrapper">
        <Skeleton width="300px" height="300px" />
      </div>
    </div>
  );
}

export default function BookPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [book, setBook] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const user = useSelector((state) => state.user.user);
  const isSubscribed = useSelector(selectIsSubscribed);
  const isSaved = useSelector((state) => Boolean(state.library.saved[id]));

  useEffect(() => {
    let cancelled = false;
    setBook(null);
    setNotFound(false);
    fetchBook(id).then((bookData) => {
      if (cancelled) return;
      if (bookData) {
        setBook(bookData);
      } else {
        setNotFound(true);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [id]);

  // Read and Listen both lead to the player, gated by login and subscription.
  function handleOpenPlayer() {
    if (!user) {
      dispatch(openAuthModal());
      return;
    }
    if (book.subscriptionRequired && !isSubscribed) {
      router.push("/choose-plan");
      return;
    }
    router.push(`/player/${book.id}`);
  }

  function handleToggleLibrary() {
    if (!user) {
      dispatch(openAuthModal());
      return;
    }
    dispatch(toggleSaved(book));
  }

  if (notFound) {
    return (
      <div className="row">
        <div className="container">
          <div className="page__error">This book could not be found.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="container">
        {!book ? (
          <BookSkeleton />
        ) : (
          <div className="inner__wrapper">
            <div className="inner__book">
              <div className="inner-book__title">
                {book.title}
                {book.subscriptionRequired && !isSubscribed && " (Premium)"}
              </div>
              <div className="inner-book__author">{book.author}</div>
              <div className="inner-book__sub--title">{book.subTitle}</div>

              <div className="inner-book__wrapper">
                <div className="inner-book__description--wrapper">
                  <div className="inner-book__description">
                    <AiOutlineStar />
                    <span className="inner-book__overall--rating">
                      {book.averageRating}
                    </span>
                    <span className="inner-book__total--rating">
                      ({book.totalRating} ratings)
                    </span>
                  </div>
                  <div className="inner-book__description">
                    <AiOutlineClockCircle />
                    <BookDuration audioLink={book.audioLink} />
                  </div>
                  <div className="inner-book__description">
                    <HiOutlineMicrophone />
                    {book.type}
                  </div>
                  <div className="inner-book__description">
                    <HiOutlineLightBulb />
                    {book.keyIdeas} Key ideas
                  </div>
                </div>
              </div>

              <div className="inner-book__read--btn-wrapper">
                <button className="inner-book__read--btn" onClick={handleOpenPlayer}>
                  <AiOutlineRead className="inner-book__read--icon" />
                  <div className="inner-book__read--text">Read</div>
                </button>
                <button className="inner-book__read--btn" onClick={handleOpenPlayer}>
                  <HiOutlineMicrophone className="inner-book__read--icon" />
                  <div className="inner-book__read--text">Listen</div>
                </button>
              </div>

              <button className="inner-book__bookmark" onClick={handleToggleLibrary}>
                {isSaved ? <BsBookmarkFill /> : <BsBookmark />}
                <span>
                  {isSaved ? "Saved in My Library" : "Add title to My Library"}
                </span>
              </button>

              <div className="inner-book__secondary--title">What&apos;s it about?</div>
              <div className="inner-book__tags--wrapper">
                {book.tags?.map((tag) => (
                  <div className="inner-book__tag" key={tag}>
                    {tag}
                  </div>
                ))}
              </div>
              <div className="inner-book__book--description">
                {book.bookDescription}
              </div>

              {book.authorDescription && (
                <>
                  <h2 className="inner-book__secondary--title">About the author</h2>
                  <div className="inner-book__author--description">
                    {book.authorDescription}
                  </div>
                </>
              )}
            </div>

            <div className="inner-book--img-wrapper">
              <figure className="inner-book__image--mask">
                <img src={book.imageLink} alt={book.title} />
              </figure>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
