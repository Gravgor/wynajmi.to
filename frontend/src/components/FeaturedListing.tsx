import { listings } from "@/mock/listings";
import { ListingOffer } from "./ui/ListingOffer";




export default function FeaturedListing() {
    return (
        <section id="featured-listings" className="py-16">
        <div className="mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Zobacz najpopularniejsze oferty
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {listings.map((listing) => (
              <ListingOffer key={listing.id} {...listing} />
            ))}
          </div>
        </div>
      </section>
    )
}