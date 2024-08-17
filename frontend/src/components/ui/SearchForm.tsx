"use client";
import { cn } from "@/lib/utils/cn";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface SearchFormProps {
  className?: string;
  onSearch?: (query: {
    location: string;
    propertyType: string;
    priceRange: string;
    rooms: string;
    area: string;
    amenities: string[];
  }) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  className,
  onSearch,
}) => {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [rooms, setRooms] = useState('')
  const [area, setArea] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);

  const pathname = usePathname();

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pathname === "/") {
      router.push(
        `/properties?location=${location}&propertyType=${propertyType}&priceRange=${priceRange}&rooms=${rooms}&area=${area}&amenities=${amenities.join
          (",")}`
      );
    }
    if (!onSearch) return;
    onSearch({ location, propertyType, priceRange, rooms, area, amenities });
  };

  const handleAmenityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmenities((prev) =>
      prev.includes(value)
        ? prev.filter((amenity) => amenity !== value)
        : [...prev, value]
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        `${className} flex flex-col md:flex-row gap-6 bg-accent p-6 rounded-lg shadow-xl`
      )}
    >
      <div className="flex-1">
        <label
          htmlFor="location"
          className="block text-sm font-semibold mb-2 text-white"
        >
          Lokalizacja
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Miasto lub dzielnica"
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F59E0B] transition"
        />
      </div>
      <div className="flex-1">
        <label
          htmlFor="property-type"
          className="block text-sm font-semibold mb-2 text-white"
        >
          Typ nieruchomości
        </label>
        <select
          id="property-type"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F59E0B] transition"
        >
          <option value="">Wybierz typ nieruchomości</option>
          <option value="studio">Kawalerka</option>
          <option value="1-bedroom">1-pokojowe</option>
          <option value="2-bedroom">2-pokojowe</option>
          <option value="house">Dom</option>
        </select>
      </div>
      <div className="flex-1">
        <label
          htmlFor="price-range"
          className="block text-sm font-semibold mb-2 text-white"
        >
          Zakres cenowy
        </label>
        <input
          type="text"
          id="price-range"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          placeholder="np. 1000 - 3000 PLN"
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F59E0B] transition"
        />
      </div>
      <div className="flex-1">
        <label
          htmlFor="rooms"
          className="block text-sm font-semibold mb-2 text-white"
        >
          Liczba pokoi
        </label>
        <input
          type="text"
          id="rooms"
          value={rooms}
          onChange={(e) => setRooms(e.target.value)}
          placeholder="np. 2"
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F59E0B] transition"
        />
      </div>
      <div className="flex-1">
        <label
          htmlFor="area"
          className="block text-sm font-semibold mb-2 text-white"
        >
          Powierzchnia
        </label>
        <input
          type="text"
          id="area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          placeholder="np. 50 m²"
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F59E0B] transition"
        />
      </div>
      <div className="flex-1">
        <label className="block text-sm font-semibold mb-2 text-white">
          Dodatkowe udogodnienia
        </label>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              value="balkon"
              onChange={handleAmenityChange}
              className="mr-2"
            />
            Balkon
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              value="parking"
              onChange={handleAmenityChange}
              className="mr-2"
            />
            Parking
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="w-full md:w-auto px-6 h-[60px] bg-primary relative top-6 text-white rounded-lg text-lg font-semibold hover:bg-[#D97706] transition"
      >
        Szukaj
      </button>
    </form>
  );
};
