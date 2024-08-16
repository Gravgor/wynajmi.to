import { getListing } from "@/actions";
import { IoIosBed } from "react-icons/io";
import { BsHouseFill } from "react-icons/bs";
import Image from "next/image";


export default async function Page({params}: {params: {id: string}}) {
    const listing = await getListing(Number(params.id));

    const mainImage = listing.images[0];
    const otherImages = listing.images.slice(1);
    return (
        <main className="container mx-auto px-4 py-8 h-[1100px]">
            <h1 className="text-3xl font-bold mb-8">Oferta</h1>
            <div className="flex gap-2 items-start justify-start">
                    <Image
                        key={1}
                        src={mainImage}
                        alt={listing.location}
                        width={630}
                        height={600}
                        objectFit="cover"
                        className="rounded-lg"
                    />
                    <div className="grid grid-cols-2 gap-4">
                        {otherImages.map((image, index) => (
                            <Image
                                key={index}
                                src={image}
                                alt={listing.location}
                                width={300}
                                height={200}
                                objectFit="cover"
                                className="rounded-lg"
                            />
                        ))}
                    </div>
            </div>
            <div className="flex gap-2 mt-4 items-start justify-center">
                <div className="flex-1 flex flex-col p-4">
                    <h2 className="text-2xl font-semibold">{listing.price}</h2>
                    <h1 className="text-5xl font-semibold">{listing.description}</h1>
                    <h3 className="text-xl text-gray-500">{listing.location}</h3>
                    <div className="flex-1 flex mt-8 gap-4">
                        <span className="flex  gap-1 text-md text-[#1F2937] mb-3">
                            <IoIosBed className="w-6 h-6" /> {listing.bedrooms} {listing.bedrooms > 1 ? 'sypialnie' : 'sypialnia'}
                        </span>
                        <span className="flex gap-1 text-md text-[#1F2937] mb-3">
                            <BsHouseFill className="w-6 h-6" /> {listing.size} m<sup>2</sup>
                        </span>
                        <span className="text-md text-[#1F2937] mb-3">
                            2021 rok
                        </span>
                    </div>
                    <div className="mt-4">
                    <h1 className="text-5xl font-semibold">Opis</h1>
                    <p className="text-lg text-[#1F2937] mt-3 w-3/4">
                        {listing.longDescription}
                    </p>
                    </div>
                    <div className="mt-4">
                    <h1 className="text-5xl font-semibold">Lokalizacja</h1>
                    
                    </div>
                </div>
            </div>
        </main>
    );
}