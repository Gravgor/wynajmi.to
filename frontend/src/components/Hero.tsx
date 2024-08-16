'use client';

import Link from "next/link";

export default function Hero() {
    return (
        <section
        id="hero"
        className="relative flex flex-col items-center justify-center w-screen h-[540px] text-white overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/landing.jpg')",
            filter: "blur(8px)",
            zIndex: "-1",
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center max-w-6xl mx-auto p-6 rounded-lg">
          <h1 className="text-5xl md:text-4xl font-extrabold leading-tight mb-4">
            Znajdź swoje wymarzone mieszkanie z Wynajmi.to
          </h1>
          <p className="text-lg md:text-2xl mb-8">
            Wynajmiemy dla Ciebie mieszkanie bez stresu i w najlepszej cenie.
          </p>
          <div className="flex space-x-4">
            <Link
              href="/properties"
              className="px-8 py-3 bg-[#F59E0B] text-white rounded-full text-lg font-semibold shadow-lg hover:bg-[#D97706] transition"
            >
              Szukaj mieszkania
            </Link>
            <a
              href="#add-offer"
              className="px-8 py-3 bg-white text-black rounded-full text-lg font-semibold shadow-lg hover:bg-gray-200 transition"
            >
              Dodaj swoją ofertę
            </a>
          </div>
        </div>
      </section>
    )
}