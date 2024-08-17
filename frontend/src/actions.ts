'use server';


import { getServerSession } from "next-auth";
import { Listing } from "./types/Listing";
import { User } from "./types/user";
import { buildSearchUrl } from "./lib/utils/actions/buildSearchQuery";


const apiBaseUrl = process.env.ENV === 'vercel' ? 'https://wynajmi-to.vercel.app/api' : 'http://localhost:3000/api';

export async function getListing(id: string): Promise<Listing> {
  const response = await fetch(`${apiBaseUrl}/listings?id=${id}`, {next: {revalidate: 100}});
    if(!response.ok) {
        throw new Error('An error occurred while fetching the listing');
    }
  const listing = await response.json();
  return listing;
}

export async function getListings(): Promise<Listing[]> {
  const response = await fetch(`${apiBaseUrl}/listings`);
  const listings = await response.json();
  return listings;
}

export async function searchListings(query: {
  location?: string;
  propertyType?: string;
  priceRange?: string;
  rooms?: string;
  area?: string;
  amenities?: string[];
}): Promise<Listing[]> {
  const url = buildSearchUrl(query);
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error('An error occurred while searching for listings');
  }
  
  const listings = await response.json();
  return listings;
}

export async function createListing(data: Partial<Listing>): Promise<Listing> {
  const session = await getServerSession();
  if(!session) {
    throw new Error('You must be authenticated to create a listing');
  }
  const response = await fetch(`${apiBaseUrl}/listings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const listing = await response.json();
  return listing;
}



export async function authenticate(email: string, password: string): Promise<User> {
  const response = await fetch(`${apiBaseUrl}/api/authenticate`, {
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
  const response = await fetch(`${apiBaseUrl}/users/${id}`);
  if(!response.ok) {
    throw new Error('An error occurred while fetching the user');
  }
  const user = await response.json();
  return user;
}

export async function updateUser(id: string, data: Partial<User>): Promise<User> {
  const response = await fetch(`${apiBaseUrl}/api/users/${id}`, {
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
  const response = await fetch(`${apiBaseUrl}/api/users/${id}`, {
    method: 'DELETE',
  });
  if(!response.ok) {
    throw new Error('An error occurred while deleting the user');
  }
}

