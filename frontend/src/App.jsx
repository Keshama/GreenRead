import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import AddReading from "./pages/AddReading.jsx";
import MyLibrary from "./pages/MyLibrary.jsx";

const STORAGE_KEY = "leafread-library";

function loadLibrary() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export default function App() {
  const [library, setLibrary] = useState(loadLibrary);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(library));
  }, [library]);

  function addBook(book) {
    if (library.some((b) => b.id === book.id)) return false;
    setLibrary([...library, { ...book, bookmarked: false }]);
    return true;
  }

  function toggleBookmark(id) {
    setLibrary(library.map((b) => (b.id === id ? { ...b, bookmarked: !b.bookmarked } : b)));
  }

  function removeBook(id) {
    setLibrary(library.filter((b) => b.id !== id));
  }

  return (
    <BrowserRouter>
      <Navbar count={library.length} />
      <main className="container">
        <Routes>
          <Route path="/" element={<AddReading library={library} onAdd={addBook} />} />
          <Route
            path="/library"
            element={<MyLibrary library={library} onToggle={toggleBookmark} onRemove={removeBook} />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
