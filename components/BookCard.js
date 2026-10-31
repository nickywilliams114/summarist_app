"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { AiOutlineClockCircle, AiOutlineStar } from "react-icons/ai";
import { BookDuration } from "@/lib/duration";
import { selectIsSubscribed } from "@/redux/userSlice";
import Skeleton from "./Skeleton";

export default function BookCard({ book }) {
  const isSubscribed = useSelector(selectIsSubscribed);

  return (
    <Link href={`/book/${book.id}`} className="book-card">
      {book.subscriptionRequired && !isSubscribed && (
        <div className="book-card__pill">Premium</div>
      )}
      <figure className="book-card__image--wrapper">
        <img className="book-card__image" src={book.imageLink} alt={book.title} />
      </figure>
      <div className="book-card__title">{book.title}</div>
      <div className="book-card__author">{book.author}</div>
      <div className="book-card__sub-title">{book.subTitle}</div>
      <div className="book-card__details">
        <div className="book-card__detail">
          <AiOutlineClockCircle />
          <BookDuration audioLink={book.audioLink} />
        </div>
        <div className="book-card__detail">
          <AiOutlineStar />
          {book.averageRating}
        </div>
      </div>
    </Link>
  );
}

export function BookCardSkeleton() {
  return (
    <div className="book-card book-card--skeleton">
      <Skeleton width="100%" height="240px" />
      <Skeleton width="80%" height="20px" />
      <Skeleton width="60%" height="16px" />
      <Skeleton width="90%" height="32px" />
    </div>
  );
}

export function BookRow({ books, loading, count = 5 }) {
  return (
    <div className="book-row">
      {loading
        ? Array.from({ length: count }, (_, i) => <BookCardSkeleton key={i} />)
        : books.map((book) => <BookCard key={book.id} book={book} />)}
    </div>
  );
}
