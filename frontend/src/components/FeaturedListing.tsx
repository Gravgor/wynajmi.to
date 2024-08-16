import { ListingOffer } from "./ui/ListingOffer";
import { Listing } from "@/types/Listing";

const listings: Listing[] = [
  {
    id: 1,
    images: [
      '/images/placeholders/listing/offer1-3.jpg',
      '/images/placeholders/listing/offer1-1.jpg',
      '/images/placeholders/listing/offer1-2.jpg',
    ],
    location: 'Warszawa, Centrum',
    price: '3000 PLN/mies.',
    size: '45',
    detailPageUrl: '/property/1',
    description: 'Stylowe mieszkanie w sercu miasta',
    longDescription: 'Przestronne mieszkanie w centrum Warszawy z widokiem na Pałac Kultury i Nauki. W pełni umeblowane i wyposażone w sprzęty AGD. W cenie najmu jest również miejsce postojowe w garażu podziemnym. Mieszkanie znajduje się na 5 piętrze.',
  },
  {
    id: 2,
    images: [
      '/images/placeholders/listing/offer2-3.jpg',
      '/images/placeholders/listing/offer2-1.jpg',
      '/images/placeholders/listing/offer2-2.jpg',
    ],
    location: 'Kraków, Stare Miasto',
    price: '2500 PLN/mies.',
    size: '40',
    detailPageUrl: '/property/2',
    description: 'Komfortowe mieszkanie z widokiem na rynek',
    longDescription: 'Kawalerka w samym sercu Krakowa z widokiem na Rynek Główny. W pełni umeblowana i wyposażona w sprzęty AGD. W cenie najmu jest również miejsce postojowe w garażu podziemnym. Mieszkanie znajduje się na 3 piętrze.',
  },
  {
    id: 3,
    images: [
      '/images/placeholders/listing/offer3-3.jpg',
      '/images/placeholders/listing/offer3-1.jpg',
      '/images/placeholders/listing/offer3-2.jpg',
    ],
    location: 'Wrocław, Śródmieście',
    price: '2800 PLN/mies.',
    size: '50',
    detailPageUrl: '/property/3',
    description: 'Nowoczesne mieszkanie blisko parku',
    longDescription: 'Przestronne mieszkanie w centrum Wrocławia z widokiem na Park Południowy. W pełni umeblowane i wyposażone w sprzęty AGD. W cenie najmu jest również miejsce postojowe w garażu podziemnym. Mieszkanie znajduje się na 2 piętrze.',
  },
  {
    id: 4,
    images: [
      '/images/placeholders/listing/offer4-4.jpg',
      '/images/placeholders/listing/offer4-1.jpg',
      '/images/placeholders/listing/offer4-2.jpg',
    ],
    location: 'Gdańsk, Wrzeszcz',
    price: '3200 PLN/mies.',
    size: '55',
    detailPageUrl: '/property/4',
    description: 'Przestronne mieszkanie z tarasem',
    longDescription: 'Przestronne mieszkanie w dzielnicy Wrzeszcz z widokiem na Zatokę Gdańską. W pełni umeblowane i wyposażone w sprzęty AGD. W cenie najmu jest również miejsce postojowe w garażu podziemnym. Mieszkanie znajduje się na 4 piętrze.',
  }
];


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