// types/Listing.ts

import { Availability, SavedListing } from "@prisma/client";
import { User } from "./user";

export type ContactPerson = {
    name: string;
    phoneNumber: string;
    email: string;
  };
  

  type Reservation = {
    id: string;
    user: User;
    listing: Listing;
    listingId: string;
    checkIn: Date;
    checkOut: Date;
    createdAt: Date;
    updatedAt: Date;
  }



  export interface Listing {
    id: string;
    title: string;
    images: string[];
    description: string;
    price: number;
    location: string;
    propertyType: string;
    longitude: number;
    latitude: number;
    rooms: number;
    area: number;
    amenities: string[];
    createdAt: Date;
    updatedAt: Date;
    user: User;
    userId: string;
    reservations: Reservation[];
    availability: Availability[];
    savedListings: SavedListing[];
    detailPageUrl: string;
  }
  