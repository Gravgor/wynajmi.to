// types/Listing.ts

export type ContactPerson = {
    name: string;
    phoneNumber: string;
    email: string;
  };
  

  export type Listing = {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    price: number;
    location: string;
    longitude: number;
    latitude: number;
    propertyType: string;
    rooms: number;
    bedrooms: number;
    area: number;
    amenities: string[];
    images: string[];
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
    availableDates: {
      date: string;
      times: string[];
    }[];
    detailPageUrl: string;
    userId?: string;
  }
  
  export type Listings = Listing[];