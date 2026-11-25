export default function BookCard({ book, children }) {
  return (
    <article className="card">
      {book.cover ? (
        <img className="cover" src={book.cover} alt={`Cover ${book.title}`} loading="lazy" />
      ) : (
        <div className="cover no-cover">📖</div>
      )}
      <div className="card-body">
        <h3 className="card-title">{book.title}</h3>
        <p className="card-author">{book.author}</p>
        <p className="card-year">{book.year}</p>
        <div className="card-actions">{children}</div>
      </div>
    </article>
  );
}
