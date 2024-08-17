import { getListing } from "@/actions";
import { IoIosBed } from "react-icons/io";
import { BsHouseFill } from "react-icons/bs";
import { FaCouch, FaWifi, FaTv, FaUtensils } from "react-icons/fa";
import { MapComponent } from "@/components/ui/Map";
import { ListingPhotos } from "@/components/ui/ListingPhotos";
import { ContactCard } from "@/components/ui/ContactCard";

export default async function Page({ params }: { params: { id: string } }) {
  const listing = await getListing(params.id);


  const propertyTypeText = (() => {
    switch (listing.propertyType) {
      case '1-bedroom':
        return '1 sypialnia';
      case '2-bedroom':
        return '2 sypialnie';
      case 'studio':
        return 'Brak sypialni';
      default:
        return 'Nieznany typ';
    }
  })();

  return (
    <main className="container mx-auto px-4 py-8 h-full">
      <h1 className="text-3xl font-bold mb-8">Oferta</h1>
      {listing.images && <ListingPhotos images={listing.images} location={listing.location}/>}
      <div className="flex gap-2 mt-4 items-start justify-center">
        <div className="flex-1 flex flex-col p-4">
          <h2 className="text-2xl font-semibold">{listing.price.toLocaleString()} PLN/mies</h2>
          <h1 className="text-5xl font-semibold">{listing.title}</h1>
          <h3 className="text-xl text-gray-500">{listing.location}</h3>
          <div className="flex-1 flex mt-8 gap-4">
            <span className="flex gap-1 text-md text-[#1F2937] mb-3">
              <IoIosBed className="w-6 h-6" /> {propertyTypeText}{" "}
            </span>
            <span className="flex gap-1 text-md text-[#1F2937] mb-3">
              <BsHouseFill className="w-6 h-6" /> {listing.area} m<sup>2</sup>
            </span>
            <span className="text-md text-[#1F2937] mb-3">2021 rok</span>
          </div>
          <div className="mt-4">
            <h1 className="text-4xl font-semibold">Opis</h1>
            <p className="text-lg text-[#1F2937] mt-3 w-3/4">
              {listing.description}
            </p>
          </div>
          <div className="mt-8">
            <h1 className="text-4xl font-semibold mb-6 text-black">
              Wyposażenie
            </h1>
            <ul className="grid grid-cols-2 gap-4">
              {listing.amenities.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center bg-[#E5E7EB] p-3 rounded-lg shadow-sm"
                >
                  <span className="text-lg text-black">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
         <ContactCard
          id={listing.id}
          name={listing.user.name}
          phoneNumber={''}
          email={listing.user.email}
        />
      </div>
      <div className="mt-4 h-full w-full">
        <h1 className="text-4xl font-semibold">Lokalizacja</h1>
        <span className="text-lg text-[#1F2937] mb-3">
          {listing.location}
        </span>
        <MapComponent latitude={listing.latitude} longitude={listing.longitude} />
      </div>
    </main>
  );
}
