"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import NextJsImage from "../NextjsImage";

export const ListingPhotos: React.FC<{ images: string[], location: string }> = ({ images, location }) => {
    const [open, setOpen] = useState(false);
    const mainImage = images[0];
    const otherImages = images.slice(1, 6); // Get only the next 5 images
    const remainingImagesCount = images.length - 6;

    return (
        <div className="flex gap-2 items-start justify-start">
            <Image
                priority
                key={1}
                onClick={() => setOpen(true)}
                src={mainImage}
                alt={location}
                width={630}
                height={600}
                objectFit="cover"
                className="rounded-lg cursor-pointer"
            />
            <div className="grid grid-cols-3 gap-4">
                {otherImages.map((image, index) => (
                    <Image
                       priority
                        key={index}
                        onClick={() => setOpen(true)}
                        src={image}
                        alt={location}
                        width={300}
                        height={200}
                        objectFit="cover"
                        className="rounded-lg cursor-pointer"
                    />
                ))}
                {images.length > 6 && (
                    <div
                        className="relative rounded-lg cursor-pointer"
                        onClick={() => setOpen(true)}
                    >
                        <Image
                            src={images[5]} // The 6th image
                            alt={location}
                            width={300}
                            height={200}
                            objectFit="cover"
                            className="rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black opacity-50 rounded-lg flex items-center justify-center">
                            <span className="text-white text-lg font-semibold">Zobacz więcej</span>
                        </div>
                    </div>
                )}
            </div>
            <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={images.map((image) => ({ src: image }))}
                render={{
                    slide: NextJsImage
                }}
            />
        </div>
    );
};
