"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createListing } from "@/actions";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Calendar from "react-calendar";
import TimePicker from "react-time-picker";
import "react-datetime/css/react-datetime.css";
import { FaImages, FaInfoCircle, FaMapMarkerAlt, FaTools } from "react-icons/fa";
import Image from "next/image";

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
  const [currentStep, setCurrentStep] = useState(1);
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

  const uploadImage = async (image: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch('/api/listings/images/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const responseJson = await response.json();
      setImageUrls((prevUrls) => [...prevUrls, responseJson.url]);
      return responseJson.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const removeImages = async () => {
    try {
      await fetch('/api/listings/images/upload', {
        method: 'DELETE',
        body: JSON.stringify({ urls: imageUrls }),
      });
    } catch (error) {
      console.error("Failed to remove images:", error);
    }
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setLoading(true);
      setError(null);

      try {
        await uploadImage(files[0]);
        setImages((prevImages) => [...prevImages, ...Array.from(files)]);
      } catch (error) {
        console.error("Error uploading images:", error);
        setError("Failed to upload images");
      } finally {
        setLoading(false);
      }
    } else {
      setError("No images selected");
    }
  };

  const removeImage = (index: number) => {
    removeImages();
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
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

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prevSelected) =>
      prevSelected.includes(amenity)
        ? prevSelected.filter((item) => item !== amenity)
        : [...prevSelected, amenity]
    );
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };


  return (
    <div className="container mx-auto px-6 py-12 bg-[#F3F4F6] space-y-8">
      <h1 className="text-4xl font-extrabold text-black mb-8">Wynajmi.to - Dodaj nową ofertę</h1>

      <div className="mb-8">
        <div className="flex justify-between mb-4">
          <div
            className={`flex-1 text-center py-2 rounded-t-lg ${currentStep === 1 ? 'bg-[#3B82F6] text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            <FaInfoCircle className="inline-block text-xl mr-1 mb-[1px]" />
            Podstawowe informacje
          </div>
          <div
            className={`flex-1 text-center py-2 rounded-t-lg ${currentStep === 2 ? 'bg-[#3B82F6] text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            <FaImages className="inline-block text-xl mr-1 mb-[1px]" />
            Zdjęcia
          </div>
          <div
            className={`flex-1 text-center py-2 rounded-t-lg ${currentStep === 3 ? 'bg-[#3B82F6] text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            <FaMapMarkerAlt className="inline-block text-xl mr-1 mb-[1px]" />
            Lokalizacja na mapie
          </div>
          <div
            className={`flex-1 text-center py-2 rounded-t-lg ${currentStep === 4 ? 'bg-[#3B82F6] text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            <FaTools className="inline-block text-xl mr-1 mb-[1px]" />
            Dodatkowe informacje
          </div>
        </div>
        <div className="relative w-full h-1 bg-gray-300 rounded-lg">
          <div
            className="absolute top-0 left-0 h-full bg-[#3B82F6] rounded-lg"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg"
      >
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div>
            <div className="mb-8">
              <label className="block text-gray-700 mb-2" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-[#E5E7EB] rounded-lg shadow-sm"
                required
              />
            </div>

            <div className="mb-8">
              <label className="block text-gray-700 mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-[#E5E7EB] rounded-lg shadow-sm"
                rows={4}
                required
              />
            </div>

            <div className="mb-8">
              <label className="block text-gray-700 mb-2" htmlFor="price">
                Price
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-3 border border-[#E5E7EB] rounded-lg shadow-sm"
                required
              />
            </div>

            <div className="mb-8">
              <label className="block text-gray-700 mb-2" htmlFor="location">
                Location
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 border border-[#E5E7EB] rounded-lg shadow-sm"
                required
              />
            </div>

            <div className="mb-8">
              <label className="block text-gray-700 mb-2" htmlFor="propertyType">
                Property Type
              </label>
              <select
                id="propertyType"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full p-3 border border-[#E5E7EB] rounded-lg shadow-sm"
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

            <div className="mb-8">
              <label className="block text-gray-700 mb-2" htmlFor="area">
                Area (sq ft)
              </label>
              <input
                type="number"
                id="area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full p-3 border border-[#E5E7EB] rounded-lg shadow-sm"
                required
              />
            </div>

            <div className="mb-8">
              <label className="block text-gray-700 mb-2" htmlFor="rooms">
                Number of Rooms
              </label>
              <input
                type="number"
                id="rooms"
                value={rooms}
                onChange={(e) => setRooms(e.target.value)}
                className="w-full p-3 border border-[#E5E7EB] rounded-lg shadow-sm"
                required
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={nextStep}
                className="bg-[#3B82F6] text-white py-3 px-6 rounded-lg shadow-md hover:bg-[#1D4ED8] transition-colors duration-200"
              >
                Następny krok
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Upload Photos */}
        {currentStep === 2 && (
          <div>
            <div className="mb-8 flex flex-col items-center">
              <label
                htmlFor="image"
                className="w-full cursor-pointer flex flex-col justify-center items-center h-48 bg-[#FFFFFF] border-2 border-dashed border-[#E5E7EB] rounded-lg relative overflow-hidden"
              >
                <input
                  type="file"
                  id="image"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  multiple
                />
                <span className="text-[#3B82F6] text-4xl font-bold">+</span>
                <span className="absolute bottom-4 text-gray-500 text-lg">
                  Add Photos
                </span>
              </label>
              <p className="mt-2 text-gray-700">
                {images.length} {images.length === 1 ? 'photo' : 'photos'} added
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Image ${index + 1}`}
                      className="w-32 h-32 object-cover rounded-lg border-2 border-[#E5E7EB]"
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

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="bg-[#3B82F6] text-white py-3 px-6 rounded-lg shadow-md hover:bg-[#1D4ED8] transition-colors duration-200"
              >
                Poprzedni krok
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="bg-[#3B82F6] text-white py-3 px-6 rounded-lg shadow-md hover:bg-[#1D4ED8] transition-colors duration-200"
              >
                Następny krok
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Map Location */}
        {currentStep === 3 && (
          <div>
            <label className="block text-gray-700 mb-2">Location on Map</label>
            <div className="w-full h-64 relative rounded-lg overflow-hidden shadow-md">
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

            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={prevStep}
                className="bg-[#3B82F6] text-white py-3 px-6 rounded-lg shadow-md hover:bg-[#1D4ED8] transition-colors duration-200"
              >
                Poprzedni krok
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="bg-[#3B82F6] text-white py-3 px-6 rounded-lg shadow-md hover:bg-[#1D4ED8] transition-colors duration-200"
              >
                Następny krok
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Additional Details */}
        {currentStep === 4 && (
          <div>
            <div className="mb-8">
              <label className="block text-gray-700 mb-2">Amenities</label>
              <div className="flex flex-wrap gap-2">
                {amenitiesOptions.map((amenity) => (
                  <div
                    key={amenity}
                    className={`p-3 rounded-lg cursor-pointer border border-[#E5E7EB] ${
                      selectedAmenities.includes(amenity)
                        ? "bg-[#3B82F6] text-white"
                        : "bg-white text-gray-700"
                    }`}
                    onClick={() => toggleAmenity(amenity)}
                  >
                    {amenity}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-gray-700 mb-2">
                Available Dates and Times
              </label>
              <div className="mb-4">
                <Calendar
                  onChange={handleDateChange}
                  value={selectedDate}
                  className="react-calendar rounded-lg shadow-sm"
                />
              </div>
              <div className="mb-4 w-full">
                <TimePicker
                  onChange={handleTimeChange}
                  value={selectedTime}
                  format="HH:mm"
                  className="w-full"
                />
              </div>
              <button
                type="button"
                onClick={addAvailableSlot}
                className="bg-[#3B82F6] text-white py-2 px-6 rounded-lg shadow-md hover:bg-[#1D4ED8] transition-colors duration-200"
              >
                Add Slot
              </button>
              <div className="mt-4">
                {availableDates.map((slot, index) => (
                  <div key={index} className="p-2 border border-gray-200 rounded-lg mb-2">
                    {slot.date.toLocaleDateString()} at {slot.time}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={prevStep}
                className="bg-[#3B82F6] text-white py-3 px-6 rounded-lg shadow-md hover:bg-[#1D4ED8] transition-colors duration-200"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-[#3B82F6] text-white py-3 px-6 rounded-lg shadow-md hover:bg-[#1D4ED8] transition-colors duration-200"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
