import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import normalizeString from '@/lib/utils/normalizeString';

export async function GET(req: NextRequest): Promise<Response> {
    const { searchParams } = new URL(req.url);
    const location = searchParams.get('location') || '';
    const propertyType = searchParams.get('propertyType') || '';
    const priceRange = searchParams.get('priceRange') || '';
    const rooms = searchParams.get('rooms') || '';
    const area = searchParams.get('area') || '';
    const amenities = searchParams.get('amenities')?.split(',') || [];

    const whereConditions: any = [];

    if (location) {
        whereConditions.push({
            location: {
                contains: normalizeString(location),
            },
        });
    }

    if (propertyType) {
        whereConditions.push({
            propertyType: {
                contains: normalizeString(propertyType),
            },
        });
    }

    if (priceRange) {
        whereConditions.push({
            price: {
                equals: parseFloat(normalizeString(priceRange)),
            },
        });
    }

    if (rooms) {
        whereConditions.push({
            rooms: {
                equals: parseInt(normalizeString(rooms), 10),
            },
        });
    }

    if (area) {
        whereConditions.push({
            area: {
                equals: parseFloat(normalizeString(area)),
            },
        });
    }

    if (amenities.length > 0) {
        whereConditions.push({
            amenities: {
                hasSome: amenities.map((amenity) => normalizeString(amenity)),
            },
        });
    }

    try {
        const filteredListings = await prisma.listing.findMany({
            where: {
                AND: whereConditions,
            },
        });

        return new Response(JSON.stringify(filteredListings), {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error fetching listings:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}
