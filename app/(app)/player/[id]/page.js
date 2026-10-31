"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchBook } from "@/lib/books";
import { selectIsSubscribed } from "@/redux/userSlice";
import { markFinished } from "@/redux/librarySlice";
import AudioPlayer from "@/components/AudioPlayer";
import Skeleton from "@/components/Skeleton";

export default function PlayerPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [book, setBook] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const authLoading = useSelector((state) => state.user.authLoading);
  const isSubscribed = useSelector(selectIsSubscribed);

  useEffect(() => {
    let cancelled = false;
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

  // Premium books need a subscription, even when the URL is opened directly.
  useEffect(() => {
    if (book && !authLoading && book.subscriptionRequired && !isSubscribed) {
      router.replace("/choose-plan");
    }
  }, [book, authLoading, isSubscribed, router]);

  if (notFound) {
    return (
      <div className="row">
        <div className="container">
          <div className="page__error">This book could not be found.</div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="summary">
        <div className="audio__book--summary">
          <Skeleton width="70%" height="36px" />
          <div className="audio__book--spacer"></div>
          <Skeleton width="100%" height="480px" />
        </div>
      </div>
    );
  }

  return (
    <div className="summary">
      <div className="audio__book--summary">
        <div className="audio__book--summary-title">
          <b>{book.title}</b>
        </div>
        <div className="audio__book--summary-text">{book.summary}</div>
      </div>
      <AudioPlayer book={book} onEnded={() => dispatch(markFinished(book))} />
    </div>
  );
}
