export function buildSearchUrl(query: {
    location?: string;
    propertyType?: string;
    priceRange?: string;
    rooms?: string;
    area?: string;
    amenities?: string[];
  }): string {
    const baseUrl = 'http://localhost:3000/api/listings/search';
    const queryParams: string[] = [];
  
    if (query.location) queryParams.push(`location=${encodeURIComponent(query.location)}`);
    if (query.propertyType) queryParams.push(`propertyType=${encodeURIComponent(query.propertyType)}`);
    if (query.priceRange) queryParams.push(`priceRange=${encodeURIComponent(query.priceRange)}`);
    if (query.rooms) queryParams.push(`rooms=${encodeURIComponent(query.rooms)}`);
    if (query.area) queryParams.push(`area=${encodeURIComponent(query.area)}`);
    if (query.amenities && query.amenities.length > 0) {
      queryParams.push(`amenities=${encodeURIComponent(query.amenities.join(','))}`);
    }
  
    return `${baseUrl}?${queryParams.join('&')}`;
  }
  