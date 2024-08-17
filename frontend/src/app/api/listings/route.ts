import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    const listings = await prisma.listing.findMany();
    return new Response(JSON.stringify(listings), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  const listing = await prisma.listing.findUnique({
    where: {
      id: id,
    },
  });
  if (!listing) {
    return new Response("Listing not found", { status: 404 });
  }
  return new Response(JSON.stringify(listing), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
