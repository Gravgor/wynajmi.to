"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createListing } from "@/actions";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Calendar from "react-calendar";
import TimePicker from "react-time-picker";
import "react-datetime/css/react-datetime.css";

type Suggestion = { title: string; placeId: string };

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
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [availableDates, setAvailableDates] = useState<
    { date: Date; time: string }[]
  >([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");

  const amenitiesOptions = [
    "WiFi",
    "Air Conditioning",
    "Heating",
    "Parking",
    "Pool",
    "Gym",
    "Pet Friendly",
    "Washer/Dryer",
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
        availability: availableDates.map((slot) => ({
          date: slot.date.toISOString().split("T")[0], 
          time: slot.time,
        })),
        images: imageUrls, 
      };

      await createListing(listingData);

      router.push("/dashboard");
    } catch (error) {
      setError("Failed to create listing");
    } finally {
      setLoading(false);
    }
  };

  const uploadImages = async () => {
    if (images.length === 0) return;

    const formData = new FormData();
    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const response = await fetch('/api/listings/images/upload', {
        method: 'POST',
        body: formData,
        next: {
          revalidate: 1,
        }
      });
      const responseJson = await response.json();
      setImageUrls((prevUrls) => [...prevUrls, responseJson.url]);
    } catch (error) {
      setError("Failed to upload images");
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

  useEffect(() => {
    if (images.length > 0) {
      uploadImages();
    }
    console.log(imageUrls);
  }, [images]);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prevSelected) =>
      prevSelected.includes(amenity)
        ? prevSelected.filter((item) => item !== amenity)
        : [...prevSelected, amenity]
    );
  };

  const handleDateChange = (date: any) => {
    setSelectedDate(date as Date);
  };

  const handleTimeChange = (time: string | null) => {
    setSelectedTime(time || "");
  };

  const addAvailableSlot = () => {
    if (selectedDate && selectedTime) {
      setAvailableDates((prevDates) => [
        ...prevDates,
        { date: selectedDate, time: selectedTime },
      ]);
      setSelectedDate(null);
      setSelectedTime("");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImages((prevImages) => [
        ...prevImages,
        ...Array.from(files),
      ]);
    } else {
      setError("No images selected");
    }
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 space-y-8">
      <h1 className="text-3xl font-extrabold mb-6">Add New Rental Listing</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg"
      >
        <div className="mb-6 flex flex-col items-center">
          <label
            htmlFor="image"
            className="w-full cursor-pointer flex flex-col justify-center items-center h-48 bg-gray-200 border-2 border-dashed border-gray-400 rounded-lg relative overflow-hidden"
          >
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
              multiple
            />
            <span className="text-gray-500 text-lg font-semibold">+</span>
            <span className="absolute bottom-4 text-gray-500 text-sm">
              Dodaj zdjęcia
            </span>
          </label>
          <p className="mt-2 text-gray-700">
            {images.length} {images.length === 1 ? 'image' : 'images'} added
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Image ${index + 1}`}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

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
          <label className="block text-gray-700 mb-2">
            Amenities
          </label>
          <div className="flex flex-wrap gap-2">
            {amenitiesOptions.map((amenity) => (
              <div
                key={amenity}
                className={`p-2 rounded-lg cursor-pointer ${
                  selectedAmenities.includes(amenity)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => toggleAmenity(amenity)}
              >
                {amenity}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">
            Available Dates and Times
          </label>
          <div className="mb-4">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              className="react-calendar"
            />
          </div>
          <div className="mb-4 w-full">
            <TimePicker
              onChange={handleTimeChange}
              value={selectedTime}
              format="HH:mm" 
            />
          </div>
          <button
            type="button"
            onClick={addAvailableSlot}
            className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition-colors duration-200"
          >
            Add Available Slot
          </button>
          <div className="mt-4">
            {availableDates.length > 0 && (
              <ul>
                {availableDates.map((slot, index) => (
                  <li key={index}>
                    {slot.date.toDateString()} at {slot.time}
                  </li>
                ))}
              </ul>
            )}
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
