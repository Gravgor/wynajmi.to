'use client';

import Link from "next/link";

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative flex flex-col items-center justify-center w-screen h-[400px] md:h-[540px] text-white overflow-hidden bg-cover bg-center"
        >
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/images/landing.jpg')",
                    filter: "blur(8px)",
                    zIndex: "-1",
                }}
            />

            <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto p-4 md:p-6 rounded-lg">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
                    Znajdź swoje wymarzone mieszkanie z Wynajmi.to
                </h1>
                <p className="text-base md:text-lg lg:text-xl mb-6">
                    Wynajmiemy dla Ciebie mieszkanie bez stresu i w najlepszej cenie.
                </p>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                    <Link
                        href="/properties"
                        className="px-6 py-2 md:px-8 md:py-3 bg-[#F59E0B] text-white rounded-full text-base md:text-lg font-semibold shadow-lg hover:bg-[#D97706] transition"
                    >
                        Szukaj mieszkania
                    </Link>
                    <a
                        href="#add-offer"
                        className="px-6 py-2 md:px-8 md:py-3 bg-white text-black rounded-full text-base md:text-lg font-semibold shadow-lg hover:bg-gray-200 transition"
                    >
                        Dodaj swoją ofertę
                    </a>
                </div>
            </div>
        </section>
    );
}
