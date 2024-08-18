export default function CallToAction() {
  return (
    <section id="cta" className="bg-[#F59E0B] text-white py-12 md:py-16 w-screen">
      <div className="mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
          Zacznij już teraz!
        </h2>
        <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8">
          Niezależnie od tego, czy szukasz wymarzonego mieszkania, czy chcesz dodać swoją ofertę, jesteśmy tutaj, aby Ci pomóc.
        </p>
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
          <a
            href="#search"
            className="inline-block px-6 py-2 md:px-8 md:py-3 bg-white text-[#F59E0B] rounded-full text-base md:text-lg font-semibold shadow-lg hover:bg-gray-200 transition"
          >
            Znajdź mieszkanie
          </a>
          <a
            href="#add-offer"
            className="inline-block px-6 py-2 md:px-8 md:py-3 bg-transparent border-2 border-white text-white rounded-full text-base md:text-lg font-semibold shadow-lg hover:bg-white hover:text-[#F59E0B] transition"
          >
            Dodaj ofertę
          </a>
        </div>
      </div>
    </section>
  );
}
