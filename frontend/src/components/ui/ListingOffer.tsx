'use client'
import { Listing } from "@/types/Listing";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const ListingOffer: React.FC<Listing> = ({
  images,
  location,
  price,
  size,
  detailPageUrl,
  description,
  longDescription
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden flex w-[730px] h-[340px]">
      {/* Zdjęcia */}
      <div className="relative flex-1 flex flex-col items-center">
        <div className="relative w-full h-full">
          <Image
            src={images[currentImageIndex]}
            alt={description}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
          <button
            onClick={handlePrevClick}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
          >
            &#9664;
          </button>
          <button
            onClick={handleNextClick}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
          >
            &#9654;
          </button>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  currentImageIndex === index ? 'bg-[#F59E0B]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Informacje o mieszkaniu */}
      <div className="flex-1 flex flex-col p-4">
        <h2 className="text-xl font-semibold">{location}</h2>
        <p className="text-sm text-gray-500">{description}</p>
        <div className="flex-1 flex flex-col justify-end">
            <div className="flex justify-center items-center">
            <span className="text-md text-[#1F2937] mb-3">
                {longDescription}
            </span>
            </div>
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold">{price}</p>
            <p className="text-sm text-gray-500">{size} m²</p>
          </div>
            <Link className="mt-4 bg-[#F59E0B] text-white text-center py-2 rounded-md shadow-md hover:bg-[#D97706] transition" href={detailPageUrl}>
                Zobacz ofertę
            </Link>
        </div>
      </div>
    </div>
  );
};
