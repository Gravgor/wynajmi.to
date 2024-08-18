import { useState } from "react";

type Place = {
  formattedAddress: string;
  displayName: {
    languageCode: string;
    text: string;
  };
};

type PlacesResponse = {
  places: Place[];
};

export function useGooglePlaces() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchPlaces = async (input: string) => {
    setLoading(true);
    try {
      const res = await fetch(`https://places.googleapis.com/v1/places:searchText`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': 'AIzaSyB7_Ac_jwt3sQvK8Fn09MPKWCcNrgqz7A4',
            'X-Goog-FieldMask': 'places.displayName,places.formattedAddress',
        },
        body: JSON.stringify({
            textQuery: input,
        }),
    });
      const data: PlacesResponse = await res.json();
      setPlaces(data.places);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { places, loading, error, fetchPlaces };
}
