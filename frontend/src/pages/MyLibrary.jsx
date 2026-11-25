import { useState } from "react";
import { Link } from "react-router-dom";
import BookCard from "../components/BookCard.jsx";

export default function MyLibrary({ library, onToggle, onRemove }) {
  const [filter, setFilter] = useState("all"); 

  const shown = filter === "all" ? library : library.filter((b) => b.bookmarked);

  return (
    <section>
      <h1 className="page-title">My Library</h1>
      <p className="page-subtitle">Your personal reading collection.</p>

      <div className="filters">
        <button className={filter === "all" ? "chip active" : "chip"} onClick={() => setFilter("all")}>
          All Books
        </button>
        <button
          className={filter === "bookmarked" ? "chip active" : "chip"}
          onClick={() => setFilter("bookmarked")}
        >
          Bookmarked
        </button>
      </div>

      {library.length === 0 ? (
        <div className="empty">
          <div className="empty-icon">📚</div>
          <p>Your library is empty.</p>
          <Link to="/" className="btn btn-primary">Find your first book</Link>
        </div>
      ) : shown.length === 0 ? (
        <div className="empty">
          <div className="empty-icon">🔖</div>
          <p>No bookmarked books yet.</p>
        </div>
      ) : (
        <div className="grid">
          {shown.map((book) => (
            <BookCard key={book.id} book={book}>
              <button
                className={book.bookmarked ? "icon-btn on" : "icon-btn"}
                onClick={() => onToggle(book.id)}
                aria-label="Toggle bookmark"
                title="Bookmark"
              >
                {book.bookmarked ? "♥" : "♡"}
              </button>
              <button className="btn btn-outline" onClick={() => onRemove(book.id)}>
                Remove
              </button>
            </BookCard>
          ))}
        </div>
      )}
    </section>
  );
}
