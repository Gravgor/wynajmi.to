'use client';
import { useState, useEffect } from 'react';
import { searchListings } from '@/actions';
import { SearchForm } from '@/components/ui/SearchForm';
import { Listing } from '@/types/Listing'; 
import { ListingOffer } from '@/components/ui/ListingOffer';
import { Loading } from '@/components/ui/Loading';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const [results, setResults] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchInitialListings = async () => {
      if(searchParams.has('location') || searchParams.has('propertyType') || searchParams.has('priceRange')) {
        const query = {
          location: searchParams.get('location') || '',
          propertyType: searchParams.get('propertyType') || '',
          priceRange: searchParams.get('priceRange') || ''
        }
        try {
          const data = await searchListings(query);
          setResults(data);
        } catch (err) {
          setError('Wystąpił błąd podczas pobierania ofert. Spróbuj ponownie.');
        } finally {
          setLoading(false);
        }
        return;
      }
      try {
        const data = await searchListings({ location: '', propertyType: '', priceRange: '' });
        setResults(data);
      } catch (err) {
        setError('Wystąpił błąd podczas pobierania ofert. Spróbuj ponownie.');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialListings();
  }, []);

  const handleSearch = async (query: { location: string; propertyType: string; priceRange: string }) => {
    setLoading(true);
    setError(null);

    try {
      const data = await searchListings(query);
      setResults(data);
    } catch (err) {
      setError('Wystąpił błąd podczas wyszukiwania. Spróbuj ponownie.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 h-[1100px]">
      <h1 className="text-3xl font-bold mb-8">Znajdź swoje wymarzone mieszkanie</h1>
      <SearchForm onSearch={handleSearch} />

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">
            {results.length} ofert znalezionych
        </h2>
        <div className="flex justify-center items-center">
        {loading && <Loading />}
        {error && <p className="text-red-500">{error}</p>}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {results.length === 0 && !loading && !error && (
            <p>Brak wyników wyszukiwania.</p>
          )}
          {results.map((listing) => (
            <ListingOffer key={listing.id} {...listing} />
          ))}
        </div>
      </section>
    </main>
  );
}
