import { listings } from "@/mock/listings";
import { NextRequest } from "next/server";


export async function GET(req: NextRequest): Promise<Response> {
    const { searchParams } = new URL(req.url)
    const location = searchParams.get("location");
    const propertyType = searchParams.get("propertyType");
    const priceRange = searchParams.get("priceRange");
    const filteredListings = listings.filter((listing) => {
        const matchesLocation = location ? listing.location.toLowerCase().includes(location.toString().toLowerCase()) : true;
        const matchesPropertyType = propertyType ? listing.propertyType === propertyType.toString() : true;
        const matchesPriceRange = priceRange ? listing.price === priceRange.toString() : true;
        return matchesLocation && matchesPropertyType && matchesPriceRange;
    });
    return new Response(JSON.stringify(filteredListings), {
        headers: {
            "Content-Type": "application/json",
        },
    });
    
}