"use client";
import { cn } from '@/utils/cn';
import { useState } from 'react';

interface SearchFormProps {
  className?: string;
  onSearch?: (query: { location: string; propertyType: string; priceRange: string }) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ 
  className,
  onSearch
 }) => {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onSearch) return;
    onSearch({ location, propertyType, priceRange });
  };

  return (
    <form onSubmit={handleSubmit} className={cn(`${className} flex flex-col md:flex-row gap-6 bg-accent p-6 rounded-lg shadow-xl`)}>
      <div className="flex-1">
        <label htmlFor="location" className="block text-sm font-semibold mb-2 text-white">Lokalizacja</label>
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
        <label htmlFor="property-type" className="block text-sm font-semibold mb-2 text-white">Typ nieruchomości</label>
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
        <label htmlFor="price-range" className="block text-sm font-semibold mb-2 text-white">Zakres cenowy</label>
        <input
          type="text"
          id="price-range"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          placeholder="np. 1000 - 3000 PLN"
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F59E0B] transition"
        />
      </div>
      <button
        type="submit"
        className="w-full md:w-auto px-6 h-[60px] bg-primary relative top-6 text-white rounded-lg text-lg font-semibold hover:bg-[#D97706] transition"
      >
        Znajdź mieszkanie
      </button>
    </form>
  );
};
