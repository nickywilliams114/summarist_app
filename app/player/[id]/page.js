"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { fetchBook } from "@/lib/books";
import AudioPlayer from "@/components/AudioPlayer";
import "./style.css";

export default function PlayerPage({ params: paramsPromise }) {
  const [book, setBook] = useState(null);

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

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="player">
      <div className="player__wrapper">
        <div className="player__title">{book.title}</div>
        <div className="player__summary" style={{ whiteSpace: "pre-line" }}>
          {book.summary}
        </div>
        <div className="player__audio--player">
          <AudioPlayer audioLink={book.audioLink} />
        </div>
      </div>
    </div>
  );
}
