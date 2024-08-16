export default function CallToAction() {
    return (
      <section id="cta" className="bg-[#F59E0B] text-white py-16 w-full">
        <div className="mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Zacznij już teraz!
          </h2>
          <p className="text-lg md:text-xl mb-8">
            Niezależnie od tego, czy szukasz wymarzonego mieszkania, czy chcesz dodać swoją ofertę, jesteśmy tutaj, aby Ci pomóc. 
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="#search"
              className="inline-block px-8 py-3 bg-white text-[#F59E0B] rounded-full text-lg font-semibold shadow-lg hover:bg-gray-200 transition"
            >
              Znajdź mieszkanie
            </a>
            <a
              href="#add-offer"
              className="inline-block px-8 py-3 bg-transparent border-2 border-white text-white rounded-full text-lg font-semibold shadow-lg hover:bg-white hover:text-[#F59E0B] transition"
            >
              Dodaj ofertę
            </a>
          </div>
        </div>
      </section>
    );
  }
  