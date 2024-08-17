'use server';

import { Listing } from "./types/Listing";
import { User } from "./types/user";

export async function getListing(id: number): Promise<Listing> {
  const response = await fetch(`http://localhost:3000/api/listings?id=${id}`, {next: {revalidate: 100}});
    if(!response.ok) {
        throw new Error('An error occurred while fetching the listing');
    }
  const listing = await response.json();
  return listing;
}

export async function getListings(): Promise<Listing[]> {
  const response = await fetch('http://localhost:3000/api/listings');
  const listings = await response.json();
  return listings;
}

export async function searchListings(query: { location: string; propertyType: string; priceRange: string; rooms: string; area: string; amenities: string[]}): Promise<Listing[]> {
  const response = await fetch(`http://localhost:3000/api/listings/search?location=${query.location}&propertyType=${query.propertyType}&priceRange=${query.priceRange}&rooms=${query.rooms}&area=${query.area}`);
  if(!response.ok) {
    throw new Error('An error occurred while searching for listings');
  }
  const listings = await response.json();
  return listings;
}



export async function authenticate(email: string, password: string): Promise<User> {
  const response = await fetch('http://localhost:3000/api/authenticate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  if(!response.ok) {
    throw new Error('An error occurred while authenticating');
  }
  const user = await response.json();
  return user;
}

export async function getUser(id: string): Promise<User> {
  const response = await fetch(`http://localhost:3000/api/users/${id}`);
  if(!response.ok) {
    throw new Error('An error occurred while fetching the user');
  }
  const user = await response.json();
  return user;
}

export async function updateUser(id: string, data: Partial<User>): Promise<User> {
  const response = await fetch(`http://localhost:3000/api/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if(!response.ok) {
    throw new Error('An error occurred while updating the user');
  }
  const user = await response.json();
  return user;
}

export async function deleteUser(id: string): Promise<void> {
  const response = await fetch(`http://localhost:3000/api/users/${id}`, {
    method: 'DELETE',
  });
  if(!response.ok) {
    throw new Error('An error occurred while deleting the user');
  }
}

