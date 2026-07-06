import { NextResponse } from "next/server";
import books from "@/app/api/db";

export async function GET() {
  return NextResponse.json(books);
}

export async function POST(request) {
  const newBook = await request.json();
  books.push(newBook);

  return NextResponse.json(books);
}
