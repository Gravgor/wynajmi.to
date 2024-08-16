'use server';

import { Listing } from "./types/Listing";

export async function getListing(id: number): Promise<Listing> {
  const response = await fetch(`http://localhost:3000/api/listings?id=${id}`, {next: {revalidate: 100}});
    if(!response.ok) {
        throw new Error('An error occurred while fetching the listing');
    }
  const listing = await response.json();
  return listing;
}

export async function getListings(): Promise<Listing[]> {
  const response = await fetch('/api/listings');
  const listings = await response.json();
  return listings;
}

export async function searchListings(query: { location: string; propertyType: string; priceRange: string }): Promise<Listing[]> {
  const response = await fetch(`http://localhost:3000/api/listings/search?location=${query.location}&propertyType=${query.propertyType}&priceRange=${query.priceRange}`);
  if(!response.ok) {
    throw new Error('An error occurred while searching for listings');
  }
  const listings = await response.json();
  return listings;
}