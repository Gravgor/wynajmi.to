'use client';
import { Listing } from "@/types/Listing";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const ListingOffer: React.FC<Listing> = ({
  title,
  description,
  longDescription,
  price,
  area,
  images = [], // Default to an empty array if images is undefined
  detailPageUrl
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

  const hasImages = images.length > 0;
  const showControls = images.length > 1;
  const placeholderImage = "/path/to/placeholder-image.jpg"; 

  const truncatedDescription = description.length > 300 ? `${description.slice(0, 300)}...` : description;

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row max-w-full">
      <div className="relative flex-1">
        <div className="relative w-full h-64 md:h-full">
          <Image
            src={hasImages ? images[currentImageIndex] : placeholderImage}
            alt={description}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
          {showControls && (
            <>
              {/* Carousel Control Buttons */}
              <button
                onClick={handlePrevClick}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg z-10 hover:bg-gray-200 transition"
                aria-label="Previous Image"
              >
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNextClick}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg z-10 hover:bg-gray-200 transition"
                aria-label="Next Image"
              >
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              {/* Carousel Indicators */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.slice(0, 3).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-4 h-4 rounded-full transition-colors duration-300 ${
                      currentImageIndex === index ? 'bg-[#F59E0B]' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Informacje o mieszkaniu */}
      <div className="flex-1 flex flex-col p-6">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600 mb-4">{truncatedDescription}</p>
        <div className="flex-1 flex flex-col justify-end">
          <div className="flex flex-col items-start mb-4">
            <span className="text-md text-gray-700">{longDescription}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-semibold text-gray-900">{price.toLocaleString('pl')} PLN/mies</p>
            <p className="text-sm text-gray-500">{area} m²</p>
          </div>
          <Link
            className="mt-4 bg-[#F59E0B] text-white text-center py-2 px-4 rounded-md shadow-md hover:bg-[#D97706] transition"
            href={detailPageUrl}
          >
            Zobacz ofertę
          </Link>
        </div>
      </div>
    </div>
  );
};
