import Image from "next/image";

export default function Testimonials() {
    const testimonials = [
      {
        name: "Jan",
        location: "Kraków",
        quote: "Dzięki Wynajmi.to znalazłem idealne mieszkanie w centrum w zaledwie tydzień!",
        photo: "/images/placeholders/testimonial/jan.jpg", // Opcjonalnie, dodaj zdjęcia klientów
      },
      {
        name: "Anna",
        location: "Warszawa",
        quote: "Profesjonalna obsługa i szybka pomoc. Zdecydowanie polecam!",
        photo: "/images/placeholders/testimonial/testimonial-anna.jpg", // Opcjonalnie, dodaj zdjęcia klientów
      },
      {
        name: "Marek",
        location: "Wrocław",
        quote: "Wynajmi.to to świetne miejsce na znalezienie mieszkania. Bardzo zadowolony z usługi!",
        photo: "/images/placeholders/testimonial/marek.jpg", // Opcjonalnie, dodaj zdjęcia klientów
      },
      {
        name: "Maciej",
        location: "Kraków",
        quote: "Dzięki Wynajmi.to znalazłem idealne mieszkanie w centrum w zaledwie tydzień!",
        photo: "/images/placeholders/testimonial/maciej.jpg", // Opcjonalnie, dodaj zdjęcia klientów
      },
      {
        name: "Anna",
        location: "Warszawa",
        quote: "Profesjonalna obsługa i szybka pomoc. Zdecydowanie polecam!",
        photo: "/images/placeholders/testimonial/testimonial-anna.jpg", // Opcjonalnie, dodaj zdjęcia klientów
      },
      {
        name: "Milosz",
        location: "Wrocław",
        quote: "Wynajmi.to to świetne miejsce na znalezienie mieszkania. Bardzo zadowolony z usługi!",
        photo: "/images/placeholders/testimonial/milosz.jpg", 
      },
    ];
  
    return (
      <section id="testimonials" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Co mówią nasi klienci
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg max-w-sm mx-4 flex flex-col items-center"
              >
                <div className="relative w-24 h-24 mb-4">
                  <Image
                    src={testimonial.photo}
                    alt={testimonial.name}
                    layout="fill"
            objectFit="cover"
                    className="object-cover w-full h-full rounded-full border-2 border-[#F59E0B]"
                  />
                </div>
                <blockquote className="text-lg italic text-gray-800 mb-4">
                  {`"${testimonial.quote}"`}
                </blockquote>
                <p className="font-semibold text-gray-700">
                  – {testimonial.name}, {testimonial.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  