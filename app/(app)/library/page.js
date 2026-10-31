"use client";

import { useSelector } from "react-redux";
import { BookRow } from "@/components/BookCard";
import LoginPrompt from "@/components/LoginPrompt";

function LibrarySection({ title, books, loading, emptyTitle, emptyText }) {
  return (
    <div className="library__section">
      <div className="for-you__title">{title}</div>
      <div className="for-you__sub--title">
        {loading ? " " : `${books.length} ${books.length === 1 ? "item" : "items"}`}
      </div>
      {!loading && books.length === 0 ? (
        <div className="library__empty">
          <div className="library__empty--title">{emptyTitle}</div>
          <div className="library__empty--text">{emptyText}</div>
        </div>
      ) : (
        <BookRow books={books} loading={loading} count={3} />
      )}
    </div>
  );
}

export default function LibraryPage() {
  const user = useSelector((state) => state.user.user);
  const authLoading = useSelector((state) => state.user.authLoading);
  const { saved, finished, loading } = useSelector((state) => state.library);
  const isLoading = authLoading || (user && loading);

  return (
    <div className="row">
      <div className="container">
        {!isLoading && !user ? (
          <LoginPrompt text="Log in to your account to see your library." />
        ) : (
          <>
            <LibrarySection
              title="Saved Books"
              books={Object.values(saved)}
              loading={isLoading}
              emptyTitle="Save your favorite books!"
              emptyText="When you save a book, it will appear here."
            />
            <LibrarySection
              title="Finished"
              books={Object.values(finished)}
              loading={isLoading}
              emptyTitle="Done and dusted!"
              emptyText="When you finish a book, you can find it here later."
            />
          </>
        )}
      </div>
    </div>
  );
}
