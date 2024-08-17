import { listings } from "@/mock/listings";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if(!id) {
    return new Response(JSON.stringify(listings), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  const listing = listings.find((listing) => listing.id === Number(id));
    if (!listing) {
        return new Response("Listing not found", { status: 404 });
    }
  return new Response(JSON.stringify(listing), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}