import { useState } from "react";
import BookCard from "../components/BookCard.jsx";

export default function AddReading({ library, onAdd }) {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);
  const [toast, setToast] = useState("");

  async function fetchBooks(keyword) {
    setLoading(true); 
    setError("");
    setSearched(true);
    try {
      const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(
        keyword
      )}&fields=key,title,author_name,first_publish_year,cover_i&limit=10`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`); // error HTTP

      const data = await response.json();
      // Ubah data API menjadi bentuk yang sederhana
      const result = data.docs.map((doc) => ({
        id: doc.key,
        title: doc.title,
        author: doc.author_name ? doc.author_name.join(", ") : "Unknown author",
        year: doc.first_publish_year || "Year unknown",
        cover: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : "",
      }));
      setBooks(result); 
    } catch (err) {
      setBooks([]);
      setError("Failed to load books. Please try again."); 
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim()) fetchBooks(query.trim());
  }

  function handleAdd(book) {
    const ok = onAdd(book);
    setToast(ok ? `"${book.title}" added to your library ✓` : "This book is already in your library.");
    setTimeout(() => setToast(""), 2500);
  }

  return (
    <section>
      <h1 className="page-title">Add Reading</h1>
      <p className="page-subtitle">Search by title or author, then add it to your library.</p>

      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="e.g. Laskar Pelangi or Pramoedya"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>

      {toast && <div className="toast">{toast}</div>}

      {loading && <p className="status">Searching for books...</p>}

      {error && (
        <div className="status error">
          <p>{error}</p>
          <button className="btn btn-primary" onClick={() => fetchBooks(query.trim())}>
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && searched && books.length === 0 && (
        <p className="status">No books found. Try another keyword.</p>
      )}

      <div className="grid">
        {books.map((book) => {
          const added = library.some((b) => b.id === book.id);
          return (
            <BookCard key={book.id} book={book}>
              <button
                className={added ? "btn btn-disabled" : "btn btn-primary"}
                disabled={added}
                onClick={() => handleAdd(book)}
              >
                {added ? "Added" : "Add to Library"}
              </button>
            </BookCard>
          );
        })}
      </div>
    </section>
  );
}
