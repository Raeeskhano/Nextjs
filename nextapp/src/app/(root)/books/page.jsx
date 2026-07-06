import React from "react";

const Book = async () => {
  const response = await fetch("http://localhost:3000/api/books");
  const books = await response.json();
  console.log(books);
  return (
    <div>
      Book Page
      <div>
        {books.map((book) => (
          <div key={book.id}>
            <h2>{book.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Book;
