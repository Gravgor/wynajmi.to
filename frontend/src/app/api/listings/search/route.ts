import { listings } from "@/mock/listings";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";


function normalizeString(str: string): string {
    const polishChars = 'ąćęłńóśźżĄĆĘŁŃÓŚŹŻ';
    const englishChars = 'acelnoszzACELNOSZZ';
    return str.split('').map(char => {
        const index = polishChars.indexOf(char);
        return index > -1 ? englishChars[index] : char;
    }).join('');
}

export async function GET(req: NextRequest): Promise<Response> {
    const { searchParams } = new URL(req.url);
    if (!searchParams.has("location") && !searchParams.has("propertyType") && !searchParams.has("priceRange") && !searchParams.has("rooms") && !searchParams.has("area") && !searchParams.has("amenities")) {
        return new Response(JSON.stringify(listings), {
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    const location = searchParams.get("location");
    const propertyType = searchParams.get("propertyType");
    const priceRange = searchParams.get("priceRange");
    const rooms = searchParams.get("rooms");
    const area = searchParams.get("area");
    const amenities = searchParams.get("amenities")?.split(',') || [];

    if(!location || !propertyType || !priceRange || !rooms || !area) {
        return new Response('Missing required query parameters', { status: 400 });
    }

   const filteredListings = prisma.listing.findMany({
        where: {
            location: {
                contains: normalizeString(location),
            },
            propertyType: {
                contains: normalizeString(propertyType),
            },
            price: {
                equals: parseFloat(normalizeString(priceRange)),
            },
            rooms: {
                equals: parseInt(normalizeString(rooms)),
            },
            area: {
                equals: parseFloat(normalizeString(area)),
            },
            amenities: {
                hasSome: amenities.map(amenity => normalizeString(amenity)),
            },
        },
   })

    return new Response(JSON.stringify(filteredListings), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}