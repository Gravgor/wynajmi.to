// types/Listing.ts

export type ContactPerson = {
    name: string;
    phoneNumber: string;
    email: string;
  };
  
  export type Listing = {
    id: number;
    images: string[];
    location: string;
    price: string;
    propertyType: string;
    rooms: string;
    area: string;
    amenities: string[];
    bedrooms: number;
    size: string;
    detailPageUrl: string;
    description: string;
    longDescription?: string;
    contactPerson: ContactPerson;
    availableDates: {
      date: string;
      times: string[];
    }[];
  };
  
  export type Listings = Listing[];