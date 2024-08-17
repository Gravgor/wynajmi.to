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
    include: {
      user: true,
    }
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


export async function POST(req: NextRequest): Promise<Response> {
  const body = await req.json();
  const { title, description, location, price, area, rooms, amenities, propertyType, latitude, longitude, userId } = body;
  if (!userId) {
    return new Response("User ID is required", { status: 400 });
  }
  const images = [
    {
      url: "https://properties-photos.s3.eu-north-1.amazonaws.com/uploads/1723911265883_offerphoto1.jpeg",
    },
    {
      url: "https://properties-photos.s3.eu-north-1.amazonaws.com/uploads/1723911265883_offerphoto2.jpeg",
    },
    {
      url: "https://properties-photos.s3.eu-north-1.amazonaws.com/uploads/1723911265883_offerphoto3.jpeg",
    },
    {
      url: "https://properties-photos.s3.eu-north-1.amazonaws.com/uploads/1723911265883_offerphoto4.jpeg",
    }
  ]

  try {
    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        location,
        latitude,
        longitude,
        price,
        area,
        rooms,
        amenities,
        propertyType,
        images: images.map((image: { url: string }) => image.url),
        user: {
          connect: {
            id: userId
          },
        },
      },
    });

    return new Response(JSON.stringify(listing), { status: 201 });
  } catch (error) {
    console.error("Error creating listing:", error);
    return new Response("Failed to create listing", { status: 500 });
  }
}