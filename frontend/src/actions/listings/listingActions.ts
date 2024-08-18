'use server';

import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { Listing } from "@/types/Listing";
import normalizeString from "@/lib/utils/normalizeString";


export async function getListings(id?: string): Promise<Listing[]> {
    if (!id) {
        const listings = await prisma?.listing.findMany() || [];
        return listings as Listing[];
    }

    const listing = await prisma?.listing.findUnique({
        where: { id: id },
        include: { user: true },
    }) || null;
    return listing ? [listing as Listing] : [];
}

export async function searchListings(query: {
    location?: string;
    propertyType?: string;
    priceRange?: [number, number];
    rooms?: string;
    area?: string;
    amenities?: string[];
}): Promise<Listing[]> {
    const newLocation = query.location ? normalizeString(query.location).toLowerCase(): null;
    const whereConditions: any[] = [];
    if (newLocation) {
        const locationParts = newLocation.split(',').map(part => part.trim());
        whereConditions.push({
            location: {
                contains: locationParts[0],
                mode: 'insensitive',
            }
        });
        console.log(locationParts);
        console.log(JSON.stringify(whereConditions, null, 2));
    }
    if (query.propertyType) {
        whereConditions.push({ propertyType: { contains: normalizeString(query.propertyType) } });
    }
    if (query.priceRange) {
        const [minPrice, maxPrice] = Array.isArray(query.priceRange) ? query.priceRange : (query.priceRange as string).split(",");
        whereConditions.push({
            price: {
                gte: minPrice,
                lte: maxPrice,
            },
        });
    }

    if (query.rooms) {
        whereConditions.push({ rooms: { equals: parseInt(normalizeString(query.rooms), 10) } });
    }
    if (query.area) {
        whereConditions.push({ area: { equals: parseFloat(normalizeString(query.area)) } });
    }
    if (query.amenities && query.amenities.length > 0) {
        whereConditions.push({ amenities: { hasSome: query.amenities.map(amenity => normalizeString(amenity)) } });
    }

    try {
         const listings = await prisma?.listing.findMany({
            where: {
                AND: whereConditions,
            }
         })
        return listings as Listing[];
    } catch (err) {
        console.error(err);
        return [];
    }
}

export async function createListing(data: Partial<Listing>): Promise<Listing> {
    const session = await getServerSession();
    if (!session) {
        throw new Error('You must be authenticated to create a listing');
    }
    const {
        title,
        description,
        location,
        price,
        area,
        rooms,
        amenities,
        propertyType,
        latitude,
        longitude,
        images,
        userId
    } = data;

    if (!title || !description || !location || price === undefined || area === undefined || rooms === undefined || !amenities || !propertyType || latitude === undefined || longitude === undefined || !images || !userId) {
        throw new Error('Missing required fields');
    }

    try {
        const listing = await prisma?.listing.create({
            data: {
                title,
                description,
                location: normalizeString(location).toLowerCase(),
                latitude,
                longitude,
                price,
                area,
                rooms,
                amenities,
                propertyType,
                images,
                user: {
                    connect: { id: userId },
                },
            },
        }) || null;

        if (!listing) {
            throw new Error('Failed to create listing');
        }
        return listing as Listing;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to create listing');
    }
}
