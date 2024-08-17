import { listings } from "@/mock/listings";
import { NextRequest } from "next/server";

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

    const filteredListings = listings.filter((listing) => {
        let matches = true;
        if (location) {
            const normalizedLocation = normalizeString(location.toLowerCase());
            const normalizedListingLocation = normalizeString(listing.location.split(",")[0].toLowerCase());
            matches = matches && normalizedListingLocation === normalizedLocation;
        }
        if (propertyType) {
            matches = matches && listing.propertyType === propertyType;
        }
        if (priceRange) {
            matches = matches && listing.price === priceRange;
        }
        if (rooms) {
            matches = matches && listing.rooms === rooms;
        }
        if (area) {
            const normalizedArea = normalizeString(area.toLowerCase());
            const normalizedListingArea = normalizeString(listing.area.toLowerCase());
            matches = matches && normalizedListingArea === normalizedArea;
        }
        if (amenities.length > 0) {
            for (const amenity of amenities) {
                matches = matches && listing.amenities.includes(amenity);
            }
        }
        return matches;
    });

    return new Response(JSON.stringify(filteredListings), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}