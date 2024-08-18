
import { searchListings } from "@/actions/listings/listingActions";
import CallToAction from "@/components/CallToAction";
import FeaturedListing from "@/components/FeaturedListing";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import Testimonials from "@/components/Testimonials";
import { SearchForm } from "@/components/ui/SearchForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center px-4 py-8 md:px-8 md:py-12 -mt-[60px]">
      <Hero  />
      <SearchForm className="relative bottom-[-80px] md:bottom-[60px]" onSearch={searchListings} />
      <section id="why-us" className="w-full">
        <div className="mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Dlaczego warto wybrać Wynajmi.to?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              { title: 'Szeroki wybór mieszkań', description: 'Od kawalerek po luksusowe apartamenty.', icon: 'M9 12h6m-3-3v6' },
              { title: 'Bezpieczeństwo transakcji', description: 'Gwarantujemy pełne wsparcie prawne.', icon: 'M12 8v4l3 3m-3-3l-3 3m6-6h6m-6 6h6m-6-6V4' },
              { title: 'Łatwość użytkowania', description: 'Prosty proces wynajmu w kilku krokach.', icon: 'M12 8v4l3 3m-3-3l-3 3m6-6h6m-6 6h6m-6-6V4' },
              { title: 'Wsparcie 24/7', description: 'Zawsze jesteśmy tu, aby Ci pomóc.', icon: 'M12 8v4l3 3m-3-3l-3 3m6-6h6m-6 6h6m-6-6V4' },
            ].map(({ title, description, icon }) => (
              <div key={title} className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 mb-4 text-[#F59E0B]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon} />
                </svg>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FeaturedListing />
      <Testimonials />
      <HowItWorks />
      <CallToAction />
      <Footer />
    </main>
  );
}
