"use client";
import { cn } from "@/lib/utils/cn";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Chip,
  Input,
  Slider,
  Autocomplete,
  AutocompleteItem,
  AutocompleteSection,
} from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { FaLocationDot, FaHouse, FaDollarSign, FaSort } from "react-icons/fa6";
import { MdBedroomParent } from "react-icons/md";
import { TbMeterSquare } from "react-icons/tb";
import { useGooglePlaces } from "@/hooks/useGooglePlaces";

interface SearchFormProps {
  className?: string;
  onSearch?: (query: {
    location: string;
    propertyType: string;
    priceRange: [number, number];
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
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [rooms, setRooms] = useState("");
  const [area, setArea] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [sort, setSort] = useState<string>("price-asc");

  const { places, loading, error, fetchPlaces } = useGooglePlaces();

  const pathname = usePathname();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pathname === "/") {
      router.push(
        `/properties?location=${location}&propertyType=${propertyType}&priceRange=${priceRange.join(
          ","
        )}&rooms=${rooms}&area=${area}&amenities=${amenities.join(
          ","
        )}&sort=${sort}`
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
      sort,
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
    onSearch({
      location,
      propertyType,
      priceRange,
      rooms,
      area,
      amenities,
      sort: value,
    });
  };

  const availableAmenities = [
    { id: "balcony", label: "Balkon" },
    { id: "parking", label: "Miejsce parkingowe" },
    { id: "furnished", label: "Umeblowane" },
    { id: "elevator", label: "Winda" },
    { id: "garden", label: "Ogród" },
    { id: "security", label: "Ochrona" },
    { id: "pool", label: "Basen" },
    { id: "gym", label: "Siłownia" },
    { id: "wifi", label: "Wi-Fi" },
  ];

  const onLocationInputChanged = async (value: string) => {
    if (value.length > 2) {
      await fetchPlaces(value);
    }
  };

  const onLocationSelectionChange = (key: any) => {
    console.log(key);
    setLocation(key);
  }


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
            fieldType: "text",
            placeholder: "Miasto lub dzielnica",
            icon: (
              <FaLocationDot className="text-[#F97316] relative bottom-1" />
            ),
          },
          {
            id: "property-type",
            label: "Typ nieruchomości",
            value: propertyType,
            setValue: setPropertyType,
            placeholder: "",
            icon: <FaHouse className="text-[#F97316]" />,
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
            id: "rooms",
            label: "Liczba pokoi",
            value: rooms,
            fieldType: "number",
            setValue: setRooms,
            placeholder: "np. 2",
            icon: (
              <MdBedroomParent className="text-[#F97316] relative bottom-1" />
            ),
          },
          {
            id: "area",
            label: "Powierzchnia",
            value: area,
            fieldType: "number",
            setValue: setArea,
            placeholder: "np. 50 m²",
            icon: (
              <TbMeterSquare className="text-[#F97316] relative bottom-1" />
            ),
          },
          {
            id: "price-range",
            label: "Zakres cenowy",
            value: priceRange,
            icon: <FaDollarSign className="text-[#F97316] relative bottom-1" />,
            setValue: setPriceRange,
          },
        ].map((field) => {
          // Conditionally render input or slider
          if (field.id === "price-range") {
            return (
              <div key={field.id} className="relative flex-1 mt-2">
                <Slider
                  id={field.id}
                  maxValue={10000}
                  classNames={{
                    filler: "bg-[#F59E0B]",
                    thumb: "bg-[#F59E0B]",
                  }}
                  radius="lg"
                  step={100}
                  showTooltip={true}
                  value={priceRange}
                  startContent={field.icon}
                  tooltipValueFormatOptions={{
                    style: "currency",
                    currency: "PLN",
                  }}
                  tooltipProps={{
                    offset: 10,
                    placement: "bottom",
                    classNames: {
                      base: "before:bg-[#F59E0B]",
                      content: "px-2 py-1 bg-[#F59E0B] text-white rounded-lg",
                    },
                  }}
                  onChange={(value: number | number[]) =>
                    setPriceRange(value as [number, number])
                  }
                  formatOptions={{ style: "currency", currency: "PLN" }}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>{priceRange[0]} PLN</span>
                  <span>{priceRange[1]} PLN</span>
                </div>
              </div>
            );
          }

          if (field.isSelect) {
            return (
              <div key={field.id} className="relative flex-1">
                <Select
                  size="lg"
                  className="max-w-[340px]"
                  defaultSelectedKeys={[field.value]}
                  label={field.label}
                  onChange={(e) => field.setValue(e.target.value)}
                  startContent={field.icon}
                >
                  {field.options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            );
          }

          if (field.id === "location") {
            return (
              <div key={field.id} className="relative flex-1">
                <Autocomplete
                  size="lg"
                  label={field.label}
                  placeholder={field.placeholder}
                  isLoading={loading}
                  startContent={field.icon}
                  onInputChange={onLocationInputChanged}
                  onSelectionChange={onLocationSelectionChange}
                >
                  <AutocompleteSection title={"Wyniki wyszukiwania"}>
                  {places.map((place) => (
                      <AutocompleteItem
                        key={place.formattedAddress}
                        value={place.formattedAddress}
                      >
                        {place.formattedAddress}
                      </AutocompleteItem>
                    ))}
                  </AutocompleteSection>
                </Autocomplete>
              </div>
            );
          }

          return (
            <div key={field.id} className="relative flex-1">
              <Input
                type={field.fieldType}
                size="lg"
                id={field.id}
                {/* @ts-ignore */}
                value={field.value}
                onChange={(e) => field.setValue(e.target.value)}
                placeholder={field.placeholder}
                onFocus={() => setFocusedField(field.id)}
                onBlur={() => setFocusedField(null)}
                label={field.label}
                startContent={field.icon}
              />
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-4 mt-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-wrap gap-2 w-1/2">
            {availableAmenities.map((amenity) => (
              <Chip
                key={amenity.id}
                onClick={() => handleAmenityToggle(amenity.id)}
                className={cn(
                  "px-3 py-1 text-sm font-semibold rounded-full transition-colors duration-300 cursor-pointer",
                  amenities.includes(amenity.id)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-500 hover:bg-gray-300"
                )}
              >
                {amenity.label}
              </Chip>
            ))}
          </div>
          <div className="flex-1 flex items-center justify-end">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <Select
                className="w-[240px]"
                size="lg"
                label="Sortowanie ofert"
                placeholder="Sortuj"
                defaultSelectedKeys={[sort]}
                onChange={(e) => handleSortChange(e.target.value)}
                startContent={<FaSort className="text-[#F97316]" />}
              >
                <SelectItem key={0} value="price-asc">
                  Cena rosnąco
                </SelectItem>
                <SelectItem key={1} value="price-desc">
                  Cena malejąco
                </SelectItem>
                <SelectItem key={2} value="area-asc">
                  Powierzchnia rosnąco
                </SelectItem>
                <SelectItem key={3} value="area-desc">
                  Powierzchnia malejąco
                </SelectItem>
              </Select>
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
