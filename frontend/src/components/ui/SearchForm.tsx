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
    sort: string;
  }) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  className,
  onSearch,
}) => {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [rooms, setRooms] = useState("");
  const [area, setArea] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [sort, setSort] = useState<string>("price-asc");

  const pathname = usePathname();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pathname === "/") {
      router.push(
        `/properties?location=${location}&propertyType=${propertyType}&priceRange=${priceRange}&rooms=${rooms}&area=${area}&amenities=${amenities.join(
          ","
        )}`
      );
    }
    if (!onSearch) return;
    onSearch({
      location,
      propertyType,
      priceRange,
      rooms,
      area,
      amenities,
      sort: "price-asc",
    });
  };

  const handleAmenityToggle = (value: string) => {
    setAmenities((prev) =>
      prev.includes(value)
        ? prev.filter((amenity) => amenity !== value)
        : [...prev, value]
    );
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    if (!onSearch) return;
    
  }

  const availableAmenities = [
    { id: "balcony", label: "Balkon" },
    { id: "parking", label: "Miejsce parkingowe" },
    { id: "furnished", label: "Umeblowane" },
    { id: "elevator", label: "Winda" },
    { id: "garden", label: "Ogród" },
    { id: "security", label: "Ochrona" },
    { id: "pool", label: "Basen" }, // Additional amenities for demonstration
    { id: "gym", label: "Siłownia" },
    { id: "wifi", label: "Wi-Fi" },
  ];


  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        `${className} flex flex-col gap-6 bg-white p-6 rounded-lg shadow-xl`
      )}
    >
      <div className="flex flex-col md:flex-row gap-8">
        {[
          {
            id: "location",
            label: "Lokalizacja",
            value: location,
            setValue: setLocation,
            placeholder: "Miasto lub dzielnica",
          },
          {
            id: "property-type",
            label: "Typ nieruchomości",
            value: propertyType,
            setValue: setPropertyType,
            placeholder: "",
            isSelect: true,
            options: [
              { value: "", label: "Wybierz typ nieruchomości" },
              { value: "studio", label: "Kawalerka" },
              { value: "1-bedroom", label: "1-pokojowe" },
              { value: "2-bedroom", label: "2-pokojowe" },
              { value: "house", label: "Dom" },
            ],
          },
          {
            id: "price-range",
            label: "Zakres cenowy",
            value: priceRange,
            setValue: setPriceRange,
            placeholder: "np. 1000 - 3000 PLN",
          },
          {
            id: "rooms",
            label: "Liczba pokoi",
            value: rooms,
            setValue: setRooms,
            placeholder: "np. 2",
          },
          {
            id: "area",
            label: "Powierzchnia",
            value: area,
            setValue: setArea,
            placeholder: "np. 50 m²",
          },
        ].map((field) => (
          <div key={field.id} className="relative flex-1">
            <label
              htmlFor={field.id}
              className="block text-sm font-semibold mb-2 text-black"
            >
              {field.label}
            </label>
            {field.isSelect ? (
              <select
                id={field.id}
                value={field.value}
                onChange={(e) => field.setValue(e.target.value)}
                className="w-full h-14 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F59E0B] transition-all duration-300"
              >
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                id={field.id}
                value={field.value}
                onChange={(e) => field.setValue(e.target.value)}
                placeholder={field.placeholder}
                onFocus={() => setFocusedField(field.id)}
                onBlur={() => setFocusedField(null)}
                className={cn(
                  "absolute inset-6 -left-2 p-4 h-14 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F59E0B] transition-all duration-300",
                  focusedField === field.id ? "w-12 md:w-64" : "w-full"
                )}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4 mt-4">
  <div className="flex flex-wrap gap-4">
    <div className="flex flex-wrap gap-2 w-1/2">
      {availableAmenities.map((amenity) => (
        <button
          key={amenity.id}
          type="button"
          onClick={() => handleAmenityToggle(amenity.id)}
          className={cn(
            "px-3 py-1 text-sm font-semibold rounded-full transition-colors duration-300",
            amenities.includes(amenity.id)
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-500 hover:bg-gray-300"
          )}
        >
          {amenity.label}
        </button>
      ))}
    </div>
    <div className="flex-1 flex items-center justify-end">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <label
          htmlFor="sort"
          className="block text-xs font-semibold text-black"
        >
          Sortuj według
        </label>
        <select
          id="sort"
          className="w-full md:w-64 h-14 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F59E0B] transition-all duration-300"
          value={sort}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="price-asc">Cena rosnąco</option>
          <option value="price-desc">Cena malejąco</option>
          <option value="area-asc">Powierzchnia rosnąco</option>
          <option value="area-desc">Powierzchnia malejąco</option>
        </select>
      </div>
    </div>
  </div>

        <button
          type="submit"
          className="px-6 py-3 bg-orange-500 text-white rounded-lg text-lg font-semibold hover:bg-[#D97706] transition"
        >
          Szukaj mieszkania
        </button>
      </div>
    </form>
  );
};
