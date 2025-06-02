// app/api/film-detail/route.ts
import { NextResponse } from "next/server";
import { getFilmById } from "@/components/GetFilmApi";

export async function POST(req: Request) {
  const body = await req.json();
  const { id } = body;

  try {
    const film = await getFilmById(id);
    return NextResponse.json(film);
  } catch (error) {
    return new NextResponse("Chyba při získávání detailu filmu", { status: 500 });
  }
}
