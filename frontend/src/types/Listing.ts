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
    bedrooms: number;
    size: string;
    detailPageUrl: string;
    description: string;
    longDescription?: string;
    contactPerson: ContactPerson;
  };
  
  export type Listings = Listing[];