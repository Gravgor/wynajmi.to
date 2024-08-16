// types/Listing.ts
export interface Listing {
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
  }
  