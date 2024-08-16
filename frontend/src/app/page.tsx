import { searchListings } from "@/actions";
import CallToAction from "@/components/CallToAction";
import FeaturedListing from "@/components/FeaturedListing";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import { SearchForm } from "@/components/ui/SearchForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-8 items-center">
      <Hero />
      <SearchForm onSearch={searchListings}/>
      <section id="why-us">
        <div className="mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Dlaczego warto wybrać Wynajmi.to?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16 mb-4 text-[#F59E0B]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-3-3v6"
                />
              </svg>
              <h3 className="text-xl font-semibold mb-2">
                Szeroki wybór mieszkań
              </h3>
              <p className="text-gray-600">
                Od kawalerek po luksusowe apartamenty.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16 mb-4 text-[#F59E0B]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m-3-3l-3 3m6-6h6m-6 6h6m-6-6V4"
                />
              </svg>
              <h3 className="text-xl font-semibold mb-2">
                Bezpieczeństwo transakcji
              </h3>
              <p className="text-gray-600">
                Gwarantujemy pełne wsparcie prawne.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16 mb-4 text-[#F59E0B]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m-3-3l-3 3m6-6h6m-6 6h6m-6-6V4"
                />
              </svg>
              <h3 className="text-xl font-semibold mb-2">
                Łatwość użytkowania
              </h3>
              <p className="text-gray-600">
                Prosty proces wynajmu w kilku krokach.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16 mb-4 text-[#F59E0B]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m-3-3l-3 3m6-6h6m-6 6h6m-6-6V4"
                />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Wsparcie 24/7</h3>
              <p className="text-gray-600">Zawsze jesteśmy tu, aby Ci pomóc.</p>
            </div>
          </div>
        </div>
      </section>
      <FeaturedListing />
      <Testimonials />
      <HowItWorks />
      <CallToAction />
    </main>
  );
}
