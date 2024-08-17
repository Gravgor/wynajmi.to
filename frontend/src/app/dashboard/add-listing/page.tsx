"use client";
import { useEffect, useState } from "react";
import Autosuggest from 'react-autosuggest';
import { useRouter, useSearchParams } from "next/navigation";
import { createListing } from "@/actions";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

type Coordinates = { lat: number; lng: number };
type Suggestion = { title: string; placeId: string };


const fetchSuggestions = async (inputValue: string): Promise<Suggestion[]> => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${inputValue}&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.predictions.map((prediction: any) => ({
        title: prediction.description,
        placeId: prediction.place_id,
    }));
};


const LocationMarker = ({
  setLocation,
  location,
}: {
  setLocation: (location: any) => void;
  location: any;
}) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setLocation({ lat, lng });
    },
  });

  return location ? (
    <Marker
      position={[location.lat, location.lng]}
      icon={L.divIcon({ className: "leaflet-div-icon" })}
    />
  ) : null;
};

export default function AddListing() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [area, setArea] = useState("");
  const [rooms, setRooms] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  

  const amenitiesOptions = [
    'WiFi',
    'Air Conditioning',
    'Heating',
    'Parking',
    'Pool',
    'Gym',
    'Pet Friendly',
    'Washer/Dryer',
];

  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !title ||
      !description ||
      !price ||
      !location ||
      !area ||
      !rooms ||
      !propertyType
    ) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const listingData = {
        title,
        description,
        price: parseFloat(price),
        location: location,
        longitude: coordinates.lng,
        latitude: coordinates.lat,
        area: parseFloat(area),
        rooms: parseInt(rooms, 10),
        propertyType,
        amenities: selectedAmenities,
        userId: searchParams.get("userId") || "",
      };

      await createListing(listingData);

      router.push("/dashboard");
    } catch (error) {
      setError("Failed to create listing");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setCoordinates({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prevSelected) =>
        prevSelected.includes(amenity)
            ? prevSelected.filter((item) => item !== amenity)
            : [...prevSelected, amenity]
    );
};



  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 space-y-8">
      <h1 className="text-3xl font-extrabold mb-6">Add New Rental Listing</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg"
      >
        {/* Sekcja przesyłania zdjęcia */}
        <div className="mb-6 flex flex-col items-center">
          <label
            htmlFor="image"
            className="w-full cursor-pointer flex justify-center items-center h-48 bg-gray-200 border-2 border-dashed border-gray-400 rounded-lg relative overflow-hidden"
          >
            <input
              type="file"
              id="image"
              onChange={(e) =>
                setImage(e.target.files ? e.target.files[0] : null)
              }
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <span className="text-gray-500 text-lg font-semibold">+</span>
            <span className="absolute bottom-4 text-gray-500 text-sm">
              Dodaj zdjęcia
            </span>
          </label>
        </div>

        {/* Sekcja mapy */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Location on Map</label>
          <div className="w-full h-64 relative">
            <MapContainer
              center={
                userLocation
                  ? [userLocation.lat, userLocation.lng]
                  : [51.505, -0.09]
              } 
              zoom={13}
              style={{ height: "100%", width: "100%" }}
              scrollWheelZoom={false}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <LocationMarker
                setLocation={setCoordinates}
                location={coordinates}
              />
            </MapContainer>
          </div>
        </div>

        {/* Sekcja podstawowych informacji */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="price">
              Price
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="area">
              Area (sq ft)
            </label>
            <input
              type="number"
              id="area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="rooms">
              Number of Rooms
            </label>
            <input
              type="number"
              id="rooms"
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="propertyType">
              Property Type
            </label>
            <select
              id="propertyType"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            >
              <option value="" disabled>
                Select property type
              </option>
              <option value="1-bedroom">1 Bedroom</option>
              <option value="2-bedroom">2 Bedroom</option>
              <option value="studio">Studio</option>
              <option value="house">House</option>
            </select>
          </div>
        </div>

        {/* Sekcja opisu i udogodnień */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-lg"
            rows={4}
            required
          />
        </div>

        <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Amenities</label>
                    <div className="flex flex-wrap gap-2">
                        {amenitiesOptions.map((amenity) => (
                            <div
                                key={amenity}
                                className={`p-2 rounded-lg cursor-pointer ${selectedAmenities.includes(amenity) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                                onClick={() => toggleAmenity(amenity)}
                            >
                                {amenity}
                            </div>
                        ))}
                    </div>
                </div>

        <button
          type="submit"
          className="bg-primary text-white py-2 px-4 rounded-lg shadow-md hover:bg-primary-dark transition-colors duration-200"
          disabled={loading}
        >
          {loading ? "Adding Listing..." : "Add Listing"}
        </button>
      </form>
    </div>
  );
}
