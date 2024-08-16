import { getListing } from "@/actions";
import { IoIosBed } from "react-icons/io";
import { BsHouseFill } from "react-icons/bs";
import Image from "next/image";
import { MapComponent } from "@/components/ui/Map";
import { ListingPhotos } from "@/components/ui/ListingPhotos";


export default async function Page({ params }: { params: { id: string } }) {
  const listing = await getListing(Number(params.id));

  return (
    <main className="container mx-auto px-4 py-8 h-full">
      <h1 className="text-3xl font-bold mb-8">Oferta</h1>
      <ListingPhotos images={listing.images} location={listing.location} />
      <div className="flex gap-2 mt-4 items-start justify-center">
        <div className="flex-1 flex flex-col p-4">
          <h2 className="text-2xl font-semibold">{listing.price}</h2>
          <h1 className="text-5xl font-semibold">{listing.description}</h1>
          <h3 className="text-xl text-gray-500">{listing.location}</h3>
          <div className="flex-1 flex mt-8 gap-4">
            <span className="flex gap-1 text-md text-[#1F2937] mb-3">
              <IoIosBed className="w-6 h-6" /> {listing.bedrooms}{" "}
              {listing.bedrooms > 1 ? "sypialnie" : "sypialnia"}
            </span>
            <span className="flex gap-1 text-md text-[#1F2937] mb-3">
              <BsHouseFill className="w-6 h-6" /> {listing.size} m<sup>2</sup>
            </span>
            <span className="text-md text-[#1F2937] mb-3">2021 rok</span>
          </div>
          <div className="mt-4">
            <h1 className="text-5xl font-semibold">Opis</h1>
            <p className="text-lg text-[#1F2937] mt-3 w-3/4">
              {listing.longDescription}
            </p>
          </div>
          <div className="mt-4 h-full">
            <h1 className="text-5xl font-semibold">Lokalizacja</h1>
                <span className="text-lg text-[#1F2937] mb-3">Warszawa, Centrum</span>
            <MapComponent latitude={52.22977} longitude={21.01178} />
          </div>
        </div>
      </div>
    </main>
  );
}
