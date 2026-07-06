import { NextResponse } from "next/server";
import books from "@/app/api/db";

export async function PUT(request, context = { params }) {
  const { id } = context.params;
  const updatedBook = await request.json();
  const bookIndex = books.findIndex((book) => book.id === parseInt(id));

  books[bookIndex] = updatedBook;
  return NextResponse.json(books);
}

export async function DELETE(request, context = { params }) {
  const { id } = context.params;
  const bookIndex = books.findIndex((book) => book.id === parseInt(id));
  books.splice(bookIndex, 1);
  return NextResponse.json(books);
}


