
import { IoIosBed } from "react-icons/io";
import { BsHouseFill } from "react-icons/bs";
import { MapComponent } from "@/components/ui/Map";
import { ListingPhotos } from "@/components/ui/ListingPhotos";
import { ContactCard } from "@/components/ui/ContactCard";
import { getListings } from "@/actions/listings/listingActions";
import { Listing } from "@/types/Listing";
import { Card, CardBody, Chip, Divider } from "@nextui-org/react";

export default async function Page({ params }: { params: { id: string } }) {
  const [listing]: Listing[] = await getListings(params.id);
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
    <main className="container mx-auto px-4 py-6 md:py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Oferta</h1>
      {listing.images && <ListingPhotos images={listing.images} location={listing.location}/>}

      <div className="flex flex-col md:flex-row gap-6 md:gap-8 mt-6">
        <div className="flex-1 bg-white shadow-lg rounded-lg p-4 md:p-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">{listing.price.toLocaleString()} PLN/mies</h2>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">{listing.title}</h1>
          <h3 className="text-lg md:text-xl text-gray-600 mt-1">{listing.location}</h3>
          <Divider className="my-2 mb-4" />
          <div className="flex flex-wrap gap-3 md:gap-4 mt-4 text-gray-700">
            <Chip color="warning" variant="shadow" startContent={<IoIosBed className="text-green-500" />} className="text-base font-semibold md:text-lg p-2">
            {propertyTypeText}
            </Chip>
            <Chip color="warning" variant="shadow" startContent={<BsHouseFill className="text-green-500" />} className="text-base font-semibold md:text-lg p-2">
            {listing.area} m<sup>2</sup>
            </Chip>
            <Chip color="warning" variant="shadow" className="text-base font-semibold md:text-lg p-2">
            {listing.rooms} pokoi
            </Chip>
          </div>

          <div className="mt-6 md:mt-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">Opis</h2>
            <p className="text-base md:text-lg text-gray-700 mt-3">{listing.description}</p>
          </div>

          <div className="mt-6 md:mt-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">Wyposażenie</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {listing.amenities.map((item, index) => (
                <Card key={index}>
                  <CardBody>
                  <span className="text-base md:text-lg text-gray-800">{item}</span>
                  </CardBody>
                </Card>
              ))}
            </ul>
          </div>
        </div>

        <ContactCard
          id={listing.id}
          name={listing.user.firstName + ' ' + listing.user.lastName}
          phoneNumber={'+48 572 418 475'}
          email={listing.user.email}
        />
      </div>

      <div className="mt-6 md:mt-8 flex-1 bg-white shadow-lg rounded-lg p-4 md:p-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">Lokalizacja</h2>
        <span className="text-base md:text-lg text-gray-700 block mt-2">{listing.location}</span>
        <div className="mt-4 w-full h-64 md:h-80 rounded-lg overflow-hidden">
          <MapComponent latitude={listing.latitude} longitude={listing.longitude} />
        </div>
      </div>
    </main>
  );
}
